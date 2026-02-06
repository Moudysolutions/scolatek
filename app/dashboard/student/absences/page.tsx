'use client'

import { useState } from 'react'
import {
    UserX,
    Clock,
    Calendar,
    TrendingDown,
    TrendingUp,
    Search,
} from 'lucide-react'

// Mock data - Student Absences Overview
const absencesData = [
    { id: '1', student: 'Ali Mahamane', class: '6ème A', total: 5, justified: 3, unjustified: 2, trend: 'up' },
    { id: '2', student: 'Mariama Sow', class: '6ème A', total: 3, justified: 2, unjustified: 1, trend: 'down' },
    { id: '3', student: 'Ousmane Diop', class: '5ème B', total: 8, justified: 4, unjustified: 4, trend: 'up' },
    { id: '4', student: 'Aminata Traore', class: '5ème A', total: 2, justified: 2, unjustified: 0, trend: 'stable' },
    { id: '5', student: 'Boubacar Sow', class: '4ème A', total: 6, justified: 3, unjustified: 3, trend: 'up' },
]

const recentAbsences = [
    { date: '2024-01-15', student: 'Ali Mahamane', class: '6ème A', justified: false },
    { date: '2024-01-15', student: 'Mariama Sow', class: '6ème A', justified: true },
    { date: '2024-01-14', student: 'Ousmane Diop', class: '5ème B', justified: false },
    { date: '2024-01-13', student: 'Aminata Traore', class: '5ème A', justified: true },
]

export default function StudentAbsencesPage() {
    const [search, setSearch] = useState('')

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Mes Absences</h1>
                <p className="text-gray-600">Consultez votre historique de présence</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="text-3xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-500">Total absences</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="text-3xl font-bold text-green-600">2</div>
                    <div className="text-sm text-green-700">Justifiées</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="text-3xl font-bold text-red-600">1</div>
                    <div className="text-sm text-red-700">Non justifiées</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="text-3xl font-bold text-blue-600">97%</div>
                    <div className="text-sm text-blue-700">Taux de présence</div>
                </div>
            </div>

            {/* Absences List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Historique des absences</h2>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium">Cours manqués</th>
                            <th className="px-6 py-3 font-medium">Statut</th>
                            <th className="px-6 py-3 font-medium">Motif</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentAbsences.map((absence, index) => (
                            <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        {absence.date}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    4 heures
                                </td>
                                <td className="px-6 py-4">
                                    {absence.justified ? (
                                        <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-sm">
                                            Justifiée
                                        </span>
                                    ) : (
                                        <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                                            Non justifiée
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {absence.justified ? 'Maladie' : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Les absences non justifiées peuvent affecter votre dossier scolaire.
                    En cas d'absence, veuillez fournir un justificatif au service de surveillance.
                </p>
            </div>
        </div>
    )
}
