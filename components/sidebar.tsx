"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/users", icon: Users, label: "Users" },
  { href: "/calendar", icon: Calendar, label: "Calendar" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-background border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <span className="text-lg font-semibold">SaaS App</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className="flex-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}>
              <span
                className={cn(
                  "flex items-center py-2 px-4 space-x-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors",
                  {
                    "bg-accent text-accent-foreground": pathname === href,
                    "justify-center": collapsed,
                  }
                )}
              >
                <Icon className="h-5 w-5" />
                {!collapsed && <span>{label}</span>}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
