'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { type Section, type Subsection } from '@/lib/sections';

export function TableOfContents({
  tableOfContents


}: {tableOfContents: Array<Section>;}) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id);

  let getHeadings = useCallback((tableOfContents: Array<Section>) => {
    return tableOfContents.
    flatMap((node) => [node.id, ...node.children.map((child) => child.id)]).
    map((id) => {
      let el = document.getElementById(id);
      if (!el) return null;

      let style = window.getComputedStyle(el);
      let scrollMt = parseFloat(style.scrollMarginTop);

      let top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
      return { id, top };
    }).
    filter((x): x is {id: string;top: number;} => x !== null);
  }, []);

  useEffect(() => {
    if (tableOfContents.length === 0) return;
    let headings = getHeadings(tableOfContents);
    function onScroll() {
      let top = window.scrollY;
      let current = headings[0].id;
      for (let heading of headings) {
        if (top >= heading.top - 10) {
          current = heading.id;
        } else {
          break;
        }
      }
      setCurrentSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [getHeadings, tableOfContents]);

  function isActive(section: Section | Subsection) {
    if (section.id === currentSection) {
      return true;
    }
    if (!section.children) {
      return false;
    }
    return section.children.findIndex(isActive) > -1;
  }

  return (
    <div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6" data-oid=".emjfxr">
      <nav aria-labelledby="on-this-page-title" className="w-56" data-oid="nt9bdmp">
        {tableOfContents.length > 0 &&
        <>
            <h2
            id="on-this-page-title"
            className="font-display text-sm font-medium text-slate-900 dark:text-white" data-oid="o.jn5c3">

              On this page
            </h2>
            <ol role="list" className="mt-4 space-y-3 text-sm" data-oid="614f3s.">
              {tableOfContents.map((section) =>
            <li key={section.id} data-oid="5pqvq2j">
                  <h3 data-oid="u3wzqj2">
                    <Link
                  href={`#${section.id}`}
                  className={clsx(
                    isActive(section) ?
                    'text-sky-500' :
                    'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                  )} data-oid="4_2dae9">

                      {section.title}
                    </Link>
                  </h3>
                  {section.children.length > 0 &&
              <ol
                role="list"
                className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400" data-oid="xql6g0:">

                      {section.children.map((subSection) =>
                <li key={subSection.id} data-oid="k3joq1i">
                          <Link
                    href={`#${subSection.id}`}
                    className={
                    isActive(subSection) ?
                    'text-sky-500' :
                    'hover:text-slate-600 dark:hover:text-slate-300'
                    } data-oid="t:m3.u4">

                            {subSection.title}
                          </Link>
                        </li>
                )}
                    </ol>
              }
                </li>
            )}
            </ol>
          </>
        }
      </nav>
    </div>);

}