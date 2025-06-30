import Description from './components/Description'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Prodocuts from './components/Prodocuts'
import SmoothScroll from './SmoothScroll'

function App() {

  return (
    <>
      <div>
        <SmoothScroll />
        <Navbar />
        <Hero />
        <Description />
        <Prodocuts />
      </div>
    </>
  )
}

export default App
