import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ProductCard from './ProductCard'
import { productItems } from '../constants'

gsap.registerPlugin(ScrollTrigger)

const heading = 'Discover our range of products'

const Prodocuts = () => {
    const sectionRef = useRef(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            // Top divider draws outward
            gsap.fromTo('.products-divider',
                { scaleX: 0 },
                {
                    scaleX: 1, duration: 1.2, ease: 'power3.inOut',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
                }
            )

            // Heading: masked word-by-word rise
            gsap.fromTo('.products-word',
                { yPercent: 110, rotate: 4 },
                {
                    yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: 0.06,
                    scrollTrigger: { trigger: '.products-heading', start: 'top 85%' },
                }
            )

            gsap.utils.toArray('.product-card').forEach((card, i) => {
                const img = card.querySelector('.product-card-img')
                const content = card.querySelector('.product-card-content')

                // Card reveal: clip-path wipe up + rise, staggered for side-by-side cards
                const tl = gsap.timeline({
                    delay: i * 0.12,
                    scrollTrigger: { trigger: card, start: 'top 88%' },
                })

                tl.fromTo(card,
                    { clipPath: 'inset(100% 0% 0% 0%)', y: 80 },
                    { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.3, ease: 'expo.out' }
                ).fromTo(content.children,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 },
                    0.35
                )

                // Image parallax while the card travels through the viewport
                gsap.fromTo(img,
                    { yPercent: -8 },
                    {
                        yPercent: 8, ease: 'none',
                        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
                    }
                )
            })
        })
    }, { scope: sectionRef })

    return (
        <div ref={sectionRef} className='relative py-10 lg:mb-16'>
            <div className='products-divider absolute top-0 inset-x-0 h-px bg-stone-300 origin-center' />
            <h1 className='products-heading flex flex-wrap justify-start px-5 lg:justify-center w-full text-center text-xl lg:text-5xl pt-5'>
                {heading.split(' ').map((word, i) => (
                    <span key={i} className='inline-block overflow-hidden pb-1 mr-[0.25em] last:mr-0'>
                        <span className='products-word inline-block will-change-transform'>{word}</span>
                    </span>
                ))}
            </h1>
            <div className='flex items-center justify-center flex-col lg:flex-row px-4 lg:px-10 gap-4 pt-5 lg:pt-20 max-w-7xl mx-auto'>

                {
                    productItems.map(({ name, desc, src, button1, button2 }) => (
                        <ProductCard
                            key={name}
                            name={name}
                            desc={desc}
                            src={src}
                            button1={button1}
                            button2={button2}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Prodocuts
