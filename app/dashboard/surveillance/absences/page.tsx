'use client'

import { useState } from 'react'
import {
    UserX,
    Check,
    Search,
    Calendar,
    Clock,
    Save,
} from 'lucide-react'

// Mock data
const classesData = [
    { id: '1', name: '6ème A' },
    { id: '2', name: '6ème B' },
    { id: '3', name: '5ème A' },
    { id: '4', name: '5ème B' },
]

const studentsData = [
    { id: '1', name: 'Ibrahim Moussa', present: true },
    { id: '2', name: 'Fatima Diallo', present: true },
    { id: '3', name: 'Ali Mahamane', present: false },
    { id: '4', name: 'Aissatou Barry', present: true },
    { id: '5', name: 'Mamadou Keita', present: true },
    { id: '6', name: 'Mariama Sow', present: false },
    { id: '7', name: 'Ousmane Diop', present: true },
    { id: '8', name: 'Aminata Traore', present: true },
]

const recentAbsences = [
    { date: '2024-01-15', class: '6ème A', count: 2, students: 'Ali, Mariama' },
    { date: '2024-01-14', class: '5ème B', count: 3, students: 'Ibrahim, Ousmane, Fatima' },
    { date: '2024-01-13', class: '6ème A', count: 1, students: 'Mamadou' },
]

export default function SurveillanceAbsencesPage() {
    const [selectedClass, setSelectedClass] = useState(classesData[0])
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [attendance, setAttendance] = useState(studentsData)
    const [saved, setSaved] = useState(false)

    const toggleAttendance = (studentId: string) => {
        setAttendance(prev => prev.map(s =>
            s.id === studentId ? { ...s, present: !s.present } : s
        ))
        setSaved(false)
    }

    const absentCount = attendance.filter(s => !s.present).length
    const presentCount = attendance.filter(s => s.present).length

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Absences</h1>
                    <p className="text-gray-600">Enregistrez les présences et absences des élèves</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    {saved ? <Check className="h-5 w-5" /> : <Save className="h-5 w-5" />}
                    {saved ? 'Enregistré!' : 'Enregistrer'}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                    <div className="text-sm text-green-700">Présents</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="text-2xl font-bold text-red-600">{absentCount}</div>
                    <div className="text-sm text-red-700">Absents</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{attendance.length}</div>
                    <div className="text-sm text-gray-500">Total classe</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">
                        {((presentCount / attendance.length) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500">Taux de présence</div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex gap-2">
                    {classesData.map(cls => (
                        <button
                            key={cls.id}
                            onClick={() => setSelectedClass(cls)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedClass.id === cls.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {cls.name}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Attendance List */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="font-semibold text-gray-900">
                            Appel - {selectedClass.name} - {date}
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {attendance.map((student, index) => (
                            <div key={student.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 text-sm text-gray-400">{index + 1}</span>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${student.present ? 'bg-green-500' : 'bg-red-500'
                                        }`}>
                                        {student.name.charAt(0)}
                                    </div>
                                    <span className="font-medium text-gray-900">{student.name}</span>
                                </div>
                                <button
                                    onClick={() => toggleAttendance(student.id)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${student.present
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                        }`}
                                >
                                    {student.present ? 'Présent' : 'Absent'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Absences */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-fit">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Absences récentes</h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentAbsences.map((absence, index) => (
                            <div key={index} className="p-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-900">{absence.class}</span>
                                    <span className="text-xs text-gray-500">{absence.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UserX className="h-4 w-4 text-red-500" />
                                    <span className="text-sm text-red-600">{absence.count} absent(s)</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{absence.students}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
