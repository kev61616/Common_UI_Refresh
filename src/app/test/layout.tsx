import React from 'react';

export default function TestLayout({
  children


}: {children: React.ReactNode;}) {
  return (
    <div className="min-h-screen" data-oid="s.a3ay-">
      {/* Common layout elements for all Test pages can go here */}
      <main data-oid=".lvlmdj">{children}</main>
    </div>);

}