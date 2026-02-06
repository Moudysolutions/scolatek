'use client'

import {
    Wallet,
    CreditCard,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Clock,
    ArrowUpRight,
    Download,
} from 'lucide-react'
import Link from 'next/link'

const stats = [
    { label: 'Recettes du mois', value: '4.2M FCFA', change: '+18%', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Paiements validés', value: '89', change: '+12', icon: CheckCircle, color: 'bg-blue-500' },
    { label: 'En attente', value: '23', change: '+5', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Impayés', value: '156', change: '-8', icon: AlertCircle, color: 'bg-red-500' },
]

const recentPayments = [
    { student: 'Ibrahim Moussa', class: '6ème A', amount: '75,000 FCFA', method: 'MyNita', status: 'pending' },
    { student: 'Fatima Diallo', class: '5ème B', amount: '75,000 FCFA', method: 'Espèces', status: 'validated' },
    { student: 'Amadou Keita', class: '4ème A', amount: '50,000 FCFA', method: 'MyNita', status: 'pending' },
    { student: 'Aissatou Barry', class: '3ème C', amount: '100,000 FCFA', method: 'Espèces', status: 'validated' },
]

export function AccountantDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Comptable</h1>
                    <p className="text-gray-600">Gestion financière de l'établissement</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                    <Download className="h-5 w-5" />
                    Exporter le rapport
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-xl`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <span className={`flex items-center text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.change}
                                    <ArrowUpRight className="h-4 w-4 ml-1" />
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    )
                })}
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Paiements récents</h2>
                    <Link href="/dashboard/accountant/payments" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Voir tout
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                                <th className="px-6 py-3 font-medium">Élève</th>
                                <th className="px-6 py-3 font-medium">Classe</th>
                                <th className="px-6 py-3 font-medium">Montant</th>
                                <th className="px-6 py-3 font-medium">Mode</th>
                                <th className="px-6 py-3 font-medium">Statut</th>
                                <th className="px-6 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPayments.map((payment, index) => (
                                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{payment.student}</td>
                                    <td className="px-6 py-4 text-gray-600">{payment.class}</td>
                                    <td className="px-6 py-4 text-gray-900">{payment.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-sm ${payment.method === 'MyNita' ? 'bg-purple-50 text-purple-700' : 'bg-gray-50 text-gray-700'
                                            }`}>
                                            {payment.method}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-sm ${payment.status === 'validated' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                                            }`}>
                                            {payment.status === 'validated' ? 'Validé' : 'En attente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {payment.status === 'pending' && (
                                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                Valider
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/dashboard/accountant/fees" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group">
                    <Wallet className="h-8 w-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Frais scolaires</h3>
                    <p className="text-sm text-gray-500 mt-1">Configurer les types de frais</p>
                </Link>
                <Link href="/dashboard/accountant/payments" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group">
                    <CreditCard className="h-8 w-8 text-green-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Valider paiements</h3>
                    <p className="text-sm text-gray-500 mt-1">23 paiements en attente</p>
                </Link>
                <Link href="/dashboard/accountant/reports" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group">
                    <TrendingUp className="h-8 w-8 text-purple-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Rapports financiers</h3>
                    <p className="text-sm text-gray-500 mt-1">Générer des rapports PDF</p>
                </Link>
            </div>
        </div>
    )
}
