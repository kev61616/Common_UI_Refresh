"use client";

import Link from "next/link";
import { 
  BookOpen, 
  BookText, 
  GraduationCap,
  BarChart3,
  Home
} from "lucide-react";

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
        isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
      }`}
      aria-label={label}
    >
      <div className="relative">
        {icon}
        {isActive && (
          <div className="absolute h-2 w-2 bg-blue-600 rounded-full -top-1 -right-1" />
        )}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-white border-r flex flex-col items-center shadow-sm z-10">
      <div className="pt-5 pb-8">
        <Link href="/" className="text-indigo-600">
          <Home size={24} />
        </Link>
      </div>
      <div className="flex-1 w-full flex flex-col">
        <SidebarItem
          icon={<BookOpen size={20} />}
          isActive={true}
          href="/test/question-bank"
          label="Questions"
        />
        <SidebarItem
          icon={<BookText size={20} />}
          href="/test/passages"
          label="Passages"
        />
        <SidebarItem
          icon={<GraduationCap size={20} />}
          href="/test/concepts"
          label="Concepts"
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          href="/test/progress"
          label="Progress"
        />
      </div>
    </div>
  );
}
