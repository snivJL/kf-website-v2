import { motion } from 'framer-motion';
import Image from 'next/image';

export const Greeting = () => {
  return (
    <div
      key="overview"
      className="relative mx-auto flex size-full max-w-3xl flex-col justify-center px-8 md:mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.1 }}
        className="absolute inset-x-0 -top-12 flex items-center justify-center"
      >
        <Image
          src="/logo-large.svg"
          alt="Korefocus Logo"
          width={256}
          height={256}
          priority
        />{' '}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold"
      >
        Hello there, I&apos;m Kornelia!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.3 }}
        className="text-2xl text-zinc-500"
      >
        Ask anything about Korefocus
      </motion.div>
    </div>
  );
};
