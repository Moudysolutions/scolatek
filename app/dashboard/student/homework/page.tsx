'use client'

import { useState } from 'react'
import {
    ClipboardList,
    Calendar,
    Upload,
    FileText,
    CheckCircle,
    Clock,
    Download,
} from 'lucide-react'

// Mock data
const homeworkData = [
    {
        id: '1',
        title: 'Exercices chapitre 5',
        subject: 'Mathématiques',
        teacher: 'M. Ibrahim',
        dueDate: '2024-01-20',
        assignedDate: '2024-01-15',
        status: 'pending',
        description: 'Faire les exercices 1 à 10 de la page 45',
        attachment: 'exercices_ch5.pdf',
    },
    {
        id: '2',
        title: 'Dissertation: La liberté',
        subject: 'Français',
        teacher: 'Mme Diallo',
        dueDate: '2024-01-22',
        assignedDate: '2024-01-14',
        status: 'submitted',
        submittedAt: '2024-01-18',
        description: 'Rédiger une dissertation de 2 pages minimum',
        attachment: null,
    },
    {
        id: '3',
        title: 'Carte à compléter',
        subject: 'Histoire-Géo',
        teacher: 'M. Barry',
        dueDate: '2024-01-18',
        assignedDate: '2024-01-10',
        status: 'graded',
        submittedAt: '2024-01-17',
        grade: 17,
        description: 'Compléter la carte de l\'Afrique de l\'Ouest',
        attachment: 'carte_afrique.pdf',
    },
]

const statusConfig = {
    pending: { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', label: 'À rendre', icon: Clock },
    submitted: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'Rendu', icon: CheckCircle },
    graded: { bg: 'bg-green-50 border-green-200', text: 'text-green-700', label: 'Noté', icon: CheckCircle },
}

export default function StudentHomeworkPage() {
    const [filter, setFilter] = useState('all')
    const [showSubmitModal, setShowSubmitModal] = useState(false)
    const [selectedHomework, setSelectedHomework] = useState<typeof homeworkData[0] | null>(null)

    const filteredHomework = homeworkData.filter(hw => {
        if (filter === 'all') return true
        return hw.status === filter
    })

    const handleSubmit = (hw: typeof homeworkData[0]) => {
        setSelectedHomework(hw)
        setShowSubmitModal(true)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Mes Devoirs</h1>
                <p className="text-gray-600">Consultez et soumettez vos devoirs de maison</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="text-2xl font-bold text-yellow-700">
                        {homeworkData.filter(h => h.status === 'pending').length}
                    </div>
                    <div className="text-sm text-yellow-600">À rendre</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-700">
                        {homeworkData.filter(h => h.status === 'submitted').length}
                    </div>
                    <div className="text-sm text-blue-600">En attente de note</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-700">
                        {homeworkData.filter(h => h.status === 'graded').length}
                    </div>
                    <div className="text-sm text-green-600">Notés</div>
                </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                {[
                    { value: 'all', label: 'Tous' },
                    { value: 'pending', label: 'À rendre' },
                    { value: 'submitted', label: 'Rendus' },
                    { value: 'graded', label: 'Notés' },
                ].map(f => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Homework List */}
            <div className="space-y-4">
                {filteredHomework.map((hw) => {
                    const status = statusConfig[hw.status as keyof typeof statusConfig]
                    const StatusIcon = status.icon
                    return (
                        <div
                            key={hw.id}
                            className={`bg-white rounded-2xl border-2 p-5 ${status.bg}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 bg-white rounded-lg text-sm font-medium text-gray-700">
                                            {hw.subject}
                                        </span>
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${status.text}`}>
                                            <StatusIcon className="h-4 w-4" />
                                            {status.label}
                                            {hw.status === 'graded' && `: ${hw.grade}/20`}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{hw.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{hw.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Échéance: {hw.dueDate}
                                        </span>
                                        <span>{hw.teacher}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 ml-4">
                                    {hw.attachment && (
                                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                                            <Download className="h-4 w-4" />
                                            Sujet
                                        </button>
                                    )}
                                    {hw.status === 'pending' && (
                                        <button
                                            onClick={() => handleSubmit(hw)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Rendre
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Submit Modal */}
            {showSubmitModal && selectedHomework && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-2">Rendre le devoir</h3>
                        <p className="text-gray-600 text-sm mb-4">{selectedHomework.title}</p>

                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-4">
                            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 mb-1">Glissez votre fichier ici</p>
                            <p className="text-sm text-gray-400">ou cliquez pour parcourir</p>
                            <input type="file" className="hidden" />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                                Soumettre
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
