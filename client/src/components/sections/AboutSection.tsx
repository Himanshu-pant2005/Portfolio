"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Stat = { value: number; suffix: string; label: string }

const stats: Stat[] = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 4, suffix: "+", label: "Projects" },
//   { value: 10, suffix: "+", label: "Clients" },
]

type SkillGroup = { category: string; accent: string; skills: string[] }

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    accent: "var(--neon-blue)",
    skills: ["React", "Next.js", "HTML5", "Tailwind CSS", "CSS3"],
  },
  {
    category: "Backend",
    accent: "var(--neon-purple)",
    skills: ["Node.js", "Prisma ORM", "NextAuth.js", "SQLite"],
  },
  {
    category: "Tools",
    accent: "var(--neon-blue)",
    skills: ["Git", "VS Code", "Google OAuth", "jsPDF", "Vercel", "Figma"],
  },
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
/*  Animated count-up number                                           */
/* ------------------------------------------------------------------ */

function Counter({ value, start }: { value: number; start: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame: number
    const duration = 1200
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, value])

  return <>{display}</>
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      className="relative w-full overflow-hidden font-sans"
      style={
        {
          "--neon-blue": "#00f0ff",
          "--neon-purple": "#a855f7",
          backgroundColor: "#0a0a0a",
        } as React.CSSProperties
      }
    >
      <div
        ref={ref}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-2 md:gap-12 lg:gap-16 lg:px-8"
      >
        {/* -------------------------------------------------------- */}
        {/*  Left column — bio + stats                               */}
        {/* -------------------------------------------------------- */}
        <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.p
            variants={item}
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--neon-blue)" }}
          >
            About
          </motion.p>

          <motion.h2
            variants={item}
            className="mt-3 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            About Me
          </motion.h2>

          <motion.div variants={item} className="mt-6 space-y-4 text-pretty leading-relaxed text-zinc-400">
            <p>
              I&apos;m a full stack developer who loves turning ambitious ideas into fast, accessible products. I care
              deeply about the details that make software feel effortless — smooth interactions, clear interfaces, and
              code that&apos;s a pleasure to maintain.
            </p>
            <p>
              Over the past few years I&apos;ve shipped everything from real-time dashboards to design systems used
              across production apps, working closely with teams to move from prototype to launch.
            </p>
            <p>
              When I&apos;m not building, you&apos;ll find me contributing to open source, exploring new tooling, or
              mentoring other developers.
            </p>
          </motion.div>

          {/* Stat counters */}
          <motion.dl variants={item} className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-zinc-800/80 p-4 text-center"
                style={{ backgroundColor: "#111111" }}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="text-3xl font-bold text-white sm:text-4xl">
                    <Counter value={stat.value} start={inView} />
                    {stat.suffix}
                  </span>
                  <span className="mt-1 block text-xs font-medium leading-tight text-zinc-500">{stat.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* -------------------------------------------------------- */}
        {/*  Right column — skills grid                              */}
        {/* -------------------------------------------------------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={item}
              className="rounded-xl border border-zinc-800/80 p-6"
              style={{ backgroundColor: "#111111" }}
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: group.accent, boxShadow: `0 0 8px 0 ${group.accent}` }}
                />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">{group.category}</h3>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:border-zinc-600 hover:text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
