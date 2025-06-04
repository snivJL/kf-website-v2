// components/Footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="prose-lg border-accent/5 border-t-2 bg-white px-4 py-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        {/* Logo & Branding */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo-large.png"
            alt="Korefocus logo"
            width={256}
            height={256}
          />
        </div>

        {/* Site Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[
              { href: '#hero', label: 'About Us' },
              { href: '#contact-us', label: 'Contact' },
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
            {
              href: 'https://www.linkedin.com/company/korefocus',
            },
          ].map(({ href }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent text-gray-500 transition-colors duration-200"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.039-1.853-3.039-1.853 0-2.137 1.445-2.137 2.939v5.669H9.344V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.601 0 4.268 2.372 4.268 5.452v6.291zM5.337 7.433c-1.145 0-2.071-.928-2.071-2.071 0-1.146.926-2.071 2.071-2.071 1.146 0 2.071.925 2.071 2.071 0 1.143-.925 2.071-2.071 2.071zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.728C24 .774 23.2 0 22.225 0z" />
              </svg>
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
