import React from 'react'
import Hero from '../components/executive/Home/Hero'
import Companies from '../components/executive/Home/Companies'
import Courses from '../components/executive/Home/Courses'
import Mentor from '../components/executive/Home/Mentor'
import Testimonial from '../components/executive/Home/Testimonials'
import Newsletter from '../components/executive/Home/Newsletter'
import { ExecutiveCards } from '../components/executive/Home/executive'

export default function Home() {
  return (
    <main>
      <Hero />
      <Companies />
      <Courses />
      <ExecutiveCards />
      <Mentor />
      <Testimonial />
      <Newsletter />
    </main>
  )
}
