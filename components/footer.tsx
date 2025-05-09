// components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BotIcon } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="prose-lg mt-4 md:mt-4 px-4 py-6 border-t-2 bg-white border-accent/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Logo & Branding */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo_large.svg"
            alt="Korefocus logo"
            width={256}
            height={256}
          />
        </div>

        {/* Site Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {[
            { href: "https://twitter.com", Icon: BotIcon },
            { href: "https://linkedin.com", Icon: BotIcon },
            { href: "https://github.com", Icon: BotIcon },
          ].map(({ href, Icon }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-accent transition-colors duration-200"
            >
              <Icon size={20} />
              <span className="sr-only">{Icon.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Korefocus. All rights reserved.
      </div>
    </motion.footer>
  );
}
