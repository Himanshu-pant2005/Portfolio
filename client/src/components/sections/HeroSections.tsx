"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Typewriter hook                                                    */
/* ------------------------------------------------------------------ */

function useTypewriter(words: string[], typingSpeed = 90, deletingSpeed = 45, pause = 1400) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]

    // Finished typing the full word -> pause, then start deleting.
    if (!deleting && subIndex === current.length) {
      const timeout = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(timeout)
    }

    // Finished deleting -> move to next word.
    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1))
      },
      deleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause])

  return words[index % words.length].substring(0, subIndex)
}

/* ------------------------------------------------------------------ */
/*  Fake code lines for the floating card                              */
/* ------------------------------------------------------------------ */

const codeLines: { tokens: { text: string; cls: string }[] }[] = [
  { tokens: [{ text: "const", cls: "text-[var(--neon-purple)]" }, { text: " developer", cls: "text-[var(--neon-blue)]" }, { text: " = {", cls: "text-zinc-400" }] },
  { tokens: [{ text: "  name", cls: "text-zinc-300" }, { text: ": ", cls: "text-zinc-500" }, { text: "'Himanshu Pant'", cls: "text-emerald-400" }, { text: ",", cls: "text-zinc-500" }] },
  { tokens: [{ text: "  stack", cls: "text-zinc-300" }, { text: ": [", cls: "text-zinc-500" }, { text: "'React'", cls: "text-emerald-400" }, { text: ", ", cls: "text-zinc-500" }, { text: "'Node'", cls: "text-emerald-400" }, { text: "],", cls: "text-zinc-500" }] },
  { tokens: [{ text: "  shipping", cls: "text-zinc-300" }, { text: ": ", cls: "text-zinc-500" }, { text: "true", cls: "text-[var(--neon-purple)]" }, { text: ",", cls: "text-zinc-500" }] },
  { tokens: [{ text: "  build", cls: "text-[var(--neon-blue)]" }, { text: ": () => ", cls: "text-zinc-500" }, { text: "(", cls: "text-zinc-400" }] },
  { tokens: [{ text: "    deploy", cls: "text-[var(--neon-blue)]" }, { text: "(", cls: "text-zinc-400" }, { text: "'production'", cls: "text-emerald-400" }, { text: ")", cls: "text-zinc-400" }] },
  { tokens: [{ text: "  ),", cls: "text-zinc-400" }] },
  { tokens: [{ text: "}", cls: "text-zinc-400" }] },
]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HeroSection() {
  const roles = useMemo(() => ["Full Stack Developer", "Next.js & Node.js Engineer", "Open Source Builder", "Hackathon Builder"], [])
  const typed = useTypewriter(roles)

  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden font-sans"
      style={
        {
          // Color tokens — referenced everywhere via var() instead of hardcoded hex.
          "--neon-blue": "#00f0ff",
          "--neon-purple": "#a855f7",
          backgroundColor: "#0a0a0a",
        } as React.CSSProperties
      }
    >
      {/* Ambient glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-20 blur-[120px]"
        style={{ backgroundColor: "var(--neon-blue)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full opacity-20 blur-[120px]"
        style={{ backgroundColor: "var(--neon-purple)" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-8 lg:px-8">
        {/* -------------------------------------------------------- */}
        {/*  Left column                                             */}
        {/* -------------------------------------------------------- */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start">
          {/* Availability pill */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium tracking-wide text-zinc-300">Available for work</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Himanshu Pant
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={item} className="mt-4 flex items-center text-2xl font-semibold sm:text-3xl">
            <span style={{ color: "var(--neon-blue)" }}>{typed}</span>
            <span
              className="ml-1 inline-block h-7 w-[3px] animate-pulse sm:h-8"
              style={{ backgroundColor: "var(--neon-blue)" }}
              aria-hidden
            />
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} className="mt-5 max-w-md text-pretty leading-relaxed text-zinc-400">
            I'm Himanshu, a full-stack developer and 3rd-year CS student building real-world web applications with Next.js, Node.js. From college admission portals to civic waste management platforms, I like projects that actually solve something. Currently open to internships. 
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold text-white transition-all duration-300"
              style={{
                borderColor: "var(--neon-blue)",
                boxShadow: "0 0 18px -2px var(--neon-blue)",
                backgroundColor: "rgba(0, 240, 255, 0.06)",
              }}
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#cv"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors duration-300 hover:border-zinc-600 hover:text-white"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* -------------------------------------------------------- */}
        {/*  Right column — floating code card                       */}
        {/* -------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="relative rounded-xl border border-zinc-800/80"
            style={{
              backgroundColor: "#111111",
              boxShadow: "0 0 60px -10px var(--neon-purple)",
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-zinc-800/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-zinc-500">developer.ts</span>
            </div>

            {/* Code body */}
            <div className="overflow-x-auto px-5 py-5 font-mono text-sm leading-7">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.12 }}
                  className="flex whitespace-pre"
                >
                  <span className="mr-4 select-none text-zinc-700">{i + 1}</span>
                  <span>
                    {line.tokens.map((t, j) => (
                      <span key={j} className={t.cls}>
                        {t.text}
                      </span>
                    ))}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}