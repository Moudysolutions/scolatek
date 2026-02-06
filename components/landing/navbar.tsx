'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GraduationCap, Menu, X } from 'lucide-react'

const navLinks = [
    { label: 'Fonctionnalités', href: '#fonctionnalites' },
    { label: 'Tarifs', href: '#tarifs' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'Contact', href: '/contact' },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className={`flex items-center gap-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                        <div className={`p-2 rounded-xl ${isScrolled ? 'bg-blue-100' : 'bg-white/10'}`}>
                            <GraduationCap className={`h-6 w-6 ${isScrolled ? 'text-blue-600' : 'text-white'}`} />
                        </div>
                        <span className="text-xl font-bold">ScolaTek</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${isScrolled
                                        ? 'text-gray-600 hover:text-gray-900'
                                        : 'text-blue-100 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            href="/login"
                            className={`text-sm font-medium transition-colors ${isScrolled
                                    ? 'text-gray-600 hover:text-gray-900'
                                    : 'text-blue-100 hover:text-white'
                                }`}
                        >
                            Se connecter
                        </Link>
                        <Link
                            href="/register"
                            className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors ${isScrolled
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-white text-blue-900 hover:bg-blue-50'
                                }`}
                        >
                            Commencer gratuitement
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-900' : 'text-white'
                            }`}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t">
                    <div className="px-4 py-4 space-y-4">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="block text-gray-600 hover:text-gray-900 font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <hr />
                        <Link
                            href="/login"
                            className="block text-gray-600 hover:text-gray-900 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Se connecter
                        </Link>
                        <Link
                            href="/register"
                            className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Commencer gratuitement
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
