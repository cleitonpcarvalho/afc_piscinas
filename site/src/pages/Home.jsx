import HeroSection        from '../sections/HeroSection'
import StatsSection       from '../sections/StatsSection'
import SobreNosSection    from '../sections/SobreNosSection'
import BeforeAfterSection from '../sections/BeforeAfterSection'
import ServicesSection    from '../sections/ServicesSection'
import WhyUsSection       from '../sections/WhyUsSection'
import ProjectsSection    from '../sections/ProjectsSection'
import CtaBannerSection   from '../sections/CtaBannerSection'
import ProcessSection     from '../sections/ProcessSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import FaqSection         from '../sections/FaqSection'
import BrandsSection      from '../sections/BrandsSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SobreNosSection />
      <BeforeAfterSection />
      <ServicesSection />
      <WhyUsSection />
      <ProjectsSection />
      <CtaBannerSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <BrandsSection />
    </>
  )
}
