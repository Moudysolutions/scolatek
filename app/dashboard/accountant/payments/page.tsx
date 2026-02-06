'use client'

import { useState } from 'react'
import {
    CreditCard,
    Plus,
    Search,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    FileText,
    Filter,
} from 'lucide-react'

// Mock data
const paymentsData = [
    { id: '1', receipt: 'REC240101', student: 'Ibrahim Moussa', class: '6ème A', fee: 'Scolarité 1er trimestre', amount: 25000, method: 'mynita', status: 'pending', date: '2024-01-15' },
    { id: '2', receipt: 'REC240102', student: 'Fatima Diallo', class: '6ème A', fee: 'Inscription', amount: 15000, method: 'cash', status: 'validated', date: '2024-01-14' },
    { id: '3', receipt: 'REC240103', student: 'Ali Mahamane', class: '5ème B', fee: 'Scolarité 1er trimestre', amount: 25000, method: 'mynita', status: 'pending', date: '2024-01-14' },
    { id: '4', receipt: 'REC240104', student: 'Aissatou Barry', class: '5ème A', fee: 'Scolarité 1er trimestre', amount: 25000, method: 'cash', status: 'validated', date: '2024-01-13' },
    { id: '5', receipt: 'REC240105', student: 'Mamadou Keita', class: '4ème A', fee: 'Inscription', amount: 15000, method: 'bank_transfer', status: 'rejected', date: '2024-01-12' },
]

const statusConfig = {
    validated: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Validé' },
    pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock, label: 'En attente' },
    rejected: { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, label: 'Rejeté' },
}

const methodLabels = {
    cash: 'Espèces',
    mynita: 'MyNita',
    bank_transfer: 'Virement',
}

const methodColors = {
    cash: 'bg-gray-100 text-gray-700',
    mynita: 'bg-purple-100 text-purple-700',
    bank_transfer: 'bg-blue-100 text-blue-700',
}

export default function AccountantPaymentsPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showNewPayment, setShowNewPayment] = useState(false)

    const filteredPayments = paymentsData.filter(payment => {
        const matchesSearch =
            payment.student.toLowerCase().includes(search.toLowerCase()) ||
            payment.receipt.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = !statusFilter || payment.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleValidate = (id: string) => {
        console.log('Validate payment:', id)
    }

    const handleReject = (id: string) => {
        console.log('Reject payment:', id)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Paiements</h1>
                    <p className="text-gray-600">Enregistrez et validez les paiements des élèves</p>
                </div>
                <button
                    onClick={() => setShowNewPayment(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Nouveau paiement
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                    <div className="text-2xl font-bold">2.4M FCFA</div>
                    <div className="text-green-100">Total ce mois</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-green-600">
                        {paymentsData.filter(p => p.status === 'validated').length}
                    </div>
                    <div className="text-sm text-gray-500">Validés</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-yellow-600">
                        {paymentsData.filter(p => p.status === 'pending').length}
                    </div>
                    <div className="text-sm text-gray-500">En attente</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-600">
                        {paymentsData.length}
                    </div>
                    <div className="text-sm text-gray-500">Total transactions</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par élève ou numéro de reçu..."
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
                    <option value="validated">Validé</option>
                    <option value="rejected">Rejeté</option>
                </select>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-4 font-medium">N° Reçu</th>
                                <th className="px-6 py-4 font-medium">Élève</th>
                                <th className="px-6 py-4 font-medium">Type de frais</th>
                                <th className="px-6 py-4 font-medium">Montant</th>
                                <th className="px-6 py-4 font-medium">Mode</th>
                                <th className="px-6 py-4 font-medium">Statut</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((payment) => {
                                const status = statusConfig[payment.status as keyof typeof statusConfig]
                                const StatusIcon = status.icon
                                return (
                                    <tr key={payment.id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                {payment.receipt}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{payment.student}</div>
                                            <div className="text-sm text-gray-500">{payment.class}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{payment.fee}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {payment.amount.toLocaleString()} FCFA
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-lg text-sm ${methodColors[payment.method as keyof typeof methodColors]}`}>
                                                {methodLabels[payment.method as keyof typeof methodLabels]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm ${status.bg} ${status.text}`}>
                                                <StatusIcon className="h-4 w-4" />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{payment.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            {payment.status === 'pending' ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleValidate(payment.id)}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                        title="Valider"
                                                    >
                                                        <CheckCircle className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(payment.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                        title="Rejeter"
                                                    >
                                                        <XCircle className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Voir détails">
                                                    <Eye className="h-5 w-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Payment Modal */}
            {showNewPayment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Nouveau paiement</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Élève</label>
                                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Sélectionner un élève</option>
                                    <option>Ibrahim Moussa - 6ème A</option>
                                    <option>Fatima Diallo - 6ème A</option>
                                    <option>Ali Mahamane - 5ème B</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type de frais</label>
                                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Sélectionner le type de frais</option>
                                    <option>Inscription - 15,000 FCFA</option>
                                    <option>Scolarité 1er trimestre - 25,000 FCFA</option>
                                    <option>Scolarité 2ème trimestre - 25,000 FCFA</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Montant (FCFA)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="25000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mode de paiement</label>
                                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="cash">Espèces</option>
                                    <option value="mynita">MyNita</option>
                                    <option value="bank_transfer">Virement bancaire</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Référence (optionnel)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Numéro de transaction MyNita..."
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowNewPayment(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
