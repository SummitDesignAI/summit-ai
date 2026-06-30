"use client"

import React, { useRef, useEffect, useState, useCallback, memo } from "react"
import { cn } from "@/lib/utils"

interface RainDrop {
  id: number
  left: number
  animationDuration: number
  opacity: number
  size: number
  delay: number
}

interface LightningBolt {
  id: number
  type: "flash" | "bolt"
  intensity: number
  duration: number
}

interface WeatherEffectProps {
  rainIntensity?: number
  rainSpeed?: number
  rainColor?: string
  rainAngle?: number
  rainDropSize?: { min: number; max: number }
  lightningEnabled?: boolean
  lightningFrequency?: number
  lightningHue?: number
  lightningXOffset?: number
  lightningSpeed?: number
  lightningIntensity?: number
  lightningSize?: number
  thunderEnabled?: boolean
  thunderVolume?: number
  thunderDelay?: number
  className?: string
  children?: React.ReactNode
}

const Lightning = memo(({
  lightningHue = 230,
  lightningXOffset = 0,
  lightningSpeed = 1,
  lightningIntensity = 1,
  lightningSize = 1,
}: Pick<WeatherEffectProps, "lightningHue" | "lightningXOffset" | "lightningSpeed" | "lightningIntensity" | "lightningSize">) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || canvas.clientWidth
      canvas.height = canvas.parentElement?.clientHeight || canvas.clientHeight
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    }
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const vs = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`
    const fs = `
      precision mediump float;
      uniform vec2 iResolution; uniform float iTime;
      uniform float uHue, uXOffset, uSpeed, uIntensity, uSize;
      #define OCTAVE_COUNT 10
      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);
        return c.z * mix(vec3(1.), rgb, c.y);
      }
      float hash11(float p) { p=fract(p*.1031); p*=p+33.33; p*=p+p; return fract(p); }
      float hash12(vec2 p) { vec3 p3=fract(vec3(p.xyx)*.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
      mat2 rotate2d(float t) { return mat2(cos(t),-sin(t),sin(t),cos(t)); }
      float noise(vec2 p) {
        vec2 ip=floor(p), fp=fract(p);
        float a=hash12(ip),b=hash12(ip+vec2(1,0)),c=hash12(ip+vec2(0,1)),d=hash12(ip+vec2(1));
        vec2 t=smoothstep(0.,1.,fp);
        return mix(mix(a,b,t.x),mix(c,d,t.x),t.y);
      }
      float fbm(vec2 p) {
        float v=0., a=.5;
        for(int i=0;i<OCTAVE_COUNT;i++){ v+=a*noise(p); p*=rotate2d(.45); p*=2.; a*=.5; }
        return v;
      }
      void main() {
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        uv = 2.*uv-1.; uv.x *= iResolution.x/iResolution.y; uv.x += uXOffset;
        uv += 2.*fbm(uv*uSize+.8*iTime*uSpeed)-1.;
        float dist = abs(uv.x);
        vec3 col = hsv2rgb(vec3(uHue/360.,.7,.8)) * pow(mix(0.,.07,hash11(iTime*uSpeed))/dist,1.) * uIntensity;
        gl_FragColor = vec4(pow(col,vec3(1.)),1.);
      }
    `

    const compile = (src: string, type: number) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src); gl.compileShader(s)
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
    }

    const vs_ = compile(vs, gl.VERTEX_SHADER)
    const fs_ = compile(fs, gl.FRAGMENT_SHADER)
    if (!vs_ || !fs_) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs_); gl.attachShader(prog, fs_); gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const verts = new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, "aPosition")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "iResolution")
    const uTime = gl.getUniformLocation(prog, "iTime")
    const uH = gl.getUniformLocation(prog, "uHue")
    const uX = gl.getUniformLocation(prog, "uXOffset")
    const uSp = gl.getUniformLocation(prog, "uSpeed")
    const uIn = gl.getUniformLocation(prog, "uIntensity")
    const uSz = gl.getUniformLocation(prog, "uSize")

    const t0 = performance.now()
    const loop = () => {
      if (!gl.isContextLost()) {
        gl.uniform2f(uRes, gl.canvas.width, gl.canvas.height)
        gl.uniform1f(uTime, (performance.now() - t0) / 1000)
        gl.uniform1f(uH, lightningHue!); gl.uniform1f(uX, lightningXOffset!)
        gl.uniform1f(uSp, lightningSpeed!); gl.uniform1f(uIn, lightningIntensity!)
        gl.uniform1f(uSz, lightningSize!); gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
      animationFrameId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [lightningHue, lightningXOffset, lightningSpeed, lightningIntensity, lightningSize])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
})
Lightning.displayName = "Lightning"

export const WeatherEffect: React.FC<WeatherEffectProps> = ({
  rainIntensity = 50, rainSpeed = 0.2, rainColor = "rgba(174,194,224,0.6)",
  rainAngle = 10, rainDropSize = { min: 1, max: 2 },
  lightningEnabled = true, lightningFrequency = 4,
  lightningHue, lightningXOffset, lightningSpeed, lightningIntensity, lightningSize,
  thunderEnabled = false, thunderVolume = 0.5, thunderDelay = 2,
  className, children,
}) => {
  const [raindrops, setRaindrops] = useState<RainDrop[]>([])
  const [lightning, setLightning] = useState<LightningBolt | null>(null)
  const lightningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setRaindrops(Array.from({ length: rainIntensity }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: (Math.random() * 1 + 0.5) / rainSpeed,
      opacity: Math.random() * 0.6 + 0.2,
      size: Math.random() * (rainDropSize.max - rainDropSize.min) + rainDropSize.min,
      delay: Math.random() * 2,
    })))
  }, [rainIntensity, rainSpeed, rainDropSize])

  const triggerLightning = useCallback(() => {
    if (!lightningEnabled) return
    const bolt: LightningBolt = { id: Date.now(), type: "flash", intensity: Math.random() * 0.8 + 0.2, duration: 200 + Math.random() * 300 }
    setLightning(bolt)
    setTimeout(() => setLightning(null), bolt.duration)
    lightningTimeoutRef.current = setTimeout(triggerLightning, (lightningFrequency! + Math.random() * lightningFrequency!) * 1000)
  }, [lightningEnabled, lightningFrequency])

  useEffect(() => {
    if (lightningEnabled) {
      lightningTimeoutRef.current = setTimeout(triggerLightning, Math.random() * lightningFrequency! * 1000)
    }
    return () => { if (lightningTimeoutRef.current) clearTimeout(lightningTimeoutRef.current) }
  }, [lightningEnabled, triggerLightning, lightningFrequency])

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {lightningEnabled && lightning && (
        <div className="absolute inset-0 z-10">
          <Lightning lightningHue={lightningHue} lightningXOffset={lightningXOffset} lightningSpeed={lightningSpeed} lightningIntensity={lightningIntensity} lightningSize={lightningSize} />
        </div>
      )}
      {lightning && (
        <div className="pointer-events-none absolute inset-0 z-30" style={{
          background: `radial-gradient(circle, rgba(255,255,255,${lightning.intensity * 0.15}) 0%, transparent 100%)`,
          animation: `lightning-flash ${lightning.duration}ms ease-out forwards`,
        }} />
      )}
      <div className="pointer-events-none absolute inset-0 z-20" style={{ transform: `rotate(${rainAngle}deg)`, transformOrigin: "center center" }}>
        {raindrops.map(drop => (
          <div key={drop.id} className="absolute top-[-20px]" style={{
            left: `${drop.left}%`,
            width: `${drop.size}px`,
            height: `${drop.size * 10}px`,
            background: `linear-gradient(to bottom, transparent, ${rainColor})`,
            borderRadius: `${drop.size}px`,
            animation: `rain-fall ${drop.animationDuration}s linear infinite`,
            animationDelay: `${drop.delay}s`,
            opacity: drop.opacity,
          }} />
        ))}
      </div>
      <div className="relative z-40 flex h-full items-center justify-center">{children}</div>
      <style>{`
        @keyframes rain-fall { 0%{transform:translateY(-20px)} 100%{transform:translateY(calc(100vh + 20px))} }
        @keyframes lightning-flash { 0%,100%{opacity:0} 10%,30%{opacity:1} 20%{opacity:0.3} 40%{opacity:0} }
      `}</style>
    </div>
  )
}
WeatherEffect.displayName = "WeatherEffect"
