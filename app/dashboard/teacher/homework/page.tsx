'use client'

import { useState } from 'react'
import {
    ClipboardCheck,
    Plus,
    Calendar,
    Clock,
    FileText,
    Download,
    CheckCircle,
    XCircle,
} from 'lucide-react'

// Mock data
const homeworkData = [
    {
        id: '1',
        title: 'Exercices chapitre 5',
        class: '6ème A',
        subject: 'Mathématiques',
        dueDate: '2024-01-20',
        assignedDate: '2024-01-15',
        totalStudents: 45,
        submitted: 38,
        graded: 30,
    },
    {
        id: '2',
        title: 'Problèmes géométrie',
        class: '5ème B',
        subject: 'Mathématiques',
        dueDate: '2024-01-22',
        assignedDate: '2024-01-16',
        totalStudents: 42,
        submitted: 20,
        graded: 0,
    },
    {
        id: '3',
        title: 'Révision équations',
        class: '4ème A',
        subject: 'Mathématiques',
        dueDate: '2024-01-18',
        assignedDate: '2024-01-12',
        totalStudents: 40,
        submitted: 40,
        graded: 40,
    },
]

const submissions = [
    { id: '1', student: 'Ibrahim Moussa', submittedAt: '2024-01-17 14:30', file: 'devoir_ibrahim.pdf', status: 'graded', grade: 16 },
    { id: '2', student: 'Fatima Diallo', submittedAt: '2024-01-17 15:45', file: 'devoir_fatima.pdf', status: 'graded', grade: 18 },
    { id: '3', student: 'Ali Mahamane', submittedAt: '2024-01-18 08:00', file: 'devoir_ali.pdf', status: 'pending', grade: null },
    { id: '4', student: 'Aissatou Barry', submittedAt: '2024-01-18 09:15', file: 'devoir_aissatou.pdf', status: 'pending', grade: null },
]

export default function TeacherHomeworkPage() {
    const [selectedHomework, setSelectedHomework] = useState(homeworkData[0])
    const [showNewModal, setShowNewModal] = useState(false)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Devoirs de Maison</h1>
                    <p className="text-gray-600">Gérez et notez les devoirs de vos élèves</p>
                </div>
                <button
                    onClick={() => setShowNewModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Nouveau devoir
                </button>
            </div>

            {/* Homework List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {homeworkData.map((hw) => (
                    <button
                        key={hw.id}
                        onClick={() => setSelectedHomework(hw)}
                        className={`text-left bg-white rounded-xl p-4 border-2 transition-colors ${selectedHomework.id === hw.id
                                ? 'border-blue-500'
                                : 'border-gray-100 hover:border-gray-200'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                {hw.class}
                            </span>
                            <span className="text-xs text-gray-500">
                                {hw.submitted}/{hw.totalStudents} rendus
                            </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{hw.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>Échéance: {hw.dueDate}</span>
                        </div>
                        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${(hw.graded / hw.totalStudents) * 100}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {hw.graded} notés / {hw.submitted} rendus
                        </p>
                    </button>
                ))}
            </div>

            {/* Selected Homework Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">{selectedHomework.title}</h2>
                        <p className="text-sm text-gray-500">
                            {selectedHomework.class} • Échéance: {selectedHomework.dueDate}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                            <Download className="h-4 w-4 inline mr-1" />
                            Tout télécharger
                        </button>
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                            <th className="px-6 py-3 font-medium">Élève</th>
                            <th className="px-6 py-3 font-medium">Rendu le</th>
                            <th className="px-6 py-3 font-medium">Fichier</th>
                            <th className="px-6 py-3 font-medium">Note</th>
                            <th className="px-6 py-3 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub) => (
                            <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium text-gray-900">{sub.student}</td>
                                <td className="px-6 py-3 text-sm text-gray-500">{sub.submittedAt}</td>
                                <td className="px-6 py-3">
                                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                                        <FileText className="h-4 w-4" />
                                        {sub.file}
                                    </button>
                                </td>
                                <td className="px-6 py-3">
                                    {sub.status === 'graded' ? (
                                        <span className="font-semibold text-green-600">{sub.grade}/20</span>
                                    ) : (
                                        <input
                                            type="number"
                                            min="0"
                                            max="20"
                                            placeholder="-"
                                            className="w-16 px-2 py-1 text-center border border-gray-200 rounded-lg"
                                        />
                                    )}
                                </td>
                                <td className="px-6 py-3 text-right">
                                    {sub.status === 'graded' ? (
                                        <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                                            <CheckCircle className="h-4 w-4" />
                                            Noté
                                        </span>
                                    ) : (
                                        <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                                            Valider
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* New Homework Modal */}
            {showNewModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Nouveau devoir de maison</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: Exercices chapitre 6"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                                        <option>6ème A</option>
                                        <option>5ème B</option>
                                        <option>4ème A</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date limite</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="Instructions pour le devoir..."
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowNewModal(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                                >
                                    Créer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
