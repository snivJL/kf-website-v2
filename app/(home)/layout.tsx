import Footer from '@/components/footer';
import type { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll">
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
