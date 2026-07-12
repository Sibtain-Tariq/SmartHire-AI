import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import StatsSection from '../components/landing/StatsSection'
import PartnersSection from '../components/landing/PartnersSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import ATSDemoSection from '../components/landing/ATSDemoSection'
import InterviewDemoSection from '../components/landing/InterviewDemoSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import FAQSection from '../components/landing/FAQSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <Navbar />
      <HeroSection />
      <StatsSection />
      <PartnersSection />
      <FeaturesSection />
      <ATSDemoSection />
      <InterviewDemoSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </motion.div>
  )
}
