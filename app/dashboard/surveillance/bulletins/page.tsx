'use client'

import { useState } from 'react'
import {
    FileText,
    Download,
    Search,
    Eye,
    Send,
    CheckCircle,
    Clock,
} from 'lucide-react'

// Mock data
const bulletinsData = [
    { id: '1', student: 'Ibrahim Moussa', class: '6ème A', average: 15.5, rank: 2, status: 'ready', printed: true },
    { id: '2', student: 'Fatima Diallo', class: '6ème A', average: 17.2, rank: 1, status: 'ready', printed: true },
    { id: '3', student: 'Ali Mahamane', class: '5ème B', average: 12.3, rank: 8, status: 'pending', printed: false },
    { id: '4', student: 'Aissatou Barry', class: '5ème A', average: 14.8, rank: 3, status: 'ready', printed: false },
    { id: '5', student: 'Mamadou Keita', class: '4ème A', average: 11.0, rank: 12, status: 'pending', printed: false },
    { id: '6', student: 'Mariama Sow', class: '3ème A', average: 16.5, rank: 1, status: 'ready', printed: true },
]

export default function SurveillanceBulletinsPage() {
    const [search, setSearch] = useState('')
    const [classFilter, setClassFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const classes = [...new Set(bulletinsData.map(b => b.class))]

    const filteredBulletins = bulletinsData.filter(bulletin => {
        const matchesSearch = bulletin.student.toLowerCase().includes(search.toLowerCase())
        const matchesClass = !classFilter || bulletin.class === classFilter
        const matchesStatus = !statusFilter || bulletin.status === statusFilter
        return matchesSearch && matchesClass && matchesStatus
    })

    const readyCount = bulletinsData.filter(b => b.status === 'ready').length
    const printedCount = bulletinsData.filter(b => b.printed).length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bulletins Scolaires</h1>
                    <p className="text-gray-600">Générez et gérez les bulletins des élèves</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                    <Download className="h-5 w-5" />
                    Exporter tout
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{bulletinsData.length}</div>
                    <div className="text-sm text-gray-500">Total bulletins</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">{readyCount}</div>
                    <div className="text-sm text-green-700">Prêts</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="text-2xl font-bold text-yellow-600">
                        {bulletinsData.length - readyCount}
                    </div>
                    <div className="text-sm text-yellow-700">En attente de notes</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">{printedCount}</div>
                    <div className="text-sm text-blue-700">Imprimés</div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 relative min-w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un élève..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Toutes les classes</option>
                    {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                    ))}
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Tous les statuts</option>
                    <option value="ready">Prêts</option>
                    <option value="pending">En attente</option>
                </select>
            </div>

            {/* Bulletins List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                            <th className="px-6 py-4 font-medium">Élève</th>
                            <th className="px-6 py-4 font-medium">Classe</th>
                            <th className="px-6 py-4 font-medium text-center">Moyenne</th>
                            <th className="px-6 py-4 font-medium text-center">Rang</th>
                            <th className="px-6 py-4 font-medium">Statut</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBulletins.map((bulletin) => (
                            <tr key={bulletin.id} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{bulletin.student}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                        {bulletin.class}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`font-bold ${bulletin.average >= 15 ? 'text-green-600' :
                                            bulletin.average >= 10 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {bulletin.average}/20
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${bulletin.rank <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {bulletin.rank}e
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {bulletin.status === 'ready' ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-sm">
                                            <CheckCircle className="h-4 w-4" />
                                            Prêt
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
                                            <Clock className="h-4 w-4" />
                                            En attente
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            disabled={bulletin.status !== 'ready'}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Voir"
                                        >
                                            <Eye className="h-5 w-5" />
                                        </button>
                                        <button
                                            disabled={bulletin.status !== 'ready'}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Télécharger"
                                        >
                                            <Download className="h-5 w-5" />
                                        </button>
                                        <button
                                            disabled={bulletin.status !== 'ready'}
                                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Envoyer aux parents"
                                        >
                                            <Send className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
