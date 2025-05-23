import Footer from '@/components/footer';
import type { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
