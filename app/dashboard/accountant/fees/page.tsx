'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    Wallet,
    Plus,
    Search,
    Edit,
    Trash2,
    Calendar,
} from 'lucide-react'

// Mock data
const feeTypesData = [
    { id: '1', name: 'Inscription', amount: 15000, due_date: '2024-10-01', description: 'Frais d\'inscription annuelle' },
    { id: '2', name: 'Scolarité 1er trimestre', amount: 25000, due_date: '2024-10-15', description: 'Frais de scolarité premier trimestre' },
    { id: '3', name: 'Scolarité 2ème trimestre', amount: 25000, due_date: '2025-01-15', description: 'Frais de scolarité deuxième trimestre' },
    { id: '4', name: 'Scolarité 3ème trimestre', amount: 25000, due_date: '2025-04-15', description: 'Frais de scolarité troisième trimestre' },
    { id: '5', name: 'Assurance', amount: 5000, due_date: '2024-10-01', description: 'Assurance scolaire annuelle' },
    { id: '6', name: 'Fournitures', amount: 10000, due_date: '2024-10-01', description: 'Kit de fournitures scolaires' },
]

export default function AccountantFeesPage() {
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingFee, setEditingFee] = useState<typeof feeTypesData[0] | null>(null)

    const filteredFees = feeTypesData.filter(fee =>
        fee.name.toLowerCase().includes(search.toLowerCase())
    )

    const totalAmount = feeTypesData.reduce((sum, fee) => sum + fee.amount, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Types de Frais</h1>
                    <p className="text-gray-600">Configurez les différents frais scolaires</p>
                </div>
                <button
                    onClick={() => { setEditingFee(null); setShowModal(true) }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Nouveau type de frais
                </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-xl">
                            <Wallet className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-gray-500">Total des frais</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                        {totalAmount.toLocaleString()} FCFA
                    </div>
                    <div className="text-sm text-gray-500">par élève / an</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded-xl">
                            <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="text-gray-500">Types de frais</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{feeTypesData.length}</div>
                    <div className="text-sm text-gray-500">configurés</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 rounded-xl">
                            <Wallet className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="text-gray-500">Prochaine échéance</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">15 Janvier 2025</div>
                    <div className="text-sm text-purple-600">Scolarité 2ème trimestre</div>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Rechercher un type de frais..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Fee Types List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                            <th className="px-6 py-4 font-medium">Libellé</th>
                            <th className="px-6 py-4 font-medium">Montant</th>
                            <th className="px-6 py-4 font-medium">Date limite</th>
                            <th className="px-6 py-4 font-medium">Description</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFees.map((fee) => (
                            <tr key={fee.id} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{fee.name}</td>
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-green-600">
                                        {fee.amount.toLocaleString()} FCFA
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{fee.due_date}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                                    {fee.description}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => { setEditingFee(fee); setShowModal(true) }}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit className="h-5 w-5" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">
                            {editingFee ? 'Modifier le type de frais' : 'Nouveau type de frais'}
                        </h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Libellé</label>
                                <input
                                    type="text"
                                    defaultValue={editingFee?.name}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ex: Inscription"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Montant (FCFA)</label>
                                <input
                                    type="number"
                                    defaultValue={editingFee?.amount}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="25000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date limite</label>
                                <input
                                    type="date"
                                    defaultValue={editingFee?.due_date}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    defaultValue={editingFee?.description}
                                    rows={2}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Description du frais..."
                                />
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
                                    {editingFee ? 'Modifier' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
