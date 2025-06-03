import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    //{ path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('.nav-container')
      if (nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          <div style={{
            fontSize: '24px',
            color: 'initial',
            background: 'none',
            filter: 'none',
            WebkitTextFillColor: 'initial'
          }}>
            👨‍💻
          </div>
        </Link>

        <div className="nav-right">
          <ul className={`nav-links ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="nav-actions">
            <ThemeToggle />
            <button
              className="mobile-menu-btn md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar