'use client'

import { useState } from 'react'
import { Settings, CreditCard, Globe, Save, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false)
    const [settings, setSettings] = useState({
        platform_name: 'ScolaTek',
        mynita_number: '',
        support_email: 'support@scolatek.com',
        support_phone: '+227 90 00 00 00',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        toast.success('Paramètres enregistrés avec succès')
        setLoading(false)
    }

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Paramètres de la Plateforme</h1>
                <p className="text-gray-600">Configurez les paramètres globaux de ScolaTek</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 rounded-xl">
                            <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Paramètres généraux</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nom de la plateforme
                            </label>
                            <input
                                type="text"
                                value={settings.platform_name}
                                onChange={(e) => setSettings({ ...settings, platform_name: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email de support
                            </label>
                            <input
                                type="email"
                                value={settings.support_email}
                                onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Téléphone de support
                            </label>
                            <input
                                type="tel"
                                value={settings.support_phone}
                                onChange={(e) => setSettings({ ...settings, support_phone: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-100 rounded-xl">
                            <CreditCard className="h-5 w-5 text-green-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Configuration MyNita</h2>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                        <p className="text-sm text-yellow-800">
                            <strong>Important:</strong> Ce numéro sera utilisé par les écoles pour effectuer les paiements d'abonnement via MyNita.
                            Assurez-vous qu'il est correct.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Numéro MyNita de la plateforme
                        </label>
                        <input
                            type="text"
                            value={settings.mynita_number}
                            onChange={(e) => setSettings({ ...settings, mynita_number: e.target.value })}
                            placeholder="Ex: +227 90 XX XX XX"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Les écoles effectueront un dépôt ou transfert à ce numéro et joindront le reçu pour confirmation
                        </p>
                    </div>
                </div>

                {/* Subscription Plans */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-100 rounded-xl">
                            <Settings className="h-5 w-5 text-purple-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Plans d'abonnement</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: 'Starter', price: 25000, students: 200 },
                            { name: 'Professional', price: 50000, students: 500 },
                            { name: 'Enterprise', price: 100000, students: 'Illimité' },
                        ].map((plan, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <div className="font-medium text-gray-900">{plan.name}</div>
                                    <div className="text-sm text-gray-500">Jusqu'à {plan.students} élèves</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-900">{plan.price.toLocaleString()} FCFA</div>
                                    <div className="text-sm text-gray-500">/mois</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        Pour modifier les plans, contactez l'équipe technique.
                    </p>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Enregistrement...
                            </>
                        ) : (
                            <>
                                <Save className="h-5 w-5" />
                                Enregistrer les modifications
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
