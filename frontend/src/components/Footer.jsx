import React from 'react'
import Anchor from './Anchor'


function Footer({ text, linkMap }) {

  const parseAnchors = (paragraph) =>
    paragraph
      .split(/(#a\{.*?\})/g)
      .map((chunk, i) => {
        const match = chunk.match(/^#a\{(.*?)\}$/)
        if (!match) return chunk
        const label = match[1]
        const href = linkMap[label]
        return href
          ? <Anchor key={i} link={href} label={label} slate="text-slate-400" />
          : label
      })



    return (
    <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
      <div>
        {text.map((para, idx) => (
          <p key={idx} className="mb-4">
            {parseAnchors(para)}
          </p>
        ))}
      </div>
    </footer>
    )
}

export default Footer
