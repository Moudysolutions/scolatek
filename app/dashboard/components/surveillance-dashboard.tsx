'use client'

import {
    Calendar,
    FileText,
    AlertCircle,
    Clock,
    Users,
    CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

const stats = [
    { label: 'Bulletins générés', value: '856', icon: FileText, color: 'bg-blue-500' },
    { label: 'Absences ce mois', value: '124', icon: AlertCircle, color: 'bg-red-500' },
    { label: 'Emplois du temps', value: '32', icon: Calendar, color: 'bg-green-500' },
    { label: 'Classes suivies', value: '32', icon: Users, color: 'bg-purple-500' },
]

const pendingTasks = [
    { task: 'Valider les absences du 15/01', priority: 'high' },
    { task: 'Générer les bulletins du 1er trimestre - 6ème', priority: 'medium' },
    { task: 'Mettre à jour l\'emploi du temps de 5ème A', priority: 'low' },
    { task: 'Vérifier les notes manquantes en 4ème', priority: 'high' },
]

export function SurveillanceDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Surveillant</h1>
                <p className="text-gray-600">Gestion pédagogique de l'établissement</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className={`${stat.color} p-3 rounded-xl w-fit mb-4`}>
                                <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Tasks */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Tâches en attente</h2>
                    </div>
                    <div className="p-4 space-y-2">
                        {pendingTasks.map((task, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' :
                                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`} />
                                <span className="flex-1 text-sm text-gray-900">{task.task}</span>
                                <button className="p-1 hover:bg-gray-200 rounded">
                                    <CheckCircle className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/dashboard/surveillance/schedules" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
                            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Emplois du temps</span>
                        </Link>
                        <Link href="/dashboard/surveillance/report-cards" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center">
                            <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Bulletins</span>
                        </Link>
                        <Link href="/dashboard/surveillance/absences" className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-center">
                            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Absences</span>
                        </Link>
                        <Link href="/dashboard/surveillance/classes" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-center">
                            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Classes</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
