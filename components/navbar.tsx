"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Concretely", href: "#concretely" },
  { name: "Benefits", href: "#benefits" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const shouldReduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bgColor = useTransform(
    scrollY,
    [0, 200],
    ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]
  );

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md"
      style={{ backgroundColor: bgColor }}
      initial={shouldReduce ? {} : { y: -50, opacity: 0 }}
      animate={shouldReduce ? {} : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <motion.a
          href="/"
          className="flex flex-col"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-2xl font-bold tracking-tight">
            KORE<span className="font-light">focus</span>
          </span>
          <p className="text-sm uppercase tracking-wider">AI+DATA+WORKFLOWS</p>
        </motion.a>
        <nav>
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            {navItems.map((item, i) => (
              <motion.li
                key={item.href}
                initial={shouldReduce ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
              >
                <Button variant="link" size="sm" asChild>
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
