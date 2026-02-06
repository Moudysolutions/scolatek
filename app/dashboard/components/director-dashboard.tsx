'use client'

import { useAuth } from '@/hooks/use-auth'
import {
    Users,
    GraduationCap,
    School,
    CreditCard,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    Plus,
} from 'lucide-react'
import Link from 'next/link'

const stats = [
    {
        label: 'Total Élèves',
        value: '1,234',
        change: '+24',
        icon: GraduationCap,
        color: 'bg-blue-500',
    },
    {
        label: 'Personnel',
        value: '48',
        change: '+2',
        icon: Users,
        color: 'bg-green-500',
    },
    {
        label: 'Classes',
        value: '32',
        change: '0',
        icon: School,
        color: 'bg-purple-500',
    },
    {
        label: 'Paiements du mois',
        value: '2.4M FCFA',
        change: '+15%',
        icon: CreditCard,
        color: 'bg-orange-500',
    },
]

const recentActivities = [
    { type: 'payment', message: 'Paiement reçu de Ibrahim Moussa', time: 'Il y a 5 min' },
    { type: 'student', message: 'Nouvel élève inscrit: Fatima Diallo', time: 'Il y a 1h' },
    { type: 'grade', message: 'Notes de Math 6ème saisies', time: 'Il y a 2h' },
    { type: 'absence', message: '3 absences signalées en 5ème', time: 'Il y a 3h' },
]

export function DirectorDashboard() {
    const { profile } = useAuth()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Bonjour, {profile?.first_name} 👋
                    </h1>
                    <p className="text-gray-600">{profile?.school?.name || 'Votre établissement'}</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/dashboard/director/students/new"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Nouvel élève
                    </Link>
                </div>
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
                                <span className="flex items-center text-sm font-medium text-green-600">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Activités récentes</h2>
                    </div>
                    <div className="p-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">{activity.message}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/dashboard/director/students" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
                            <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Élèves</span>
                        </Link>
                        <Link href="/dashboard/director/staff" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center">
                            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Personnel</span>
                        </Link>
                        <Link href="/dashboard/director/classes" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-center">
                            <School className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Classes</span>
                        </Link>
                        <Link href="/dashboard/director/payments" className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors text-center">
                            <CreditCard className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Paiements</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
