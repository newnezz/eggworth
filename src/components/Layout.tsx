'use client';

import { FiMenu, FiX } from 'react-icons/fi';

import Link from 'next/link';
import { useState } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-egg-shell px-4 py-4 shadow-sm relative z-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-egg-primary">
              🥚 EggWorth
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-egg-primary hover:text-egg-yolk">
              Home
            </Link>
            <Link href="/history" className="text-egg-primary hover:text-egg-yolk">
              Historical Data
            </Link>
            <Link href="/about" className="text-egg-primary hover:text-egg-yolk">
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-egg-primary focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-egg-shell shadow-md py-2 px-4 z-10">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-egg-primary hover:text-egg-yolk py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/history" 
                className="text-egg-primary hover:text-egg-yolk py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Historical Data
              </Link>
              <Link 
                href="/about" 
                className="text-egg-primary hover:text-egg-yolk py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-egg-primary text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">🥚 EggWorth</h3>
              <p className="text-gray-300 mt-2">Measuring wealth one egg at a time</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h4 className="font-semibold mb-2">Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/history" className="text-gray-300 hover:text-white">
                      Historical Data
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-300 hover:text-white">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <p className="text-gray-300">info@eggworth.com</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} EggWorth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 