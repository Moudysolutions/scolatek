import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between">
                <div>
                    <Link href="/" className="flex items-center gap-3 text-white">
                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                            <GraduationCap className="h-8 w-8" />
                        </div>
                        <span className="text-2xl font-bold">ScolaTek</span>
                    </Link>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-white leading-tight">
                        La plateforme de gestion scolaire nouvelle génération
                    </h1>
                    <p className="text-xl text-blue-100">
                        Simplifiez la gestion de votre établissement avec ScolaTek.
                        Notes, bulletins, emplois du temps, paiements... tout en un seul endroit.
                    </p>
                    <div className="flex items-center gap-4 text-blue-100">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 border-2 border-blue-700"
                                />
                            ))}
                        </div>
                        <span>+500 établissements nous font confiance</span>
                    </div>
                </div>

                <div className="text-blue-200 text-sm">
                    © 2024 ScolaTek par{' '}
                    <a
                        href="https://moudy-solutions.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:underline"
                    >
                        Moudy Solutions
                    </a>
                </div>
            </div>

            {/* Right Panel - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2 text-blue-600">
                            <div className="p-2 bg-blue-100 rounded-xl">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold">ScolaTek</span>
                        </Link>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    )
}
