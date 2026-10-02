import { useState } from 'react'
import Description from './components/Description'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import ParalaxScroll from './components/ParalaxScroll'
import Prodocuts from './components/Prodocuts'
import SmoothScroll from './SmoothScroll'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function App() {
  const [startLanding, setStartLanding] = useState(false)
  const [loaderFinished, setLoaderFinished] = useState(false)

  const handleStartLanding = () => {
    setStartLanding(true)
  }

  const handleLoaderComplete = () => {
    setLoaderFinished(true)
    // Refresh ScrollTrigger to ensure all triggers calculate accurate offsets
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }

  return (
    <>
      <SmoothScroll />
      {!loaderFinished && (
        <Loader
          onStartLanding={handleStartLanding}
          onComplete={handleLoaderComplete}
        />
      )}
      <div className="relative w-full">
        <Navbar startAnimation={startLanding} />
        <Hero startAnimation={startLanding} />
        <Description />
        <Prodocuts />
        <ParalaxScroll />
        <Footer />
      </div>
    </>
  )
}

export default App

