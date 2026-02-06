'use client'

import { useState } from 'react'
import {
    Calendar,
    Plus,
    Clock,
    MapPin,
    User,
    Edit,
    Trash2,
} from 'lucide-react'

// Mock data
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

const scheduleData = [
    { id: '1', day: 0, hour: '08:00', subject: 'Mathématiques', class: '6ème A', room: 'S101', duration: 2 },
    { id: '2', day: 0, hour: '10:00', subject: 'Mathématiques', class: '5ème B', room: 'S101', duration: 1 },
    { id: '3', day: 0, hour: '14:00', subject: 'Mathématiques', class: '4ème A', room: 'S101', duration: 2 },
    { id: '4', day: 1, hour: '08:00', subject: 'Mathématiques', class: '6ème A', room: 'S101', duration: 2 },
    { id: '5', day: 1, hour: '14:00', subject: 'Mathématiques', class: '3ème A', room: 'S101', duration: 1 },
    { id: '6', day: 2, hour: '10:00', subject: 'Mathématiques', class: '5ème A', room: 'S101', duration: 2 },
    { id: '7', day: 3, hour: '08:00', subject: 'Mathématiques', class: '6ème B', room: 'S101', duration: 2 },
    { id: '8', day: 4, hour: '08:00', subject: 'Mathématiques', class: '5ème B', room: 'S101', duration: 2 },
]

const classColors: Record<string, string> = {
    '6ème A': 'bg-blue-100 border-blue-300 text-blue-800',
    '6ème B': 'bg-blue-100 border-blue-300 text-blue-800',
    '5ème A': 'bg-green-100 border-green-300 text-green-800',
    '5ème B': 'bg-green-100 border-green-300 text-green-800',
    '4ème A': 'bg-purple-100 border-purple-300 text-purple-800',
    '3ème A': 'bg-orange-100 border-orange-300 text-orange-800',
}

export default function TeacherSchedulePage() {
    const [selectedDay, setSelectedDay] = useState(new Date().getDay() - 1)

    const todaySchedule = scheduleData.filter(s => s.day === selectedDay)
    const totalHours = scheduleData.reduce((sum, s) => sum + s.duration, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mon Emploi du Temps</h1>
                    <p className="text-gray-600">Matière: Mathématiques • {totalHours}h/semaine</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">{totalHours}</div>
                    <div className="text-sm text-gray-500">Heures/semaine</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-green-600">{scheduleData.length}</div>
                    <div className="text-sm text-gray-500">Créneaux</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-purple-600">
                        {new Set(scheduleData.map(s => s.class)).size}
                    </div>
                    <div className="text-sm text-gray-500">Classes</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{todaySchedule.length}</div>
                    <div className="text-sm text-gray-500">Cours aujourd'hui</div>
                </div>
            </div>

            {/* Day Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {days.map((day, index) => {
                    const dayCount = scheduleData.filter(s => s.day === index).length
                    return (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(index)}
                            className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${selectedDay === index
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {day} ({dayCount})
                        </button>
                    )
                })}
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {days[selectedDay >= 0 ? selectedDay : 0]}
                </h2>

                <div className="space-y-3">
                    {todaySchedule.length > 0 ? (
                        todaySchedule.map((slot) => (
                            <div
                                key={slot.id}
                                className={`rounded-xl border-2 p-4 ${classColors[slot.class] || 'bg-gray-100 border-gray-300'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 bg-white/60 rounded-lg text-sm font-medium">
                                                {slot.class}
                                            </span>
                                            <span className="text-sm opacity-70">{slot.subject}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm opacity-80">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {slot.hour} - {slot.duration}h
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {slot.room}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>Pas de cours ce jour</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
