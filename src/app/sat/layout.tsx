import React from 'react';

export default function SATLayout({
  children


}: {children: React.ReactNode;}) {
  return (
    <div className="min-h-screen" data-oid="cpdk60m">
      {/* Common layout elements for all SAT pages can go here */}
      <main data-oid="8co.ebo">{children}</main>
    </div>);

}