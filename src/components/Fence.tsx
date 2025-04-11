'use client';

import { Fragment } from 'react';
import { Highlight } from 'prism-react-renderer';

export function Fence({
  children,
  language



}: {children: string;language: string;}) {
  return (
    <Highlight
      code={children.trimEnd()}
      language={language}
      theme={{ plain: {}, styles: [] }} data-oid="9h0r0hq">

      {({ className, style, tokens, getTokenProps }) =>
      <pre className={className} style={style} data-oid="lkbg_8.">
          <code data-oid="50uydgh">
            {tokens.map((line, lineIndex) =>
          <Fragment key={lineIndex}>
                {line.
            filter((token) => !token.empty).
            map((token, tokenIndex) =>
            <span key={tokenIndex} {...getTokenProps({ token })} data-oid="1t6x016" />
            )}
                {'\n'}
              </Fragment>
          )}
          </code>
        </pre>
      }
    </Highlight>);

}