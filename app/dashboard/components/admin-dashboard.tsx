'use client'

import {
    Building2,
    Users,
    CreditCard,
    TrendingUp,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react'
import Link from 'next/link'

const stats = [
    {
        label: 'Écoles actives',
        value: '127',
        change: '+12%',
        trend: 'up',
        icon: Building2,
        color: 'bg-blue-500',
    },
    {
        label: 'Abonnements actifs',
        value: '98',
        change: '+8%',
        trend: 'up',
        icon: CheckCircle,
        color: 'bg-green-500',
    },
    {
        label: 'En attente',
        value: '15',
        change: '+3',
        trend: 'up',
        icon: Clock,
        color: 'bg-yellow-500',
    },
    {
        label: 'Revenus du mois',
        value: '4.2M FCFA',
        change: '+18%',
        trend: 'up',
        icon: TrendingUp,
        color: 'bg-purple-500',
    },
]

const recentSubscriptions = [
    { school: 'Groupe Scolaire Excellence', plan: 'Professional', status: 'pending', amount: '50,000 FCFA', date: '2024-01-15' },
    { school: 'Collège Al-Falah', plan: 'Starter', status: 'validated', amount: '25,000 FCFA', date: '2024-01-14' },
    { school: 'Lycée Moderne', plan: 'Enterprise', status: 'pending', amount: '100,000 FCFA', date: '2024-01-14' },
    { school: 'École Primaire Soleil', plan: 'Starter', status: 'validated', amount: '25,000 FCFA', date: '2024-01-13' },
]

export function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Admin</h1>
                <p className="text-gray-600">Vue d'ensemble de la plateforme ScolaTek</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-xl`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <span className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.change}
                                    {stat.trend === 'up' ? (
                                        <ArrowUpRight className="h-4 w-4 ml-1" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4 ml-1" />
                                    )}
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    )
                })}
            </div>

            {/* Recent Subscriptions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Abonnements récents</h2>
                    <Link href="/dashboard/admin/subscriptions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Voir tout
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                                <th className="px-6 py-3 font-medium">École</th>
                                <th className="px-6 py-3 font-medium">Plan</th>
                                <th className="px-6 py-3 font-medium">Montant</th>
                                <th className="px-6 py-3 font-medium">Statut</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSubscriptions.map((sub, index) => (
                                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{sub.school}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                            {sub.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{sub.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-sm ${sub.status === 'validated'
                                                ? 'bg-green-50 text-green-700'
                                                : 'bg-yellow-50 text-yellow-700'
                                            }`}>
                                            {sub.status === 'validated' ? 'Validé' : 'En attente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{sub.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/dashboard/admin/schools" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group">
                    <Building2 className="h-8 w-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Gérer les écoles</h3>
                    <p className="text-sm text-gray-500 mt-1">Ajouter ou modifier les établissements</p>
                </Link>
                <Link href="/dashboard/admin/subscriptions" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group">
                    <CreditCard className="h-8 w-8 text-green-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Valider les paiements</h3>
                    <p className="text-sm text-gray-500 mt-1">15 paiements en attente de validation</p>
                </Link>
                <Link href="/dashboard/admin/settings" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group">
                    <AlertCircle className="h-8 w-8 text-purple-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Configuration MyNita</h3>
                    <p className="text-sm text-gray-500 mt-1">Configurer le numéro de paiement</p>
                </Link>
            </div>
        </div>
    )
}
