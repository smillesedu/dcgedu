import React from 'react'
import Header from '../components/executive/Layout/Header'
import Footer from '../components/executive/Layout/Footer'
import ScrollToTop from '../components/executive/ScrollToTop'
import { ThemeProvider } from 'next-themes' // ainda funciona em React puro
import Home from '../app/page'

const RootLayout = ({ children }) => {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
      <div className="font-poppins">
        <Header />
        <Home />
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}

export default RootLayout
