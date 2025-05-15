'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const navItems = [
  { name: 'What We Do', href: '/#what-we-do' },
  { name: 'How We Work', href: '/#how-we-work' },
  { name: 'Client Cases', href: '/#use-cases' },
  { name: 'FAQ', href: '/#faq' },
];

export default function Navbar() {
  const shouldReduce = useReducedMotion();
  const { scrollY } = useScroll();

  // background fade
  const bgColor = useTransform(
    scrollY,
    [0, 200],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)']
  );

  // subtle drop-shadow as you scroll
  const shadow = useTransform(
    scrollY,
    [0, 50],
    [
      'drop-shadow(0 0px 0 rgba(0,0,0,0))',
      'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
    ]
  );

  return (
    <motion.header
      className="fixed top-0 left-0 z-50 w-full py-4 backdrop-blur-md backdrop-filter"
      style={{ backgroundColor: bgColor, filter: shadow }}
      initial={shouldReduce ? {} : { y: -50, opacity: 0 }}
      animate={shouldReduce ? {} : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.a
          href="/"
          className="flex flex-col"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src="/logo-small.svg"
            alt="Korefocus logo"
            width={128}
            height={128}
          />
        </motion.a>
      </div>

      {/* centered nav */}
      <nav className="pointer-events-none absolute inset-x-0 top-4 flex h-16 justify-center">
        <ul className="bg-primary border-accent pointer-events-auto hidden space-x-4 rounded-full border p-4 text-sm font-medium md:flex">
          {navItems.map((item, i) => (
            <motion.li
              key={item.href}
              initial={shouldReduce ? {} : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
            >
              <Button variant="link" className="text-white" size="sm" asChild>
                <Link href={item.href}>{item.name}</Link>
              </Button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
