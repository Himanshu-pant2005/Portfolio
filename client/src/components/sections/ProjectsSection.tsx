"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GitBranch, ExternalLink } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Project data                                                       */
/* ------------------------------------------------------------------ */

type Project = {
  title: string
  description: string
  stack: string[]
  github: string
  demo: string
}

const projects: Project[] = [
  {
    title: "CounselSphere",
    description:
      "Full-stack college admission portal with merit-based student ranking, real-time seat matrix, admin dashboard for branch management, Google OAuth login, and auto-generated PDF offer letters.",
    stack: ["Next.js", "Prisma ORM", "NextAuth.js", "SQLite", "jsPDF", "Vercel"],
    github: "https://github.com/Himanshu-pant2005/College-Counselling-Web-App",
    demo: "",
  },
  {
    title: "Smart Waste Management System",
    description:
      "Civic platform built for Smart India Hackathon — connects citizens, admins, and vehicle operators to streamline municipal waste complaint resolution with real-time map tracking.",
    stack: ["HTML5", "CSS3", "JavaScript", "Leaflet.js"],
    github: "https://github.com/Himanshu-pant2005/Smart-Waste-Management-System",
    demo: "",
  },
  {
    title: "Smart Code Reviewer",
    description:
      "Browser-based JavaScript tool that parses submitted code and generates contextual improvement suggestions — flags common issues like unused variables, poor naming, and missing error handling.",
    stack: ["JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/Himanshu-pant2005/smart-code-reviewer",
    demo: "",
  },
]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const headerVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

/* ------------------------------------------------------------------ */
/*  Single card                                                        */
/* ------------------------------------------------------------------ */

function ProjectCard({ project, accent }: { project: Project; accent: string }) {
  return (
    <motion.article
      variants={cardVariant}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800/80 p-6"
      style={{ backgroundColor: "#111111" }}
    >
      {/* Top border glow — alternates cyan / purple */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: accent, boxShadow: `0 0 12px 0 ${accent}` }}
      />
      {/* Hover bloom that intensifies the glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: accent }}
      />

      <h3 className="text-xl font-semibold text-white">{project.title}</h3>

      <p className="mt-2 line-clamp-2 text-pretty text-sm leading-relaxed text-zinc-400">{project.description}</p>

      {/* Tech stack badges */}
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs font-medium text-zinc-300"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* Links */}
      <div className="mt-6 flex items-center gap-3 border-t border-zinc-800/80 pt-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code on GitHub`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors duration-300 hover:border-zinc-600 hover:text-white"
        >
          <GitBranch className="h-4 w-4" />
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-all duration-300 hover:text-white"
          style={{ boxShadow: "none" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = accent
            e.currentTarget.style.boxShadow = `0 0 14px -2px ${accent}`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = ""
            e.currentTarget.style.boxShadow = "none"
          }}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
        id="work"
      className="relative w-full overflow-hidden font-sans"
      style={
        {
          "--neon-blue": "#00f0ff",
          "--neon-purple": "#a855f7",
          backgroundColor: "#0a0a0a",
        } as React.CSSProperties
      }
    >
      <div ref={ref} className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headerVariant}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--neon-blue)" }}
          >
            Projects
          </p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Things I&apos;ve Built
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              accent={i % 2 === 0 ? "var(--neon-blue)" : "var(--neon-purple)"}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}