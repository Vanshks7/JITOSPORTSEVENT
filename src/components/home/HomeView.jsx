import React from 'react';
import HeroBanner from './HeroBanner';
import MetricsGrid from './MetricsGrid';
import SponsorsMarquee from './SponsorsMarquee';
import ActionCards from './ActionCards';
import TermsSection from './TermsSection';

export default function HomeView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <HeroBanner />
      <MetricsGrid />
      <SponsorsMarquee />
      <ActionCards />
      <TermsSection />
    </div>
  );
}
