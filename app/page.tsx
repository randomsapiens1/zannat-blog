"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Menu, X, ChevronRight, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

// Cursor trail component
const CursorTrail = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener("mousemove", moveCursor)
    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-black bg-opacity-20 pointer-events-none z-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  )
}

// Navigation component
const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const navItems = ["Home", "Articles", "Categories", "About", "Contact"]

  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          {navItems.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`#${item.toLowerCase()}`} className="hover:underline">
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X /> : <Menu />}
      </button>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-20"
        >
          <div className="p-4">
            <button className="mb-4" onClick={() => setIsMenuOpen(false)}>
              <X />
            </button>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </>
  )
}

// Header component
const Header = ({ scrollY, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header
      className="fixed w-full z-10 transition-all duration-300"
      style={{ backgroundColor: `rgba(255, 255, 255, ${scrollY > 50 ? 0.9 : 0})` }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          Zannat
        </motion.h1>
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </header>
  )
}

// Hero section component
const HeroSection = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        Political Insights
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xl md:text-2xl mb-8 max-w-2xl"
      >
        Exploring the complexities of modern politics through thoughtful analysis and commentary.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link
          href="#articles"
          className="inline-flex items-center px-6 py-3 border-2 border-black text-lg font-semibold hover:bg-black hover:text-white transition-colors duration-300"
        >
          Read Latest Post
          <ChevronRight className="ml-2" />
        </Link>
      </motion.div>
    </div>
  )
}

// Categories section component
const CategoriesSection = () => {
  const categories = [
    { name: "Global Politics", description: "International relations and global issues" },
    { name: "Domestic Policy", description: "National legislation and governance" },
    { name: "Economic Analysis", description: "Financial policies and economic trends" },
    { name: "Social Issues", description: "Cultural and societal discussions" },
    { name: "Environmental Politics", description: "Climate change and environmental policies" },
  ]

  return (
    <section id="categories" className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-100 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p>{category.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Articles section component
const ArticlesSection = () => {
  const articles = [
    { title: "The Impact of Global Trade Policies", excerpt: "Analyzing recent changes in international trade agreements..." },
    { title: "Climate Change: A Political Perspective", excerpt: "Examining the political landscape surrounding environmental policies..." },
    { title: "The Future of Healthcare Reform", excerpt: "Discussing potential changes to national healthcare systems..." },
    { title: "Technology's Role in Modern Governance", excerpt: "Exploring how technology is shaping political processes..." },
    { title: "Economic Inequality: A Global Challenge", excerpt: "Investigating the growing wealth gap and its political implications..." },
  ]

  return (
    <section id="articles" className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.article
            key={article.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <Link
              href="#"
              className="text-black font-semibold hover:underline"
            >
              Read More
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// Contact section component
const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="flex items-center">
              <Mail className="mr-2" /> zannat@example.com
            </p>
            <p className="flex items-center">
              <Phone className="mr-2" /> +1 (555) 123-4567
            </p>
            <p className="flex items-center">
              <MapPin className="mr-2" /> New York, NY
            </p>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-300"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

// Main component
export default function BlogHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <CursorTrail />
      <Header scrollY={scrollY} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="container mx-auto px-4 pt-24 md:pt-32">
        <HeroSection />
        <CategoriesSection />
        <ArticlesSection />
        <ContactSection />
      </main>

      <footer className="container mx-auto px-4 py-8 text-center">
        <p>&copy; 2023 Zannat&apos;s Political Blog. All rights reserved.</p>
      </footer>
    </div>
  )
}