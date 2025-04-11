import { Fragment } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Highlight } from 'prism-react-renderer';

import { Button } from '@/components/Button';
import { HeroBackground } from '@/components/HeroBackground';
import blurCyanImage from '@/images/blur-cyan.png';
import blurIndigoImage from '@/images/blur-indigo.png';

const codeLanguage = 'javascript';
const code = `export default {
  strategy: 'predictive',
  engine: {
    cpus: 12,
    backups: ['./storage/cache.wtf'],
  },
}`;

const tabs = [
{ name: 'cache-advance.config.js', isActive: true },
{ name: 'package.json', isActive: false }];


function TrafficLightsIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props} data-oid="_dzwcz_">
      <circle cx="5" cy="5" r="4.5" data-oid="d_f5dv9" />
      <circle cx="21" cy="5" r="4.5" data-oid="58f6q41" />
      <circle cx="37" cy="5" r="4.5" data-oid="91506t4" />
    </svg>);

}

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:mt-[-4.75rem] dark:-mb-32 dark:pt-[4.75rem] dark:pb-32" data-oid="2wdtmpt">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20" data-oid="yjct8t6">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12" data-oid=".obxeue">
          <div className="relative z-10 md:text-center lg:text-left" data-oid="i37vjsu">
            <Image
              className="absolute right-full bottom-full -mr-72 -mb-56 opacity-50"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority data-oid="v0u.9sq" />

            <div className="relative" data-oid="zbht3n1">
              <p className="inline bg-linear-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent" data-oid="h8757bz">
                Never miss the cache again.
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400" data-oid="q5-v029">
                Cache every single thing your app could ever do ahead of time,
                so your code never even has to run at all.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start" data-oid="kbwkyb9">
                <Button href="/" data-oid="719bwh:">Get started</Button>
                <Button href="/" variant="secondary" data-oid="syvxr7p">
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10" data-oid="xg:fgj.">
            <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 [mask-image:linear-gradient(transparent,white,white)] lg:-top-32 lg:right-0 lg:-bottom-32 lg:left-[calc(50%+14rem)] lg:[mask-image:none] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:dark:[mask-image:linear-gradient(white,white,transparent)]" data-oid="t2a9cy7">
              <HeroBackground className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" data-oid="0y980vf" />
            </div>
            <div className="relative" data-oid="5ek4h4t">
              <Image
                className="absolute -top-64 -right-64"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
                unoptimized
                priority data-oid="jfenh7s" />

              <Image
                className="absolute -right-44 -bottom-40"
                src={blurIndigoImage}
                alt=""
                width={567}
                height={567}
                unoptimized
                priority data-oid="j4xxibu" />

              <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" data-oid="ne:wiw3" />
              <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" data-oid="jwlj-0c" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur-sm" data-oid="-dyy_:m">
                <div className="absolute -top-px right-11 left-20 h-px bg-linear-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" data-oid="t:3owah" />
                <div className="absolute right-20 -bottom-px left-11 h-px bg-linear-to-r from-blue-400/0 via-blue-400 to-blue-400/0" data-oid="fblq6_o" />
                <div className="pt-4 pl-4" data-oid="92-ssew">
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" data-oid="k16ilfp" />
                  <div className="mt-4 flex space-x-2 text-xs" data-oid="_79215p">
                    {tabs.map((tab) =>
                    <div
                      key={tab.name}
                      className={clsx(
                        'flex h-6 rounded-full',
                        tab.isActive ?
                        'bg-linear-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300' :
                        'text-slate-500'
                      )} data-oid="hp1h97t">

                        <div
                        className={clsx(
                          'flex items-center rounded-full px-2.5',
                          tab.isActive && 'bg-slate-800'
                        )} data-oid="js:oc1g">

                          {tab.name}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex items-start px-1 text-sm" data-oid="0zfbgk.">
                    <div
                      aria-hidden="true"
                      className="border-r border-slate-300/5 pr-4 font-mono text-slate-600 select-none" data-oid="3jtx8-6">

                      {Array.from({
                        length: code.split('\n').length
                      }).map((_, index) =>
                      <Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br data-oid="os3zb-." />
                        </Fragment>
                      )}
                    </div>
                    <Highlight
                      code={code}
                      language={codeLanguage}
                      theme={{ plain: {}, styles: [] }} data-oid="wbvqy0t">

                      {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps
                      }) =>
                      <pre
                        className={clsx(
                          className,
                          'flex overflow-x-auto pb-6'
                        )}
                        style={style} data-oid="j2k._q:">

                          <code className="px-4" data-oid="l0nx:ac">
                            {tokens.map((line, lineIndex) =>
                          <div key={lineIndex} {...getLineProps({ line })} data-oid="-u72b_l">
                                {line.map((token, tokenIndex) =>
                            <span
                              key={tokenIndex}
                              {...getTokenProps({ token })} data-oid="o5opqqo" />

                            )}
                              </div>
                          )}
                          </code>
                        </pre>
                      }
                    </Highlight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}