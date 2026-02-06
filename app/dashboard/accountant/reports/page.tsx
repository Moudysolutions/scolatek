'use client'

import { useState } from 'react'
import {
    BarChart3,
    Download,
    Calendar,
    TrendingUp,
    Wallet,
    Users,
    PieChart,
} from 'lucide-react'

// Mock data for charts
const monthlyData = [
    { month: 'Sep', amount: 2800000 },
    { month: 'Oct', amount: 4200000 },
    { month: 'Nov', amount: 1500000 },
    { month: 'Dec', amount: 800000 },
    { month: 'Jan', amount: 3200000 },
]

const byFeeType = [
    { name: 'Inscription', amount: 1500000, percent: 25, color: 'bg-blue-500' },
    { name: 'Scolarité', amount: 3500000, percent: 58, color: 'bg-green-500' },
    { name: 'Assurance', amount: 500000, percent: 8, color: 'bg-purple-500' },
    { name: 'Fournitures', amount: 500000, percent: 8, color: 'bg-orange-500' },
]

const byMethod = [
    { method: 'Espèces', amount: 3800000, transactions: 156, color: 'bg-gray-500' },
    { method: 'MyNita', amount: 1800000, transactions: 72, color: 'bg-purple-500' },
    { method: 'Virement', amount: 400000, transactions: 8, color: 'bg-blue-500' },
]

export default function AccountantReportsPage() {
    const [period, setPeriod] = useState('month')

    const maxAmount = Math.max(...monthlyData.map(d => d.amount))

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Rapports Financiers</h1>
                    <p className="text-gray-600">Analysez les données financières de l'établissement</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                    <Download className="h-5 w-5" />
                    Exporter PDF
                </button>
            </div>

            {/* Period Filter */}
            <div className="flex gap-2">
                {['day', 'week', 'month', 'year'].map((p) => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${period === p
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {p === 'day' ? 'Aujourd\'hui' : p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
                    </button>
                ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                    <TrendingUp className="h-8 w-8 mb-3 opacity-80" />
                    <div className="text-3xl font-bold">6.0M</div>
                    <div className="text-green-100">FCFA Total Recettes</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-xl">
                            <Wallet className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">236</div>
                    <div className="text-sm text-gray-500">Transactions</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded-xl">
                            <Users className="h-5 w-5 text-green-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">89%</div>
                    <div className="text-sm text-gray-500">Taux de recouvrement</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-100 rounded-xl">
                            <Users className="h-5 w-5 text-red-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">156</div>
                    <div className="text-sm text-gray-500">Élèves impayés</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trend Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Évolution mensuelle</h2>
                        <BarChart3 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
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

                {/* By Fee Type */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Par type de frais</h2>
                        <PieChart className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {byFeeType.map((fee, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${fee.color}`} />
                                <span className="flex-1 text-sm text-gray-700">{fee.name}</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {(fee.amount / 1000000).toFixed(1)}M FCFA
                                </span>
                                <span className="text-sm text-gray-500 w-12 text-right">{fee.percent}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex rounded-lg overflow-hidden h-3">
                            {byFeeType.map((fee, index) => (
                                <div
                                    key={index}
                                    className={`${fee.color}`}
                                    style={{ width: `${fee.percent}%` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* By Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Par mode de paiement</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {byMethod.map((method, index) => (
                        <div key={index} className="border border-gray-100 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-4 h-4 rounded-full ${method.color}`} />
                                <span className="font-medium text-gray-900">{method.method}</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                {(method.amount / 1000000).toFixed(1)}M FCFA
                            </div>
                            <div className="text-sm text-gray-500">{method.transactions} transactions</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
