"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Car, Newspaper, Tag, MessageSquare, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Хянах самбар", icon: LayoutDashboard },
  { href: "/admin/models", label: "Загвар & Үнэ", icon: Car },
  { href: "/admin/news", label: "Мэдээ", icon: Newspaper },
  { href: "/admin/offers", label: "Тусгай санал", icon: Tag },
  { href: "/admin/leads", label: "Хүсэлтүүд", icon: MessageSquare },
];

export default function AdminShell({ children, username }: { children: React.ReactNode; username: string }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F5F5F6] flex">
      <aside className="w-64 bg-[#17181B] text-white flex flex-col shrink-0">
        <div className="px-5 py-6 border-b border-white/10">
          <p className="font-extrabold text-lg leading-tight">JETOUR Mongolia</p>
          <p className="text-xs text-white/50">Удирдлагын самбар</p>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                  active ? "bg-[#E20A17] text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-xs text-white/50 mb-2">Нэвтэрсэн: {username}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            Гарах
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6 lg:p-10">{children}</main>
    </div>
  );
}
