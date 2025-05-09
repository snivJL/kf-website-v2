"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "pain-points", label: "Pain Points" },
  { id: "solution", label: "Solution" },
  { id: "benefits", label: "Benefits" },
  { id: "our-role", label: "Korefocus Role" },
] as const;

export default function UseCaseNavigator() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

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
      // update URL hash without jump:
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav aria-label="On-page navigation" className="space-y-2">
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={handleClick(id)}
          className={`
            block text-lg font-medium
            hover:text-accent focus:outline-none
            ${activeId === id ? "text-accent" : "text-gray-700"}
          `}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
