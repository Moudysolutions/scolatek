'use client'

import { useState } from 'react'
import {
    ClipboardList,
    Save,
    Download,
    Check,
} from 'lucide-react'

// Mock data
const classesData = [
    { id: '1', name: '6ème A', subject: 'Mathématiques' },
    { id: '2', name: '5ème B', subject: 'Mathématiques' },
    { id: '3', name: '4ème A', subject: 'Mathématiques' },
]

const studentsGrades = [
    { id: '1', name: 'Ibrahim Moussa', devoir1: 15, devoir2: 14, interrogation: 16, examen: null },
    { id: '2', name: 'Fatima Diallo', devoir1: 17, devoir2: 16, interrogation: 18, examen: null },
    { id: '3', name: 'Ali Mahamane', devoir1: 12, devoir2: 13, interrogation: 11, examen: null },
    { id: '4', name: 'Aissatou Barry', devoir1: 14, devoir2: 15, interrogation: 14, examen: null },
    { id: '5', name: 'Mamadou Keita', devoir1: 16, devoir2: 17, interrogation: 15, examen: null },
    { id: '6', name: 'Mariama Sow', devoir1: 18, devoir2: 19, interrogation: 17, examen: null },
]

export default function TeacherGradesPage() {
    const [selectedClass, setSelectedClass] = useState(classesData[0])
    const [grades, setGrades] = useState(studentsGrades)
    const [editingField, setEditingField] = useState<string | null>(null)
    const [saved, setSaved] = useState(false)

    const updateGrade = (studentId: string, field: string, value: number | null) => {
        setGrades(prev => prev.map(s =>
            s.id === studentId ? { ...s, [field]: value } : s
        ))
        setSaved(false)
    }

    const calculateAverage = (student: typeof studentsGrades[0]) => {
        const grades = [student.devoir1, student.devoir2, student.interrogation, student.examen].filter(g => g !== null) as number[]
        if (grades.length === 0) return null
        return (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2)
    }

    const handleSave = () => {
        // Save grades logic
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Saisie des Notes</h1>
                    <p className="text-gray-600">Saisissez et gérez les notes de vos élèves</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Download className="h-5 w-5" />
                        Exporter
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        {saved ? <Check className="h-5 w-5" /> : <Save className="h-5 w-5" />}
                        {saved ? 'Enregistré!' : 'Enregistrer'}
                    </button>
                </div>
            </div>

            {/* Class Selection */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex flex-wrap gap-3">
                    {classesData.map(cls => (
                        <button
                            key={cls.id}
                            onClick={() => setSelectedClass(cls)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedClass.id === cls.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {cls.name} - {cls.subject}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grade Entry Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-800">
                    <ClipboardList className="h-5 w-5" />
                    <span className="font-medium">
                        Classe: {selectedClass.name} | Matière: {selectedClass.subject} |
                        Trimestre: 1er Trimestre
                    </span>
                </div>
            </div>

            {/* Grades Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-4 font-medium">#</th>
                                <th className="px-6 py-4 font-medium">Élève</th>
                                <th className="px-6 py-4 font-medium text-center">Devoir 1</th>
                                <th className="px-6 py-4 font-medium text-center">Devoir 2</th>
                                <th className="px-6 py-4 font-medium text-center">Interrogation</th>
                                <th className="px-6 py-4 font-medium text-center">Examen</th>
                                <th className="px-6 py-4 font-medium text-center">Moyenne</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((student, index) => {
                                const avg = calculateAverage(student)
                                return (
                                    <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                                        {['devoir1', 'devoir2', 'interrogation', 'examen'].map(field => (
                                            <td key={field} className="px-6 py-4 text-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="20"
                                                    step="0.5"
                                                    value={student[field as keyof typeof student] ?? ''}
                                                    onChange={(e) => updateGrade(student.id, field, e.target.value ? parseFloat(e.target.value) : null)}
                                                    className="w-16 px-2 py-1.5 text-center border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="-"
                                                />
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 text-center">
                                            <span className={`font-bold ${avg && parseFloat(avg) >= 10 ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {avg ? `${avg}/20` : '-'}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-sm text-gray-500">
                    <strong>Légende:</strong> Notes sur 20 |
                    <span className="text-green-600 ml-2">Vert = Moyenne ≥ 10</span> |
                    <span className="text-red-600 ml-2">Rouge = Moyenne &lt; 10</span>
                </div>
            </div>
        </div>
    )
}
