// components/UseCaseNavigator.tsx
"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Lightbulb, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const SECTIONS = [
  { id: "pain-points", label: "Pain Points", Icon: AlertTriangle },
  { id: "solution", label: "Solution", Icon: Lightbulb },
  { id: "benefits", label: "Benefits", Icon: TrendingUp },
  { id: "our-role", label: "Korefocus Role", Icon: Users },
] as const;

export default function UseCaseNavigator() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id as string);

  // scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-96px 0px -70% 0px",
        threshold: 0,
      }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav aria-label="On-page navigation" className="relative">
      {/* line between text and icon (icons are 2.5rem wide) */}
      <div className="absolute inset-y-0 left-[calc(100%-1.25rem)] w-px bg-gray-200" />

      <ul className="space-y-10">
        {SECTIONS.map(({ id, label, Icon }) => {
          const isActive = id === activeId;
          return (
            <li key={id}>
              <Button
                onClick={handleClick(id)}
                variant="ghost"
                className="pr-0 justify-between w-full cursor-pointer hover:bg-white "
              >
                <span
                  className={cn(
                    "text-2xl font-medium transition-colors",
                    isActive ? "text-accent" : "text-gray-700 hover:text-accent"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {label}
                </span>

                {/* icon on right, overlapping the line */}
                <div
                  className={cn(
                    "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    isActive
                      ? "bg-accent border-accent scale-110"
                      : "bg-white border-gray-300"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-6 h-6 transition-colors",
                      isActive ? "text-white" : "text-gray-400"
                    )}
                  />
                </div>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
