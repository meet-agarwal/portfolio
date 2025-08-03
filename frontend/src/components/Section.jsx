import React from 'react'
import SectionCard from './SectionCard'
import ProjectCard from './ProjectCard'
import ExperienceCard from './ExperienceCard'

function Section(props) {
  const { type, data } = props

  // linkVisible = true, href = '/resume.pdf', label = 'Résumé' ,

  const linkVisible = !!(data?.links?.src?.trim());
  const href = data?.links?.src;
  const label = data?.links?.label || 'Document';
  const limit = data?.limit

  let Card
  if (type === 'project') {
    Card = ProjectCard
  } else if (type === 'experience') {
    Card = ExperienceCard
  } else {
    Card = SectionCard
  }

  return (
    <section
      id={type}
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label={type}
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          {type}
        </h2>
      </div>

      <div>
        <ul className="group/list">
          {(type === 'experience' || (type === 'project' && !limit)|| (type == 'section')) && data?.cards?.map((cardData, index) => (
            <Card key={index} {...cardData} />
          ))}
          {type === 'project' && limit && data?.cards?.slice(0, limit).map((cardData, index) => (
            <Card key={index} {...cardData} />
          ))}
        </ul>

        <div className={`${linkVisible ? 'mt-12' : 'hidden'}`}>
          <a
            className="inline-flex items-baseline font-semibold leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`View Full ${label} (opens in a new tab)`}
          >
            View Full{' '}
            <span className="inline-block">
              {label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="inline-block h-4 w-4 ml-1 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Section
