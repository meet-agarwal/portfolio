import React from 'react'
import Anchor from './Anchor'


function AboutSection({ text, linkMap }) {

    const parseAnchors = (paragraph) =>
    paragraph
      .split(/(#a\{.*?\})/g)
      .map((chunk, i) => {
        const match = chunk.match(/^#a\{(.*?)\}$/)
        if (!match) return chunk
        const label = match[1]
        const href = linkMap[label]
        return href
          ? <Anchor key={i} link={href} label={label} slate="text-slate-200" />
          : label
      })


  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          About
        </h2>
      </div>

      <div>
        {text.map((para, idx) => (
          <p key={idx} className="mb-4">
            {parseAnchors(para)}
          </p>
        ))}
      </div>
    </section>
  )
}

export default AboutSection
