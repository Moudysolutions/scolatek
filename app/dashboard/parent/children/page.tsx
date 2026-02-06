'use client'

import { useState } from 'react'
import {
    Users,
    TrendingUp,
    GraduationCap,
    Eye,
} from 'lucide-react'
import Link from 'next/link'

// Mock data
const childrenData = [
    {
        id: '1',
        name: 'Ibrahim Moussa',
        class: '6ème A',
        average: 15.5,
        rank: 2,
        attendance: 95,
        pendingFees: 25000,
    },
    {
        id: '2',
        name: 'Fatima Moussa',
        class: '4ème A',
        average: 14.2,
        rank: 5,
        attendance: 98,
        pendingFees: 0,
    },
]

const recentGrades = [
    { subject: 'Mathématiques', grade: 16, max: 20, date: '2024-01-15', child: 'Ibrahim' },
    { subject: 'Français', grade: 14, max: 20, date: '2024-01-14', child: 'Fatima' },
    { subject: 'Histoire-Géo', grade: 18, max: 20, date: '2024-01-13', child: 'Ibrahim' },
    { subject: 'Anglais', grade: 15, max: 20, date: '2024-01-12', child: 'Fatima' },
]

export default function ParentChildrenPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Mes Enfants</h1>
                <p className="text-gray-600">Suivez la scolarité de vos enfants</p>
            </div>

            {/* Children Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {childrenData.map((child) => (
                    <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                                    {child.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{child.name}</h2>
                                    <p className="text-blue-100">{child.class}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <div className={`text-2xl font-bold ${child.average >= 15 ? 'text-green-600' :
                                            child.average >= 10 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {child.average}
                                    </div>
                                    <div className="text-xs text-gray-500">Moyenne</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {child.rank}e
                                    </div>
                                    <div className="text-xs text-gray-500">Rang</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {child.attendance}%
                                    </div>
                                    <div className="text-xs text-gray-500">Présence</div>
                                </div>
                            </div>

                            {child.pendingFees > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                                    <p className="text-sm text-red-700">
                                        <strong>{child.pendingFees.toLocaleString()} FCFA</strong> de frais en attente
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Link
                                    href={`/dashboard/parent/children/${child.id}/grades`}
                                    className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 text-center rounded-xl hover:bg-blue-100 text-sm font-medium"
                                >
                                    Notes
                                </Link>
                                <Link
                                    href={`/dashboard/parent/children/${child.id}/schedule`}
                                    className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 text-center rounded-xl hover:bg-gray-100 text-sm font-medium"
                                >
                                    Emploi du temps
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Grades */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes récentes</h2>
                <div className="space-y-3">
                    {recentGrades.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <GraduationCap className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{grade.subject}</p>
                                    <p className="text-sm text-gray-500">{grade.child} • {grade.date}</p>
                                </div>
                            </div>
                            <div className={`text-lg font-bold ${grade.grade >= 15 ? 'text-green-600' :
                                    grade.grade >= 10 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                {grade.grade}/{grade.max}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
