'use client'

import { useAuth } from '@/hooks/use-auth'
import {
    ClipboardList,
    Calendar,
    BookOpen,
    TrendingUp,
    Clock,
} from 'lucide-react'
import Link from 'next/link'

const recentGrades = [
    { subject: 'Mathématiques', grade: '16/20', type: 'Devoir', date: '15 Jan' },
    { subject: 'Français', grade: '14/20', type: 'Interrogation', date: '14 Jan' },
    { subject: 'Histoire', grade: '18/20', type: 'Examen', date: '12 Jan' },
    { subject: 'SVT', grade: '15/20', type: 'Devoir', date: '10 Jan' },
]

const upcomingHomework = [
    { subject: 'Mathématiques', title: 'Exercices chapitre 5', deadline: 'Demain' },
    { subject: 'Français', title: 'Dissertation', deadline: 'Dans 3 jours' },
    { subject: 'Anglais', title: 'Vocabulaire Unit 4', deadline: 'Dans 5 jours' },
]

const todaySchedule = [
    { time: '08:00 - 09:00', subject: 'Mathématiques', room: 'Salle 12' },
    { time: '09:00 - 10:00', subject: 'Français', room: 'Salle 8' },
    { time: '10:15 - 11:15', subject: 'Histoire-Géo', room: 'Salle 5' },
    { time: '11:15 - 12:15', subject: 'Anglais', room: 'Salle 3' },
]

export function StudentDashboard() {
    const { profile } = useAuth()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Bonjour, {profile?.first_name} 👋
                </h1>
                <p className="text-gray-600">Voici votre espace élève</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                    <TrendingUp className="h-8 w-8 mb-4 opacity-80" />
                    <div className="text-3xl font-bold">15.25</div>
                    <div className="text-blue-100">Moyenne générale</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                    <ClipboardList className="h-8 w-8 mb-4 opacity-80" />
                    <div className="text-3xl font-bold">8ème</div>
                    <div className="text-green-100">Classement</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
                    <BookOpen className="h-8 w-8 mb-4 opacity-80" />
                    <div className="text-3xl font-bold">3</div>
                    <div className="text-orange-100">Devoirs à rendre</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Schedule */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Emploi du temps</h2>
                    </div>
                    <div className="p-4 space-y-2">
                        {todaySchedule.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="text-xs text-gray-500 w-24">{item.time}</div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">{item.subject}</div>
                                    <div className="text-xs text-gray-500">{item.room}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 pt-0">
                        <Link href="/dashboard/student/schedule" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir la semaine complète →
                        </Link>
                    </div>
                </div>

                {/* Recent Grades */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-green-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Notes récentes</h2>
                    </div>
                    <div className="p-4 space-y-2">
                        {recentGrades.map((grade, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{grade.subject}</div>
                                    <div className="text-xs text-gray-500">{grade.type} - {grade.date}</div>
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
                        <Link href="/dashboard/student/grades" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir toutes mes notes →
                        </Link>
                    </div>
                </div>

                {/* Upcoming Homework */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-orange-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Devoirs à rendre</h2>
                    </div>
                    <div className="p-4 space-y-2">
                        {upcomingHomework.map((hw, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-sm font-medium text-gray-900">{hw.subject}</div>
                                    <span className={`text-xs px-2 py-1 rounded-lg ${hw.deadline === 'Demain' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {hw.deadline}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500">{hw.title}</div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 pt-0">
                        <Link href="/dashboard/student/homework" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir tous les devoirs →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
