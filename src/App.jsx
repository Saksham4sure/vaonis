import Description from './components/Description'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ParalaxScroll from './components/ParalaxScroll'
import Prodocuts from './components/Prodocuts'
import SmoothScroll from './SmoothScroll'

function App() {

  return (
    <>
      <div className="">
        <SmoothScroll />
        <Navbar />
        <Hero />
        <Description />
        <Prodocuts />
        <ParalaxScroll />
        <Footer />
      </div>
    </>
  )
}

export default App
