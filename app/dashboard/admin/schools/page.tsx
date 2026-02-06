'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Building2,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
} from 'lucide-react'

// Mock data - will be replaced with real data
const schoolsData = [
    { id: '1', name: 'Groupe Scolaire Excellence', email: 'contact@gs-excellence.ne', phone: '+227 90 12 34 56', status: 'active', students: 450, created_at: '2024-01-10' },
    { id: '2', name: 'Collège Al-Falah', email: 'info@alfalah.ne', phone: '+227 90 23 45 67', status: 'active', students: 320, created_at: '2024-01-08' },
    { id: '3', name: 'Lycée Moderne de Niamey', email: 'lycee.moderne@edu.ne', phone: '+227 90 34 56 78', status: 'pending', students: 0, created_at: '2024-01-15' },
    { id: '4', name: 'École Primaire Soleil', email: 'ecole.soleil@edu.ne', phone: '+227 90 45 67 89', status: 'expired', students: 180, created_at: '2023-12-01' },
]

const statusColors = {
    active: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle },
    pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock },
    expired: { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle },
    cancelled: { bg: 'bg-gray-50', text: 'text-gray-700', icon: XCircle },
}

const statusLabels = {
    active: 'Actif',
    pending: 'En attente',
    expired: 'Expiré',
    cancelled: 'Annulé',
}

export default function AdminSchoolsPage() {
    const [search, setSearch] = useState('')
    const [schools, setSchools] = useState(schoolsData)
    const [openMenu, setOpenMenu] = useState<string | null>(null)

    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Écoles</h1>
                    <p className="text-gray-600">Gérez les établissements inscrits sur ScolaTek</p>
                </div>
                <Link
                    href="/dashboard/admin/schools/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Nouvelle école
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher une école..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <select className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="pending">En attente</option>
                    <option value="expired">Expiré</option>
                </select>
            </div>

            {/* Schools Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-4 font-medium">École</th>
                                <th className="px-6 py-4 font-medium">Contact</th>
                                <th className="px-6 py-4 font-medium">Élèves</th>
                                <th className="px-6 py-4 font-medium">Statut</th>
                                <th className="px-6 py-4 font-medium">Date d'inscription</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSchools.map((school) => {
                                const status = statusColors[school.status as keyof typeof statusColors]
                                const StatusIcon = status.icon
                                return (
                                    <tr key={school.id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                                    <Building2 className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <span className="font-medium text-gray-900">{school.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <div className="text-gray-900">{school.email}</div>
                                                <div className="text-gray-500">{school.phone}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{school.students}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm ${status.bg} ${status.text}`}>
                                                <StatusIcon className="h-4 w-4" />
                                                {statusLabels[school.status as keyof typeof statusLabels]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{school.created_at}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenMenu(openMenu === school.id ? null : school.id)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                                >
                                                    <MoreVertical className="h-5 w-5 text-gray-400" />
                                                </button>
                                                {openMenu === school.id && (
                                                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                                                        <Link
                                                            href={`/dashboard/admin/schools/${school.id}`}
                                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            Voir détails
                                                        </Link>
                                                        <Link
                                                            href={`/dashboard/admin/schools/${school.id}/edit`}
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
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        Affichage de {filteredSchools.length} écoles
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
