import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import AIFeatures from '../components/landing/AIFeatures'
import HumanInTheLoop from '../components/landing/HumanInTheLoop'
import CTA from '../components/landing/CTA'
import Footer from '../components/landing/Footer'

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AIFeatures />
        <HumanInTheLoop />
        <CTA />
      </main>

      <Footer />

    </div>
  )
}

export default Home