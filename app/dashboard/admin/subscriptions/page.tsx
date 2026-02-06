'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    CreditCard,
    Search,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    FileText,
    Download,
} from 'lucide-react'

// Mock data
const subscriptionsData = [
    {
        id: '1',
        school: 'Groupe Scolaire Excellence',
        plan: 'Professional',
        amount: 50000,
        status: 'pending',
        receipt_url: '/receipts/1.jpg',
        start_date: '2024-02-01',
        end_date: '2024-03-01',
        created_at: '2024-01-15',
    },
    {
        id: '2',
        school: 'Collège Al-Falah',
        plan: 'Starter',
        amount: 25000,
        status: 'active',
        receipt_url: '/receipts/2.jpg',
        start_date: '2024-01-01',
        end_date: '2024-02-01',
        created_at: '2024-01-08',
    },
    {
        id: '3',
        school: 'Lycée Moderne',
        plan: 'Enterprise',
        amount: 100000,
        status: 'pending',
        receipt_url: '/receipts/3.jpg',
        start_date: '2024-02-01',
        end_date: '2024-03-01',
        created_at: '2024-01-14',
    },
    {
        id: '4',
        school: 'École Primaire Soleil',
        plan: 'Starter',
        amount: 25000,
        status: 'expired',
        receipt_url: null,
        start_date: '2023-12-01',
        end_date: '2024-01-01',
        created_at: '2023-12-01',
    },
]

const statusConfig = {
    active: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Actif' },
    pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock, label: 'En attente' },
    expired: { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, label: 'Expiré' },
    cancelled: { bg: 'bg-gray-50', text: 'text-gray-700', icon: XCircle, label: 'Annulé' },
}

const planColors = {
    Starter: 'bg-blue-100 text-blue-700',
    Professional: 'bg-purple-100 text-purple-700',
    Enterprise: 'bg-orange-100 text-orange-700',
}

export default function AdminSubscriptionsPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null)

    const filteredSubscriptions = subscriptionsData.filter(sub => {
        const matchesSearch = sub.school.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = !statusFilter || sub.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleValidate = (id: string) => {
        // Will call server action
        console.log('Validate subscription:', id)
    }

    const handleReject = (id: string) => {
        // Will call server action
        console.log('Reject subscription:', id)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Abonnements</h1>
                <p className="text-gray-600">Validez les paiements et gérez les abonnements</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">15</div>
                    <div className="text-sm text-yellow-600 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        En attente de validation
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">98</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Abonnements actifs
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="h-4 w-4" />
                        Expirés ce mois
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">4.2M</div>
                    <div className="text-sm text-blue-600">FCFA ce mois</div>
                </div>
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
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="active">Actif</option>
                    <option value="expired">Expiré</option>
                </select>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-4 font-medium">École</th>
                                <th className="px-6 py-4 font-medium">Plan</th>
                                <th className="px-6 py-4 font-medium">Montant</th>
                                <th className="px-6 py-4 font-medium">Période</th>
                                <th className="px-6 py-4 font-medium">Statut</th>
                                <th className="px-6 py-4 font-medium">Reçu</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubscriptions.map((sub) => {
                                const status = statusConfig[sub.status as keyof typeof statusConfig]
                                const StatusIcon = status.icon
                                return (
                                    <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900">{sub.school}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-sm ${planColors[sub.plan as keyof typeof planColors]}`}>
                                                {sub.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">
                                            {sub.amount.toLocaleString()} FCFA
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {sub.start_date} → {sub.end_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm ${status.bg} ${status.text}`}>
                                                <StatusIcon className="h-4 w-4" />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {sub.receipt_url ? (
                                                <button
                                                    onClick={() => setSelectedReceipt(sub.receipt_url)}
                                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                                                >
                                                    <FileText className="h-4 w-4" />
                                                    Voir
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {sub.status === 'pending' ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleValidate(sub.id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                        Valider
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(sub.id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                        Rejeter
                                                    </button>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={`/dashboard/admin/subscriptions/${sub.id}`}
                                                    className="text-blue-600 hover:text-blue-700 text-sm"
                                                >
                                                    Détails
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Receipt Modal */}
            {selectedReceipt && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Reçu de paiement</h3>
                            <button
                                onClick={() => setSelectedReceipt(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="bg-gray-100 rounded-xl aspect-[3/4] flex items-center justify-center">
                            <span className="text-gray-500">Image du reçu</span>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                                <Download className="h-4 w-4" />
                                Télécharger
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
