import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/home/Hero').then(m => ({ default: m.Hero })), {
  loading: () => <div className="min-h-[90vh] bg-dark" />,
});
const MenuSection = dynamic(() => import('@/components/home/MenuSection').then(m => ({ default: m.MenuSection })), {
  loading: () => <div className="py-12" />,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <MenuSection />
    </>
  );
}
