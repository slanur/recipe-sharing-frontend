import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Categories } from '@/features/landing/Categories'
import { FinalCta } from '@/features/landing/FinalCta'
import { Hero } from '@/features/landing/Hero'
import { HowItWorks } from '@/features/landing/HowItWorks'
import { ProductTour } from '@/features/landing/ProductTour'

export function LandingPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView()
  }, [hash])

  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <ProductTour />
      <FinalCta />
    </>
  )
}
