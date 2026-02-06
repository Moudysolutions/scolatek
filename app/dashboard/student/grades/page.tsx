'use client'

import { useState } from 'react'
import {
    ClipboardList,
    TrendingUp,
    TrendingDown,
    Calendar,
} from 'lucide-react'

// Mock data
const gradesData = [
    {
        subject: 'Mathématiques', teacher: 'M. Ibrahim', grades: [
            { type: 'Devoir 1', grade: 16, max: 20, date: '2024-01-05' },
            { type: 'Devoir 2', grade: 14, max: 20, date: '2024-01-12' },
            { type: 'Interrogation', grade: 15, max: 20, date: '2024-01-15' },
        ], average: 15
    },
    {
        subject: 'Français', teacher: 'Mme Diallo', grades: [
            { type: 'Devoir 1', grade: 14, max: 20, date: '2024-01-08' },
            { type: 'Dissertation', grade: 12, max: 20, date: '2024-01-14' },
        ], average: 13
    },
    {
        subject: 'Histoire-Géographie', teacher: 'M. Barry', grades: [
            { type: 'Contrôle', grade: 18, max: 20, date: '2024-01-10' },
        ], average: 18
    },
    {
        subject: 'Anglais', teacher: 'Mme Keita', grades: [
            { type: 'Oral', grade: 15, max: 20, date: '2024-01-09' },
            { type: 'Devoir', grade: 16, max: 20, date: '2024-01-13' },
        ], average: 15.5
    },
    {
        subject: 'Sciences (SVT)', teacher: 'M. Sow', grades: [
            { type: 'TP', grade: 17, max: 20, date: '2024-01-11' },
        ], average: 17
    },
]

export default function StudentGradesPage() {
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

    const overallAverage = (gradesData.reduce((sum, s) => sum + s.average, 0) / gradesData.length).toFixed(2)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Mes Notes</h1>
                <p className="text-gray-600">Consultez vos notes par matière et trimestre</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                    <TrendingUp className="h-8 w-8 mb-3 opacity-80" />
                    <div className="text-3xl font-bold">{overallAverage}</div>
                    <div className="text-blue-100">Moyenne générale</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="text-2xl font-bold text-green-600">
                        {gradesData.filter(s => s.average >= 15).length}
                    </div>
                    <div className="text-sm text-gray-500">Matières ≥ 15</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="text-2xl font-bold text-yellow-600">
                        {gradesData.filter(s => s.average >= 10 && s.average < 15).length}
                    </div>
                    <div className="text-sm text-gray-500">Matières 10-15</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="text-2xl font-bold text-red-600">
                        {gradesData.filter(s => s.average < 10).length}
                    </div>
                    <div className="text-sm text-gray-500">Matières &lt; 10</div>
                </div>
            </div>

            {/* Trimester Selector */}
            <div className="flex gap-2">
                {['1er Trimestre', '2ème Trimestre', '3ème Trimestre'].map((t, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${i === 0
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-200'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Grades by Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gradesData.map((subject, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all cursor-pointer ${selectedSubject === subject.subject
                                ? 'border-blue-500'
                                : 'border-gray-100 hover:border-gray-200'
                            }`}
                        onClick={() => setSelectedSubject(selectedSubject === subject.subject ? null : subject.subject)}
                    >
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                                    <p className="text-sm text-gray-500">{subject.teacher}</p>
                                </div>
                                <div className={`text-2xl font-bold ${subject.average >= 15 ? 'text-green-600' :
                                        subject.average >= 10 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                    {subject.average}/20
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${subject.average >= 15 ? 'bg-green-500' :
                                            subject.average >= 10 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${(subject.average / 20) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Expanded details */}
                        {selectedSubject === subject.subject && (
                            <div className="border-t border-gray-100 p-4 bg-gray-50">
                                <div className="space-y-2">
                                    {subject.grades.map((grade, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <ClipboardList className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-700">{grade.type}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-500 text-xs">{grade.date}</span>
                                                <span className={`font-semibold ${grade.grade >= 15 ? 'text-green-600' :
                                                        grade.grade >= 10 ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                    {grade.grade}/{grade.max}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-gray-600">Excellent (≥15)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-gray-600">Satisfaisant (10-15)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-gray-600">Insuffisant (&lt;10)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
