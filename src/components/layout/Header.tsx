import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import Logo from './Logo'
import { useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">

          <button onClick={() => navigate('/')}>
            <Logo />
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#how-it-works" className="text-gray-300 hover:text-neon-green transition-colors">Comment ça marche</a>
            <a href="/#pricing" className="text-gray-300 hover:text-neon-green transition-colors">Tarifs</a>
            <a href="/#testimonials" className="text-gray-300 hover:text-neon-green transition-colors">Témoignages</a>
            <a href="/#faq" className="text-gray-300 hover:text-neon-green transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton>
                <Button>Se connecter</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button>Démarrer maintenant</Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-lighter text-white p-4 container-padding">
          <nav className="flex flex-col space-y-4">
            <a
              href="#how-it-works"
              className="py-2 hover:text-neon-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Comment ça marche
            </a>
            <a
              href="#pricing"
              className="py-2 hover:text-neon-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tarifs
            </a>
            <a
              href="#testimonials"
              className="py-2 hover:text-neon-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Témoignages
            </a>
            <a
              href="#faq"
              className="py-2 hover:text-neon-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <SignedOut>
              <SignInButton>
                <Button fullWidth onClick={() => setIsMenuOpen(false)}>Se connecter</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button fullWidth onClick={() => setIsMenuOpen(false)}>Démarrer maintenant</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
