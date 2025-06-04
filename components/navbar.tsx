'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { PopupButton } from 'react-calendly';

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
      className="fixed inset-x-0 top-0 z-50 w-full py-4 backdrop-blur-md backdrop-filter"
      style={{ backgroundColor: bgColor, filter: shadow }}
      initial={shouldReduce ? {} : { y: -50, opacity: 0 }}
      animate={shouldReduce ? {} : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-large.svg"
              alt="Korefocus logo"
              width={128}
              height={128}
              priority
            />
          </Link>
        </motion.div>

        {/* Mobile Menu (Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full max-w-xs">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <Link href="/">
                  <Image
                    src="/logo-small.svg"
                    alt="Korefocus logo"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
            </SheetHeader>

            <nav
              aria-label="Mobile"
              className="mt-6 flex flex-col justify-center space-y-4 px-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 text-lg font-medium hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Centered Desktop Nav */}
      <nav className="pointer-events-none absolute inset-x-0 top-4 flex h-16 justify-center">
        <ul className="bg-primary border-accent pointer-events-auto hidden space-x-4 rounded-full border p-4 text-sm font-medium text-white md:flex">
          {navItems.map((item, i) => (
            <motion.li
              key={item.href}
              initial={shouldReduce ? {} : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className="hover:bg-primary/90 inline-block rounded-full px-4 py-1"
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="fixed top-6 right-6 z-[60] hidden md:block"
      >
        <Button
          asChild
          className="group animated-background from-accent to-accent/80 relative inline-flex animate-bounce cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r px-5 py-2 text-sm font-semibold text-white shadow-md transition duration-300 hover:from-indigo-500 hover:to-blue-600 hover:shadow-lg"
        >
          {typeof document !== 'undefined' && (
            <PopupButton
              url="https://calendly.com/thomas-korefocus/30min"
              rootElement={document.body}
              text="Book a meeting"
              pageSettings={{
                primaryColor: '2d62ff',
              }}
            />
          )}
        </Button>
      </motion.div>
    </motion.header>
  );
}
