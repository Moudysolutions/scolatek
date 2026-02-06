'use client'

import { useState } from 'react'
import {
    UserX,
    Search,
    AlertTriangle,
    Phone,
    Mail,
} from 'lucide-react'

// Classes avec élèves à risque
const classesAbsences = [
    { class: '6ème A', students: 45, absences: 12, atRisk: 2 },
    { class: '6ème B', students: 48, absences: 8, atRisk: 1 },
    { class: '5ème A', students: 42, absences: 15, atRisk: 3 },
    { class: '5ème B', students: 40, absences: 6, atRisk: 0 },
    { class: '4ème A', students: 38, absences: 10, atRisk: 2 },
    { class: '3ème A', students: 35, absences: 5, atRisk: 0 },
]

// Élèves à risque (beaucoup d'absences)
const atRiskStudents = [
    { id: '1', name: 'Ousmane Diop', class: '5ème A', absences: 8, unjustified: 5, parentPhone: '+227 90 11 22 33' },
    { id: '2', name: 'Boubacar Sow', class: '4ème A', absences: 6, unjustified: 4, parentPhone: '+227 90 22 33 44' },
    { id: '3', name: 'Ali Mahamane', class: '6ème A', absences: 5, unjustified: 3, parentPhone: '+227 90 33 44 55' },
    { id: '4', name: 'Fatoumata Diallo', class: '5ème A', absences: 5, unjustified: 3, parentPhone: '+227 90 44 55 66' },
]

export default function DirectorAbsencesPage() {
    const [search, setSearch] = useState('')

    const totalAbsences = classesAbsences.reduce((sum, c) => sum + c.absences, 0)
    const totalAtRisk = classesAbsences.reduce((sum, c) => sum + c.atRisk, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Suivi des Absences</h1>
                <p className="text-gray-600">Vue d'ensemble de l'assiduité dans l'établissement</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="text-3xl font-bold text-gray-900">{totalAbsences}</div>
                    <div className="text-sm text-gray-500">Absences ce mois</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="text-3xl font-bold text-green-600">94%</div>
                    <div className="text-sm text-green-700">Taux présence global</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="text-3xl font-bold text-red-600">{totalAtRisk}</div>
                    <div className="text-sm text-red-700">Élèves à risque</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <div className="text-3xl font-bold text-yellow-600">35%</div>
                    <div className="text-sm text-yellow-700">Non justifiées</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Par classe */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Par classe</h2>
                    <div className="space-y-3">
                        {classesAbsences.map((cls, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                    <div className="font-medium text-gray-900">{cls.class}</div>
                                    <div className="text-sm text-gray-500">{cls.students} élèves</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-gray-900">{cls.absences}</div>
                                        <div className="text-xs text-gray-500">absences</div>
                                    </div>
                                    {cls.atRisk > 0 && (
                                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-sm">
                                            {cls.atRisk} à risque
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Élèves à risque */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <h2 className="text-lg font-semibold text-gray-900">Élèves à risque</h2>
                    </div>
                    <div className="space-y-3">
                        {atRiskStudents.map((student) => (
                            <div key={student.id} className="p-4 bg-red-50 border border-red-100 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <div className="font-medium text-gray-900">{student.name}</div>
                                        <div className="text-sm text-gray-500">{student.class}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-red-600">{student.absences}</div>
                                        <div className="text-xs text-red-500">{student.unjustified} non justifiées</div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-100">
                                        <Phone className="h-4 w-4" />
                                        Appeler parent
                                    </button>
                                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-100">
                                        <Mail className="h-4 w-4" />
                                        Envoyer message
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
