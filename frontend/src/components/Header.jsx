import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFAIcon } from './iconLoader';


function Header(props) {
    const header = props.data

    return (
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24 ml-4">
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                    <a href="/">{header.name}</a>
                </h1>
                <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                    {header.role}
                </h2>
                <p className="mt-4 max-w-xs leading-normal">{header.desc}</p>

                {header.skills?.length > 0 && (
                    <div className="mt-4">
                        <ul className="flex flex-wrap gap-2">
                            {header.skills.map((skill, index) => (
                                <li key={index} className="px-3 py-1 text-xs font-medium leading-5 text-teal-300 bg-teal-400/10 rounded-full">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <nav className="nav hidden lg:block mb-5" aria-label="In-page jump links">
                    <ul className="mt-8 w-max">
                        <li>
                            <a className="group flex items-center py-3 active" href="#about">
                                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">About</span>
                            </a>
                        </li>
                        <li>
                            <a className="group flex items-center py-3" href="#experience">
                                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">Experience</span>
                            </a>
                        </li>
                        <li>
                            <a className="group flex items-center py-3" href="#projects">
                                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">Projects</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {Object.keys(header.icons || {}).length > 0 && (
                <ul className="ml-1 mt-2 flex items-center" aria-label="Social media">
                    {Object.entries(header.icons).map(([key, value]) => {
                        const icon = getFAIcon(value.iconSrc); // iconSrc = "faGithub" or "faLinkedin"
                        return icon ? (
                            <li key={key} className="mr-5 shrink-0 text-xs">
                                <a href={value.link} target="_blank" rel="noreferrer noopener" className="block hover:text-slate-200">
                                    <FontAwesomeIcon icon={icon} className="h-10 w-10"  size="2x" />
                                </a>
                            </li>
                        ) : null;
                    })}
                </ul>
            )}
        </header>
    );
}

export default Header;