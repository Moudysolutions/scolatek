'use client'

import { useAuth } from '@/hooks/use-auth'
import {
    Users,
    ClipboardList,
    CreditCard,
    TrendingUp,
    AlertCircle,
    CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

const children = [
    {
        name: 'Ibrahim Moussa',
        class: '6ème A',
        average: 15.5,
        rank: 5,
        absences: 2,
        paymentStatus: 'paid'
    },
    {
        name: 'Fatima Moussa',
        class: '4ème B',
        average: 14.2,
        rank: 8,
        absences: 0,
        paymentStatus: 'pending'
    },
]

const recentGrades = [
    { child: 'Ibrahim', subject: 'Mathématiques', grade: '16/20', date: '15 Jan' },
    { child: 'Fatima', subject: 'Français', grade: '14/20', date: '14 Jan' },
    { child: 'Ibrahim', subject: 'Histoire', grade: '18/20', date: '12 Jan' },
]

export function ParentDashboard() {
    const { profile } = useAuth()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Bonjour, {profile?.first_name} 👋
                </h1>
                <p className="text-gray-600">Suivez la scolarité de vos enfants</p>
            </div>

            {/* Children Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children.map((child, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                                    {child.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">{child.name}</h3>
                                    <p className="text-blue-100">{child.class}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{child.average}</div>
                                    <div className="text-xs text-gray-500">Moyenne</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{child.rank}ème</div>
                                    <div className="text-xs text-gray-500">Classement</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{child.absences}</div>
                                    <div className="text-xs text-gray-500">Absences</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    {child.paymentStatus === 'paid' ? (
                                        <>
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                            <span className="text-sm text-green-600">Frais payés</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                                            <span className="text-sm text-yellow-600">Paiement en attente</span>
                                        </>
                                    )}
                                </div>
                                <Link
                                    href={`/dashboard/parent/children/${index}`}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Voir détails →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Grades */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Notes récentes</h2>
                    </div>
                    <div className="p-4 space-y-2">
                        {recentGrades.map((grade, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{grade.subject}</div>
                                    <div className="text-xs text-gray-500">{grade.child} - {grade.date}</div>
                                </div>
                                <div className={`text-lg font-bold ${parseFloat(grade.grade) >= 15 ? 'text-green-600' :
                                        parseFloat(grade.grade) >= 10 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                    {grade.grade}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 pt-0">
                        <Link href="/dashboard/parent/grades" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir toutes les notes →
                        </Link>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/dashboard/parent/children" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
                            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Mes enfants</span>
                        </Link>
                        <Link href="/dashboard/parent/grades" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center">
                            <ClipboardList className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Notes</span>
                        </Link>
                        <Link href="/dashboard/parent/payments" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-center">
                            <CreditCard className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Paiements</span>
                        </Link>
                        <Link href="/dashboard/parent/absences" className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors text-center">
                            <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Absences</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
