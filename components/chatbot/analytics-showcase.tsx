'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart } from '../charts/area-chart';
import { BarChart } from '../charts/bar-chart';

const AnalyticsShowcase = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="mx-auto max-w-3xl p-4 pt-0"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="prose mb-8 font-medium"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Here’s a quick look at our chart components in action — designed for
          clear, actionable insights.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-8 md:flex-row"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <BarChart />
          <AreaChart />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnalyticsShowcase;
