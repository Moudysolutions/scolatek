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
    Save,
} from 'lucide-react'

// Mock data
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

const classesData = [
    { id: '1', name: '6ème A' },
    { id: '2', name: '6ème B' },
    { id: '3', name: '5ème A' },
    { id: '4', name: '5ème B' },
    { id: '5', name: '4ème A' },
    { id: '6', name: '3ème A' },
]

const subjectsData = [
    'Mathématiques', 'Français', 'Anglais', 'Histoire-Géo',
    'Sciences (SVT)', 'Sciences (Physique)', 'Éducation Physique', 'Informatique'
]

const teachersData = [
    'M. Ibrahim', 'Mme Diallo', 'M. Barry', 'Mme Keita', 'M. Sow', 'M. Ali'
]

const roomsData = ['S101', 'S102', 'S103', 'Labo', 'Salle Info', 'Terrain']

export default function SurveillanceSchedulePage() {
    const [selectedClass, setSelectedClass] = useState(classesData[0])
    const [showModal, setShowModal] = useState(false)
    const [editingSlot, setEditingSlot] = useState<{ day: number; hour: string } | null>(null)

    const handleCellClick = (day: number, hour: string) => {
        setEditingSlot({ day, hour })
        setShowModal(true)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Emplois du Temps</h1>
                    <p className="text-gray-600">Créez et modifiez les emplois du temps des classes</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                    <Save className="h-5 w-5" />
                    Enregistrer
                </button>
            </div>

            {/* Class Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {classesData.map((cls) => (
                    <button
                        key={cls.id}
                        onClick={() => setSelectedClass(cls)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${selectedClass.id === cls.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {cls.name}
                    </button>
                ))}
            </div>

            {/* Schedule Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 w-20">Heure</th>
                                {days.map((day) => (
                                    <th key={day} className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map((hour) => (
                                <tr key={hour} className="border-t border-gray-100">
                                    <td className="px-4 py-2 text-sm text-gray-500 font-medium">{hour}</td>
                                    {days.map((_, dayIndex) => (
                                        <td
                                            key={dayIndex}
                                            className="px-2 py-2 border-l border-gray-100"
                                        >
                                            <button
                                                onClick={() => handleCellClick(dayIndex, hour)}
                                                className="w-full h-16 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center"
                                            >
                                                <Plus className="h-5 w-5 text-gray-300" />
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Slot Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Ajouter un cours - {selectedClass.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            {editingSlot && `${days[editingSlot.day]} à ${editingSlot.hour}`}
                        </p>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                                    <option value="">Sélectionner une matière</option>
                                    {subjectsData.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant</label>
                                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                                    <option value="">Sélectionner un enseignant</option>
                                    {teachersData.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Salle</label>
                                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                                        {roomsData.map(r => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Durée (h)</label>
                                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                                        <option value="1">1 heure</option>
                                        <option value="2">2 heures</option>
                                        <option value="3">3 heures</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
