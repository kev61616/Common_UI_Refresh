"use client";

import Link from "next/link";
import {
  BookOpen,
  BookText,
  GraduationCap,
  BarChart3,
  Home } from
"lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  isActive?: boolean;
  href: string;
  label: string;
}

function SidebarItem({ icon, isActive, href, label }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`w-full flex flex-col items-center justify-center py-3 transition-colors ${
      isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"}`
      }
      aria-label={label} data-oid="zvoueut">

      <div className="relative" data-oid=":wfg4wd">
        {icon}
        {isActive &&
        <div className="absolute h-2 w-2 bg-blue-600 rounded-full -top-1 -right-1" data-oid="ql31so1" />
        }
      </div>
      <span className="text-xs mt-1 font-medium" data-oid="stg_1b.">{label}</span>
    </Link>);

}

export function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-white border-r flex flex-col items-center shadow-sm z-10" data-oid="6__xsd8">
      <div className="pt-5 pb-8" data-oid="nr11y8m">
        <Link href="/" className="text-indigo-600" data-oid="1jgco8r">
          <Home size={24} data-oid="xjw_j0w" />
        </Link>
      </div>
      <div className="flex-1 w-full flex flex-col" data-oid=".gi4v.z">
        <SidebarItem
          icon={<BookOpen size={20} data-oid="0_r:8kx" />}
          isActive={true}
          href="/test/question-bank"
          label="Questions" data-oid="zb7u8.f" />

        <SidebarItem
          icon={<BookText size={20} data-oid="-s8btoc" />}
          href="/test/passages"
          label="Passages" data-oid="paw1j:6" />

        <SidebarItem
          icon={<GraduationCap size={20} data-oid="df_:lqt" />}
          href="/test/concepts"
          label="Concepts" data-oid="hf3xwm1" />

        <SidebarItem
          icon={<BarChart3 size={20} data-oid="8.7njc_" />}
          href="/test/progress"
          label="Progress" data-oid="-i3:att" />

      </div>
    </div>);

}