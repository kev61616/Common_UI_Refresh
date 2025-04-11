import React from 'react';

export const SubjectIcon = ({ subject }: {subject: string;}) => {
  switch (subject) {
    case 'Math':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="34da9er">
          <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="brwcm22" />
        </svg>);

    case 'Reading':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="lunzmf:">
          <path d="M4 4L6 6M6 6L8 8M6 6L8 4M6 6L4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="rv9e-tv" />
          <path d="M10 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="s9bgz7:" />
          <path d="M4 16L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="zwxfhvq" />
          <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="nd84diw" />
          <path d="M10 20L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="ho3_536" />
        </svg>);

    case 'Writing':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="fs9:fbp">
          <path d="M8 18L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="1::kwvg" />
          <path d="M8 14L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="b5m02oi" />
          <path d="M12 10L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid=":guw4jm" />
          <path d="M7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10Z" fill="currentColor" data-oid="jfqekq9" />
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" data-oid="wr_40cs" />
        </svg>);

    default:
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="qaxn36c">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" data-oid="3oubd3z" />
        </svg>);

  }
};

export const TopicIcon = ({ topic }: {topic: string;}) => {
  if (topic.includes('Algebra')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="w1nu3vw">
        <path d="M6 4V20M18 4V20M4 18H20M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="tbtvbmv" />
      </svg>);

  }

  if (topic.includes('Grammar')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="vsla.ly">
        <path d="M4 7L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="562zsib" />
        <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="r-1g-q0" />
        <path d="M4 17L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="4inolhp" />
      </svg>);

  }

  if (topic.includes('Reading') || topic.includes('Comprehension')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="luvwtyo">
        <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="uu83r7b" />
      </svg>);

  }

  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="5xi:bhn">
      <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="c2ojxw8" />
    </svg>);

};

export const ErrorPatternIcon = () =>
<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="n0pka7:">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" data-oid="j:m_:lg" />
  </svg>;


export const GroupIcon = () =>
<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="ip:ie7.">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" data-oid="f9hxhl5" />
  </svg>;


export const PatternDetectionIcon = () =>
<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="tqj..qg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" data-oid="6ab2-:e" />
  </svg>;


export const EmptyResultsIcon = () =>
<svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="xj0ugsn">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="lcaow-w" />
  </svg>;