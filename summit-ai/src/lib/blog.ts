export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-respond-to-google-reviews',
    title: 'How to Respond to Google Reviews (With Examples)',
    excerpt: 'Every Google review — positive or negative — is an opportunity to show potential customers who you are. Here\'s how to respond the right way.',
    date: '2025-06-15',
    category: 'Reputation Management',
    readTime: '5 min read',
    content: `
Google reviews are one of the first things potential customers see when they search for your business. How you respond to them matters just as much as the reviews themselves.

## Why Responding to Reviews Matters

Responding to reviews shows you care about your customers and helps build trust with people who haven't visited yet. Businesses that respond to reviews regularly see higher engagement and better local SEO rankings.

## Responding to Positive Reviews

Keep it genuine and personal. Mention something specific from their review so they know you actually read it.

**Example:**
> "Thank you so much, Sarah! We're so glad you enjoyed the garlic chicken — it's one of our chef's favourites too. We can't wait to see you again!"

## Responding to Negative Reviews

Stay calm, be professional, and take the conversation offline when possible.

**Example:**
> "We're sorry to hear about your experience. This isn't the standard we hold ourselves to. Please reach out to us directly at [email] so we can make this right."

## Tips for Every Response

- Respond within 24–48 hours
- Never argue or get defensive
- Thank every reviewer, even if the feedback is tough
- Keep responses short — one to three sentences is ideal

With Summit AI's Review Reply Generator, you can craft a professional response to any review in seconds — saving you time while keeping your reputation sharp.
    `.trim(),
  },
  {
    slug: 'local-seo-tips-for-small-businesses',
    title: '7 Local SEO Tips That Actually Work for Small Businesses',
    excerpt: 'Ranking higher on Google doesn\'t require a massive budget. These seven proven strategies will help your local business show up when customers search.',
    date: '2025-06-08',
    category: 'SEO',
    readTime: '7 min read',
    content: `
Local SEO is how your business shows up when someone nearby searches for what you offer. Here are seven strategies that consistently move the needle.

## 1. Claim and Optimise Your Google Business Profile

This is the single highest-impact thing you can do. Fill in every field — hours, services, photos, and a detailed description with your city and service keywords.

## 2. Post to Your Google Business Profile Weekly

Google rewards active profiles. Use Summit AI's GBP Post Generator to create a fresh post every week without spending 30 minutes writing it yourself.

## 3. Get More Reviews (and Respond to All of Them)

Ask happy customers to leave a review right after the job is done. Automate your response with AI so no review goes unanswered.

## 4. Use Location Keywords on Your Website

Include your city and service in your page titles, headings, and first paragraph. "Calgary plumber" beats "professional plumber" every time for local searches.

## 5. Build Local Citations

List your business on directories like Yelp, Yellow Pages, and industry-specific sites. Consistent NAP (name, address, phone) across all listings helps Google trust you.

## 6. Publish Local Blog Content

Write about topics your customers actually search for — "best HVAC maintenance tips for Alberta winters" or "how to choose a roofing contractor in Calgary." This is where Summit AI's SEO Blog Writer saves hours.

## 7. Get Backlinks from Local Sources

Sponsor a local event, get featured in a community newsletter, or partner with other local businesses. Local links carry significant weight.

Local SEO is a long game, but these steps compound over time. Start with your Google Business Profile and build from there.
    `.trim(),
  },
  {
    slug: 'ai-tools-for-local-businesses',
    title: 'How Local Businesses Are Using AI to Save 10+ Hours a Week',
    excerpt: 'AI isn\'t just for big corporations anymore. Local businesses are quietly using it to handle the writing tasks that used to eat up their evenings.',
    date: '2025-06-01',
    category: 'AI for Business',
    readTime: '6 min read',
    content: `
Running a local business means wearing every hat. Owner, marketer, customer service rep, bookkeeper — the list never ends. AI is changing that for a growing number of small business owners.

## The Writing Tasks That Steal Your Time

Most local business owners spend hours each week on tasks like:

- Responding to Google reviews
- Writing follow-up emails to customers
- Creating social media posts
- Building quotes and proposals
- Writing job descriptions or FAQ pages

None of these tasks require your expertise — they just require time you don't have.

## What AI Can Do in Seconds

Modern AI tools, especially those built on Claude or GPT-4, can produce professional, human-sounding content in under 10 seconds. The key is giving them the right context.

That's exactly what Summit AI is built for. Instead of a blank-slate AI that needs detailed prompting, each tool is pre-built for a specific task. You fill in a few details about your business and the situation — the AI does the rest.

## Real Time Savings

- Review replies: 15 minutes → 10 seconds
- Customer emails: 20 minutes → 15 seconds
- Social posts: 30 minutes → 20 seconds
- Quotes: 25 minutes → 30 seconds

Over a week, that adds up to 10 or more hours back in your schedule.

## The Right Way to Use AI

AI works best as a starting point, not a final draft. Read the output, adjust the tone if needed, and hit send. You're not outsourcing your voice — you're just getting a strong first draft instantly.

Local businesses that adopt AI tools now are building a real competitive advantage. The ones that don't will still be writing reviews manually while their competitors are booking more jobs.
    `.trim(),
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}
