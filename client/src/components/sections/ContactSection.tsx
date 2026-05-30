"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Social = { label: string; href: string; svg: React.ReactNode }

const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/Himanshu-pant2005?tab=overview&from=2026-04-01&to=2026-04-30",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/himanshu-pant-394a512aa/",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
//   {
//     label: "Twitter / X",
//     href: "https://twitter.com",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
//         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//       </svg>
//     ),
//   },
]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

/* ------------------------------------------------------------------ */
/*  Floating-label field                                               */
/* ------------------------------------------------------------------ */

type FieldProps = {
  id: string
  label: string
  type?: string
  textarea?: boolean
  value: string
  onChange: (value: string) => void
}

function Field({ id, label, type = "text", textarea = false, value, onChange }: FieldProps) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  const sharedProps = {
    id,
    name: id,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    required: true,
    placeholder: " ",
    className:
      "peer w-full rounded-lg border bg-[#111111] px-4 pt-6 pb-2 text-white outline-none transition-all duration-300 placeholder:text-transparent",
    style: {
      borderColor: focused ? "var(--neon-blue)" : "rgb(39 39 42)",
      boxShadow: focused ? "0 0 16px -4px var(--neon-blue)" : "none",
    } as React.CSSProperties,
  }

  return (
    <div className="relative">
      {textarea ? (
        <textarea {...sharedProps} rows={5} className={`${sharedProps.className} resize-none`} />
      ) : (
        <input {...sharedProps} type={type} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 z-10 origin-left text-zinc-500 transition-all duration-200"
        style={{
          top: active ? "0.6rem" : "1.1rem",
          fontSize: active ? "0.7rem" : "0.95rem",
          color: focused ? "var(--neon-blue)" : "rgb(113 113 122)",
        }}
      >
        {label}
      </label>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

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
      {/* Ambient glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full opacity-10 blur-[120px]"
        style={{ backgroundColor: "var(--neon-purple)" }}
      />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 mx-auto w-full max-w-[600px] px-6 py-24 text-center"
      >
        <motion.p
          variants={item}
          className="text-sm font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--neon-blue)" }}
        >
          Contact
        </motion.p>

        <motion.h2
          variants={item}
          className="mt-3 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Let&apos;s Work Together
        </motion.h2>

        <motion.p variants={item} className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-zinc-400">
          Have a project in mind or just want to say hi? Drop me a message and I&apos;ll get back to you soon.
        </motion.p>

        {/* Form */}
        <motion.form variants={item} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 text-left">
          <Field id="name" label="Name" value={name} onChange={setName} />
          <Field id="email" label="Email" type="email" value={email} onChange={setEmail} />
          <Field id="message" label="Message" textarea value={message} onChange={setMessage} />

          <button
            type="submit"
            className="mt-2 w-full rounded-lg border px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-125"
            style={{
              borderColor: "var(--neon-blue)",
              boxShadow: "0 0 18px -2px var(--neon-blue)",
              backgroundColor: "rgba(0, 240, 255, 0.06)",
            }}
          >
            {submitted ? "Message Sent — Thank You!" : "Send Message"}
          </button>
        </motion.form>

        {/* Social links */}
        <motion.div variants={item} className="mt-10 flex items-center justify-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-800 bg-[#111111] text-zinc-400 transition-all duration-300 hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--neon-blue)"
                e.currentTarget.style.boxShadow = "0 0 16px -4px var(--neon-blue)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgb(39 39 42)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              {social.svg}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}