import React from "react";

function SectionCard({
  date = "",
  Title = "",
  projectLink = "",
  desc = "",
  tags = [],
  pinLinks = {},
  img = ""
}) {
  return (
    <li className="mb-12">
      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

        <div className="z-10 sm:order-2 sm:col-span-6">
          {Title && (
            <h3>
              {projectLink ? (
                <a
                  className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                  href={projectLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${Title} (opens in a new tab)`}
                >
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                  <span>
                    {Title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
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
              ) : (
                <span>{Title}</span>
              )}
            </h3>
          )}

          {date && (
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mt-1">
              {date}
            </p>
          )}

          {desc && (
            <p className="mt-2 text-sm leading-normal">
              {desc}
            </p>
          )}

          {Object.keys(pinLinks || {}).length > 0 && (
            <ul className="mt-2 flex flex-wrap" aria-label="Related links">
              {Object.entries(pinLinks || {}).map(([key, value]) => (
                value && (
                  <li key={key} className="mr-4">
                    <a
                      className="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-teal-300 focus-visible:text-teal-300"
                      href={value}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${key} (opens in a new tab)`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-3 w-3"
                        aria-hidden="true"
                      >
                        <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                        <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                      </svg>
                      <span>{key}</span>
                    </a>
                  </li>
                )
              ))}
            </ul>
          )}

          {tags?.length > 0 && (
            <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
              {tags.map((tech) => (
                <li key={tech} className="mr-1.5 mt-2">
                  <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                    {tech}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {img && (
          <img
            alt={Title || "Project image"}
            loading="lazy"
            width="200"
            height="48"
            decoding="async"
            className="aspect-video object-cover rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
            style={{ color: 'transparent' }}
            src={img}
          />
        )}
      </div>
    </li>
  );
}

export default SectionCard;