'use client'

import { useState } from 'react'
import {
    CreditCard,
    TrendingUp,
    Search,
    Calendar,
    Download,
} from 'lucide-react'

// Mock data
const paymentsData = [
    { id: '1', student: 'Ibrahim Moussa', class: '6ème A', fee: 'Scolarité 1er trimestre', amount: 25000, date: '2024-01-15', method: 'mynita' },
    { id: '2', student: 'Fatima Diallo', class: '6ème A', fee: 'Inscription', amount: 15000, date: '2024-01-14', method: 'cash' },
    { id: '3', student: 'Ali Mahamane', class: '5ème B', fee: 'Scolarité 1er trimestre', amount: 25000, date: '2024-01-14', method: 'mynita' },
    { id: '4', student: 'Aissatou Barry', class: '5ème A', fee: 'Fournitures', amount: 10000, date: '2024-01-13', method: 'cash' },
    { id: '5', student: 'Mamadou Keita', class: '4ème A', fee: 'Inscription', amount: 15000, date: '2024-01-12', method: 'bank_transfer' },
]

const monthlyData = [
    { month: 'Sep', amount: 2800000 },
    { month: 'Oct', amount: 4200000 },
    { month: 'Nov', amount: 1500000 },
    { month: 'Dec', amount: 800000 },
    { month: 'Jan', amount: 3200000 },
]

const methodLabels = {
    cash: 'Espèces',
    mynita: 'MyNita',
    bank_transfer: 'Virement',
}

export default function DirectorPaymentsPage() {
    const [search, setSearch] = useState('')
    const [period, setPeriod] = useState('month')

    const totalCollected = monthlyData.reduce((sum, m) => sum + m.amount, 0)
    const maxAmount = Math.max(...monthlyData.map(m => m.amount))

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Vue Financière</h1>
                    <p className="text-gray-600">Aperçu des paiements de l'établissement</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <Download className="h-5 w-5" />
                    Exporter
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                    <TrendingUp className="h-8 w-8 mb-3 opacity-80" />
                    <div className="text-3xl font-bold">{(totalCollected / 1000000).toFixed(1)}M</div>
                    <div className="text-green-100">FCFA collectés (année)</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">3.2M</div>
                    <div className="text-sm text-gray-500">Ce mois</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <div className="text-sm text-gray-500">Taux de recouvrement</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="text-2xl font-bold text-red-600">156</div>
                    <div className="text-sm text-gray-500">Élèves impayés</div>
                </div>
            </div>

            {/* Monthly Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Évolution mensuelle</h2>
                <div className="space-y-3">
                    {monthlyData.map((data, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <span className="w-10 text-sm text-gray-500">{data.month}</span>
                            <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-end pr-2"
                                    style={{ width: `${(data.amount / maxAmount) * 100}%` }}
                                >
                                    <span className="text-xs text-white font-medium">
                                        {(data.amount / 1000000).toFixed(1)}M
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Paiements récents</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                            <th className="px-6 py-3 font-medium">Élève</th>
                            <th className="px-6 py-3 font-medium">Type</th>
                            <th className="px-6 py-3 font-medium">Montant</th>
                            <th className="px-6 py-3 font-medium">Mode</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentsData.map((payment) => (
                            <tr key={payment.id} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-6 py-3">
                                    <div className="font-medium text-gray-900">{payment.student}</div>
                                    <div className="text-sm text-gray-500">{payment.class}</div>
                                </td>
                                <td className="px-6 py-3 text-gray-600">{payment.fee}</td>
                                <td className="px-6 py-3 font-semibold text-gray-900">
                                    {payment.amount.toLocaleString()} FCFA
                                </td>
                                <td className="px-6 py-3">
                                    <span className={`px-2 py-1 rounded-lg text-xs ${payment.method === 'mynita' ? 'bg-purple-100 text-purple-700' :
                                            payment.method === 'cash' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {methodLabels[payment.method as keyof typeof methodLabels]}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-gray-500">{payment.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
