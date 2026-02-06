'use client'

import { useState } from 'react'
import {
    Calendar,
    Plus,
    Clock,
    MapPin,
    BookOpen,
    User,
} from 'lucide-react'

// Mock data
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

const scheduleData = [
    { day: 0, hour: '08:00', subject: 'Mathématiques', teacher: 'M. Ibrahim', room: 'S101', duration: 2 },
    { day: 0, hour: '10:00', subject: 'Français', teacher: 'Mme Diallo', room: 'S102', duration: 1 },
    { day: 0, hour: '14:00', subject: 'Histoire-Géo', teacher: 'M. Barry', room: 'S101', duration: 2 },
    { day: 1, hour: '08:00', subject: 'Anglais', teacher: 'Mme Keita', room: 'S103', duration: 2 },
    { day: 1, hour: '10:00', subject: 'Sciences (SVT)', teacher: 'M. Sow', room: 'Labo', duration: 2 },
    { day: 1, hour: '14:00', subject: 'Mathématiques', teacher: 'M. Ibrahim', room: 'S101', duration: 1 },
    { day: 2, hour: '08:00', subject: 'Français', teacher: 'Mme Diallo', room: 'S102', duration: 2 },
    { day: 2, hour: '10:00', subject: 'Éducation Physique', teacher: 'M. Moussa', room: 'Terrain', duration: 2 },
    { day: 3, hour: '08:00', subject: 'Sciences (Physique)', teacher: 'M. Ali', room: 'Labo', duration: 2 },
    { day: 3, hour: '10:00', subject: 'Histoire-Géo', teacher: 'M. Barry', room: 'S101', duration: 1 },
    { day: 3, hour: '14:00', subject: 'Anglais', teacher: 'Mme Keita', room: 'S103', duration: 2 },
    { day: 4, hour: '08:00', subject: 'Mathématiques', teacher: 'M. Ibrahim', room: 'S101', duration: 2 },
    { day: 4, hour: '10:00', subject: 'Informatique', teacher: 'M. Hamidou', room: 'Salle Info', duration: 2 },
    { day: 5, hour: '08:00', subject: 'Révisions', teacher: 'Divers', room: 'S101', duration: 3 },
]

const subjectColors: Record<string, string> = {
    'Mathématiques': 'bg-blue-100 border-blue-300 text-blue-800',
    'Français': 'bg-green-100 border-green-300 text-green-800',
    'Anglais': 'bg-purple-100 border-purple-300 text-purple-800',
    'Histoire-Géo': 'bg-yellow-100 border-yellow-300 text-yellow-800',
    'Sciences (SVT)': 'bg-emerald-100 border-emerald-300 text-emerald-800',
    'Sciences (Physique)': 'bg-cyan-100 border-cyan-300 text-cyan-800',
    'Éducation Physique': 'bg-orange-100 border-orange-300 text-orange-800',
    'Informatique': 'bg-indigo-100 border-indigo-300 text-indigo-800',
    'Révisions': 'bg-gray-100 border-gray-300 text-gray-800',
}

export default function StudentSchedulePage() {
    const [selectedDay, setSelectedDay] = useState(new Date().getDay() - 1)

    const todaySchedule = scheduleData.filter(s => s.day === selectedDay)

    const getSlotStyle = (duration: number) => {
        return { height: `${duration * 60}px` }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mon Emploi du Temps</h1>
                    <p className="text-gray-600">Classe: 6ème A - Année scolaire 2024-2025</p>
                </div>
            </div>

            {/* Day Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {days.map((day, index) => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(index)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${selectedDay === index
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Schedule View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Schedule */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        {days[selectedDay >= 0 ? selectedDay : 0]}
                    </h2>

                    <div className="space-y-3">
                        {todaySchedule.length > 0 ? (
                            todaySchedule.map((slot, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl border-2 p-4 ${subjectColors[slot.subject] || 'bg-gray-100 border-gray-300'}`}
                                    style={getSlotStyle(slot.duration)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg">{slot.subject}</h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm opacity-80">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {slot.hour} ({slot.duration}h)
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    {slot.teacher}
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

                {/* Weekly Overview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Cette semaine</h2>
                    <div className="space-y-2">
                        {days.slice(0, 6).map((day, dayIndex) => {
                            const dayCount = scheduleData.filter(s => s.day === dayIndex).length
                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(dayIndex)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${selectedDay === dayIndex ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="font-medium text-gray-700">{day}</span>
                                    <span className="text-sm text-gray-500">{dayCount} cours</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Légende des matières</h3>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(subjectColors).map(([subject, color]) => (
                        <span key={subject} className={`px-3 py-1 rounded-lg text-xs border ${color}`}>
                            {subject}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
