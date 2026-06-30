import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const FREE_LIMIT = 3

const SYSTEM_PROMPTS: Record<string, string> = {
  'review-reply': `You are an expert at writing professional, warm, and personalized Google review responses for local businesses. Keep responses between 2-4 sentences. Be genuine, thank them, address their specific feedback, and invite them back. Never use generic filler phrases.`,
  'social-media': `You are a social media expert for local service businesses. Create engaging Instagram captions, Facebook posts, and relevant hashtags. Keep captions conversational and include a clear call-to-action. Output format: Instagram Caption, Facebook Post, Hashtags (each on its own line with a label).`,
  'email-writer': `You are an expert business email writer. Write professional, concise, and friendly customer emails for local businesses. Include a proper greeting, clear body, and professional sign-off.`,
  'quote-generator': `You are an expert at writing professional business quotes and estimates. Create a polished, professional estimate email that clearly outlines the service, pricing, timeline, and next steps.`,
  'proposal-generator': `You are a business proposal expert. Write compelling, professional proposals for local service businesses that clearly communicate value, scope, pricing, and timeline.`,
  'slogan-generator': `You are a creative copywriter specializing in local business branding. Generate 5 catchy, memorable slogans for the business. Make them punchy, relevant, and easy to remember.`,
  'seo-blog': `You are an SEO content expert. Write a well-structured, keyword-rich blog post for a local business. Include a compelling headline, introduction, 3-4 sections with subheadings, and a conclusion with a call-to-action. Aim for 400-600 words.`,
  'faq-generator': `You are an expert at creating helpful FAQ pages for local businesses. Generate 8-10 frequently asked questions with clear, helpful answers based on the business information provided.`,
  'gbp-post': `You are a Google Business Profile optimization expert. Write an engaging, keyword-optimized GBP post for a local business. Keep it under 300 words, include a call-to-action, and make it relevant to local search.`,
  'website-copy': `You are an expert website copywriter for local service businesses. Generate complete, conversion-focused copy for the following pages: HOME PAGE (headline, subheadline, hero CTA, 3 value propositions), ABOUT PAGE (story, mission, trust signals), SERVICES PAGE (overview + 3-5 service descriptions), CONTACT PAGE (intro paragraph + form CTA), FAQ SECTION (6-8 Q&As), and CALL-TO-ACTIONS (5 variations). Format each section clearly with bold headers. Write in the specified tone and make every word earn its place.`,
  'chat-assistant': `You are an expert chatbot designer for local service businesses. Generate a complete, ready-to-use AI chatbot script including: 1) GREETING MESSAGES (3 variations), 2) QUICK REPLY BUTTONS (6 common questions visitors click), 3) FULL Q&A RESPONSES for every FAQ provided (thorough, friendly answers), 4) LEAD CAPTURE FLOW (conversation sequence to collect name, phone, and project details), 5) AFTER-HOURS MESSAGE, 6) ESCALATION MESSAGE (when to suggest calling). Format clearly with headers and label each part. Make the chatbot sound human, helpful, and focused on the specified lead goal.`,
  'marketing-assistant': `You are an all-in-one marketing content expert. From a single campaign description, generate ALL of the following — label each section clearly with a bold header:

1. FACEBOOK POST (200-300 words, conversational, includes CTA)
2. INSTAGRAM CAPTION (punchy, 150 words max, 10-15 hashtags)
3. GOOGLE BUSINESS PROFILE POST (150 words, keyword-optimized, local focus)
4. EMAIL CAMPAIGN (subject line + full email body with greeting, body, CTA, sign-off)
5. SMS TEXT (under 160 characters, direct and urgent)
6. BLOG ARTICLE OUTLINE (title + 5 section headers with 2-3 bullet points each)
7. WEBSITE BANNER COPY (headline + subheadline + button text, 3 variations)
8. CALL-TO-ACTION PHRASES (8 variations for different placements)

Make all content consistent in brand voice, specific to the business and campaign, and ready to use immediately.`,
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tool, prompt, fields } = await request.json()

  if (!tool || !SYSTEM_PROMPTS[tool]) {
    return NextResponse.json({ error: 'Invalid tool' }, { status: 400 })
  }

  // Check subscription status
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_subscribed, generation_count')
    .eq('id', user.id)
    .single()

  const isSubscribed = profile?.is_subscribed ?? false
  const genCount = profile?.generation_count ?? 0

  if (!isSubscribed && genCount >= FREE_LIMIT) {
    return NextResponse.json({
      error: 'free_limit_reached',
      message: 'You have used all 3 free generations. Upgrade to Summit Pro for unlimited access.',
    }, { status: 403 })
  }

  const userPrompt = prompt || Object.entries(fields || {})
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  let message
  try {
    message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: isSubscribed ? 1024 : 512,
      system: SYSTEM_PROMPTS[tool],
      messages: [{ role: 'user', content: userPrompt }],
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Anthropic API error'
    console.error('Anthropic error:', err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  const output = (message.content[0] as { type: string; text: string }).text

  // Save to history (only for subscribed users)
  if (isSubscribed) {
    await supabase.from('generations').insert({
      user_id: user.id,
      tool,
      input: userPrompt,
      output,
    })
  }

  // Increment generation count for free users
  if (!isSubscribed) {
    await supabase.from('profiles')
      .update({ generation_count: genCount + 1 })
      .eq('id', user.id)
  }

  return NextResponse.json({ output, isSubscribed })
}
