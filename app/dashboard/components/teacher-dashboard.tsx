'use client'

import { useAuth } from '@/hooks/use-auth'
import {
    School,
    ClipboardList,
    BookOpen,
    AlertCircle,
    Users,
    Plus,
} from 'lucide-react'
import Link from 'next/link'

const myClasses = [
    { name: '6ème A', subject: 'Mathématiques', students: 45, nextClass: 'Aujourd\'hui 10:00' },
    { name: '5ème B', subject: 'Mathématiques', students: 42, nextClass: 'Demain 08:00' },
    { name: '4ème A', subject: 'Mathématiques', students: 38, nextClass: 'Demain 14:00' },
]

const pendingTasks = [
    { task: 'Saisir les notes - Devoir 6ème A', deadline: 'Aujourd\'hui' },
    { task: 'Corriger les devoirs - 5ème B', deadline: 'Demain' },
    { task: 'Préparer le contrôle - 4ème A', deadline: 'Dans 3 jours' },
]

export function TeacherDashboard() {
    const { profile } = useAuth()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Bonjour, {profile?.first_name} 👋
                    </h1>
                    <p className="text-gray-600">Gérez vos classes et notes</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/dashboard/teacher/homework/new"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Nouveau devoir
                    </Link>
                </div>
            </div>

            {/* My Classes */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Mes classes</h2>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {myClasses.map((cls, index) => (
                        <Link
                            key={index}
                            href={`/dashboard/teacher/classes/${index}`}
                            className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <School className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{cls.name}</div>
                                    <div className="text-sm text-gray-500">{cls.subject}</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">{cls.students} élèves</span>
                                <span className="text-blue-600">{cls.nextClass}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Tasks */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">À faire</h2>
                    </div>
                    <div className="p-4 space-y-2">
                        {pendingTasks.map((task, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <span className="text-sm text-gray-900">{task.task}</span>
                                <span className={`text-xs px-2 py-1 rounded-lg ${task.deadline === 'Aujourd\'hui' ? 'bg-red-100 text-red-700' :
                                        task.deadline === 'Demain' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`}>
                                    {task.deadline}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/dashboard/teacher/grades" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
                            <ClipboardList className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Saisir des notes</span>
                        </Link>
                        <Link href="/dashboard/teacher/homework" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center">
                            <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Devoirs</span>
                        </Link>
                        <Link href="/dashboard/teacher/absences" className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-center">
                            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Signaler absence</span>
                        </Link>
                        <Link href="/dashboard/teacher/classes" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-center">
                            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-900">Mes élèves</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
