'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    GraduationCap,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Download,
    Filter,
} from 'lucide-react'

// Mock data
const studentsData = [
    { id: '1', matricule: 'SCO24001', first_name: 'Ibrahim', last_name: 'Moussa', class: '6ème A', gender: 'M', parent_name: 'Moussa Ibrahim', parent_phone: '+227 90 11 22 33' },
    { id: '2', matricule: 'SCO24002', first_name: 'Fatima', last_name: 'Diallo', class: '6ème A', gender: 'F', parent_name: 'Amadou Diallo', parent_phone: '+227 90 22 33 44' },
    { id: '3', matricule: 'SCO24003', first_name: 'Ali', last_name: 'Mahamane', class: '5ème B', gender: 'M', parent_name: 'Mahamane Ali', parent_phone: '+227 90 33 44 55' },
    { id: '4', matricule: 'SCO24004', first_name: 'Aissatou', last_name: 'Barry', class: '5ème A', gender: 'F', parent_name: 'Ousmane Barry', parent_phone: '+227 90 44 55 66' },
    { id: '5', matricule: 'SCO24005', first_name: 'Mamadou', last_name: 'Keita', class: '4ème A', gender: 'M', parent_name: 'Keita Moussa', parent_phone: '+227 90 55 66 77' },
    { id: '6', matricule: 'SCO24006', first_name: 'Mariama', last_name: 'Sow', class: '3ème A', gender: 'F', parent_name: 'Sow Boubacar', parent_phone: '+227 90 66 77 88' },
]

export default function DirectorStudentsPage() {
    const [search, setSearch] = useState('')
    const [classFilter, setClassFilter] = useState('')
    const [openMenu, setOpenMenu] = useState<string | null>(null)

    const classes = [...new Set(studentsData.map(s => s.class))]

    const filteredStudents = studentsData.filter(student => {
        const matchesSearch =
            student.first_name.toLowerCase().includes(search.toLowerCase()) ||
            student.last_name.toLowerCase().includes(search.toLowerCase()) ||
            student.matricule.toLowerCase().includes(search.toLowerCase())
        const matchesClass = !classFilter || student.class === classFilter
        return matchesSearch && matchesClass
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Élèves</h1>
                    <p className="text-gray-600">Liste des élèves inscrits dans votre établissement</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Download className="h-5 w-5" />
                        Exporter
                    </button>
                    <Link
                        href="/dashboard/director/students/new"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Nouvel élève
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{studentsData.length}</div>
                    <div className="text-sm text-gray-500">Total élèves</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">
                        {studentsData.filter(s => s.gender === 'M').length}
                    </div>
                    <div className="text-sm text-gray-500">Garçons</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-pink-600">
                        {studentsData.filter(s => s.gender === 'F').length}
                    </div>
                    <div className="text-sm text-gray-500">Filles</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-green-600">{classes.length}</div>
                    <div className="text-sm text-gray-500">Classes</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou matricule..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Toutes les classes</option>
                    {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                    ))}
                </select>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-4 font-medium">Matricule</th>
                                <th className="px-6 py-4 font-medium">Élève</th>
                                <th className="px-6 py-4 font-medium">Classe</th>
                                <th className="px-6 py-4 font-medium">Genre</th>
                                <th className="px-6 py-4 font-medium">Parent / Tuteur</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-mono">
                                            {student.matricule}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${student.gender === 'M' ? 'bg-blue-500' : 'bg-pink-500'
                                                }`}>
                                                {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {student.first_name} {student.last_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                            {student.class}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-xs ${student.gender === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                                            }`}>
                                            {student.gender === 'M' ? 'Masculin' : 'Féminin'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <div className="text-gray-900">{student.parent_name}</div>
                                            <div className="text-gray-500">{student.parent_phone}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => setOpenMenu(openMenu === student.id ? null : student.id)}
                                                className="p-2 hover:bg-gray-100 rounded-lg"
                                            >
                                                <MoreVertical className="h-5 w-5 text-gray-400" />
                                            </button>
                                            {openMenu === student.id && (
                                                <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                                                    <Link
                                                        href={`/dashboard/director/students/${student.id}`}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Voir dossier
                                                    </Link>
                                                    <Link
                                                        href={`/dashboard/director/students/${student.id}/edit`}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        Modifier
                                                    </Link>
                                                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                        Supprimer
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        Affichage de {filteredStudents.length} élèves
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                            Précédent
                        </button>
                        <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            1
                        </button>
                        <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                            Suivant
                        </button>
                    </div>
                </div>
            </div>

            {/* Click outside to close menu */}
            {openMenu && (
                <div className="fixed inset-0 z-0" onClick={() => setOpenMenu(null)} />
            )}
        </div>
    )
}
