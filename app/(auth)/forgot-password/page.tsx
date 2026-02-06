'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { forgotPassword } from '@/lib/auth/actions'
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
        >
            {pending ? (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Envoi en cours...
                </>
            ) : (
                'Envoyer le lien de réinitialisation'
            )}
        </button>
    )
}

export default function ForgotPasswordPage() {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(formData: FormData) {
        setError(null)
        const result = await forgotPassword(formData)
        if (result.success) {
            setSuccess(true)
        } else if (result.error) {
            setError(result.error)
        }
    }

    if (success) {
        return (
            <div className="space-y-6 text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Email envoyé !</h2>
                    <p className="mt-2 text-gray-600">
                        Si un compte existe avec cette adresse email, vous recevrez un lien
                        pour réinitialiser votre mot de passe.
                    </p>
                </div>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Retour à la connexion
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Link
                href="/login"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
            >
                <ArrowLeft className="h-4 w-4" />
                Retour à la connexion
            </Link>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Mot de passe oublié ?</h2>
                <p className="mt-2 text-gray-600">
                    Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900 placeholder-gray-400"
                            placeholder="votre@email.com"
                        />
                    </div>
                </div>

                <SubmitButton />
            </form>
        </div>
    )
}
