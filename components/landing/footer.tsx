import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const footerLinks = {
    produit: [
        { label: 'Fonctionnalités', href: '#fonctionnalites' },
        { label: 'Tarifs', href: '#tarifs' },
        { label: 'Témoignages', href: '#temoignages' },
        { label: 'FAQ', href: '#faq' },
    ],
    entreprise: [
        { label: 'À propos', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Carrières', href: '/careers' },
        { label: 'Contact', href: '/contact' },
    ],
    legal: [
        { label: 'Conditions d\'utilisation', href: '/terms' },
        { label: 'Politique de confidentialité', href: '/privacy' },
        { label: 'Mentions légales', href: '/legal' },
    ],
}

const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/moudysolutions', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/moudysolutions', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/moudy-solutions', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/moudysolutions', label: 'Instagram' },
]

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 text-white mb-4">
                            <div className="p-2 bg-blue-600 rounded-xl">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold">ScolaTek</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-xs">
                            La plateforme de gestion scolaire nouvelle génération pour les établissements africains.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-500" />
                                <a href="mailto:contact@scolatek.com" className="hover:text-white transition-colors">
                                    contact@scolatek.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <a href="tel:+22790000000" className="hover:text-white transition-colors">
                                    +227 90 00 00 00
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                <span>Niamey, Niger</span>
                            </div>
                        </div>
                    </div>

                    {/* Produit */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Produit</h4>
                        <ul className="space-y-2">
                            {footerLinks.produit.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Entreprise */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Entreprise</h4>
                        <ul className="space-y-2">
                            {footerLinks.entreprise.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Légal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Légal</h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-400">
                        © {new Date().getFullYear()} ScolaTek. Développé par{' '}
                        <a
                            href="https://moudy-solutions.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-medium"
                        >
                            Moudy Solutions
                        </a>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </footer>
    )
}
