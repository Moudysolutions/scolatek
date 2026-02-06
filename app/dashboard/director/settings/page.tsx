'use client'

import { useState } from 'react'
import {
    Settings,
    School,
    Save,
    Upload,
    Calendar,
    CreditCard,
} from 'lucide-react'

export default function DirectorSettingsPage() {
    const [saved, setSaved] = useState(false)
    const [schoolInfo, setSchoolInfo] = useState({
        name: 'Collège Excellence',
        address: 'Quartier Plateau, Niamey, Niger',
        phone: '+227 20 73 00 00',
        email: 'contact@excellence.edu.ne',
        director: 'M. Abdoulaye Moussa',
        academicYear: '2024-2025',
        logo: null as string | null,
    })

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Paramètres de l'École</h1>
                    <p className="text-gray-600">Configurez les informations de votre établissement</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <Save className="h-5 w-5" />
                    {saved ? 'Enregistré!' : 'Enregistrer'}
                </button>
            </div>

            {/* School Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-xl">
                        <School className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Informations générales</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Logo de l'école</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Cliquez pour télécharger</p>
                            <p className="text-xs text-gray-400">PNG, JPG (max 2MB)</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'établissement</label>
                        <input
                            type="text"
                            value={schoolInfo.name}
                            onChange={(e) => setSchoolInfo({ ...schoolInfo, name: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Directeur</label>
                        <input
                            type="text"
                            value={schoolInfo.director}
                            onChange={(e) => setSchoolInfo({ ...schoolInfo, director: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input
                            type="tel"
                            value={schoolInfo.phone}
                            onChange={(e) => setSchoolInfo({ ...schoolInfo, phone: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={schoolInfo.email}
                            onChange={(e) => setSchoolInfo({ ...schoolInfo, email: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                        <input
                            type="text"
                            value={schoolInfo.address}
                            onChange={(e) => setSchoolInfo({ ...schoolInfo, address: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Academic Year */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-xl">
                        <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Année scolaire</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Année active</label>
                        <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                            <option>2024-2025</option>
                            <option>2023-2024</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                        <input
                            type="date"
                            defaultValue="2024-10-01"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                        <input
                            type="date"
                            defaultValue="2025-07-15"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-xl">
                        <CreditCard className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Configuration des paiements</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Numéro MyNita</label>
                        <input
                            type="tel"
                            defaultValue="+227 90 00 00 00"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom du bénéficiaire</label>
                        <input
                            type="text"
                            defaultValue="Collège Excellence"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
                            <span className="text-sm text-gray-700">Accepter les paiements en espèces</span>
                        </label>
                    </div>
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
                            <span className="text-sm text-gray-700">Accepter les paiements via MyNita</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
