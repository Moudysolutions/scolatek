'use client'

import { useState } from 'react'
import {
    CreditCard,
    CheckCircle,
    Clock,
    Upload,
    FileText,
    Smartphone,
} from 'lucide-react'

// Mock data
const paymentsData = [
    { id: '1', fee: 'Inscription', amount: 15000, status: 'paid', date: '2024-10-01' },
    { id: '2', fee: 'Scolarité 1er trimestre', amount: 25000, status: 'paid', date: '2024-10-15' },
    { id: '3', fee: 'Scolarité 2ème trimestre', amount: 25000, status: 'pending', date: null },
    { id: '4', fee: 'Assurance', amount: 5000, status: 'paid', date: '2024-10-01' },
    { id: '5', fee: 'Fournitures', amount: 10000, status: 'pending', date: null },
]

const mynitaNumber = '+227 90 00 00 00'

export default function ParentPaymentsPage() {
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [selectedFee, setSelectedFee] = useState<typeof paymentsData[0] | null>(null)
    const [receiptFile, setReceiptFile] = useState<File | null>(null)

    const totalPaid = paymentsData.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
    const totalPending = paymentsData.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

    const handlePayment = (fee: typeof paymentsData[0]) => {
        setSelectedFee(fee)
        setShowPaymentModal(true)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Paiements</h1>
                <p className="text-gray-600">Gérez les frais scolaires de vos enfants</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                    <CheckCircle className="h-8 w-8 mb-3 opacity-80" />
                    <div className="text-3xl font-bold">{totalPaid.toLocaleString()}</div>
                    <div className="text-green-100">FCFA payés</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
                    <Clock className="h-8 w-8 mb-3 opacity-80" />
                    <div className="text-3xl font-bold">{totalPending.toLocaleString()}</div>
                    <div className="text-yellow-100">FCFA restants</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="text-sm text-gray-500 mb-2">Total année scolaire</div>
                    <div className="text-2xl font-bold text-gray-900">
                        {(totalPaid + totalPending).toLocaleString()} FCFA
                    </div>
                </div>
            </div>

            {/* Payment Methods Info */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <Smartphone className="h-6 w-6 text-purple-600" />
                    <div>
                        <div className="font-medium text-purple-900">Paiement via MyNita</div>
                        <div className="text-sm text-purple-700">
                            Effectuez un dépôt ou transfert au <strong>{mynitaNumber}</strong>, puis téléchargez le reçu ci-dessous
                        </div>
                    </div>
                </div>
            </div>

            {/* Payments List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                            <th className="px-6 py-4 font-medium">Type de frais</th>
                            <th className="px-6 py-4 font-medium">Montant</th>
                            <th className="px-6 py-4 font-medium">Statut</th>
                            <th className="px-6 py-4 font-medium">Date de paiement</th>
                            <th className="px-6 py-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentsData.map((payment) => (
                            <tr key={payment.id} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{payment.fee}</td>
                                <td className="px-6 py-4 text-gray-900">
                                    {payment.amount.toLocaleString()} FCFA
                                </td>
                                <td className="px-6 py-4">
                                    {payment.status === 'paid' ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-sm">
                                            <CheckCircle className="h-4 w-4" />
                                            Payé
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
                                            <Clock className="h-4 w-4" />
                                            En attente
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {payment.date || '-'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {payment.status === 'paid' ? (
                                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                            Voir reçu
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handlePayment(payment)}
                                            className="flex items-center gap-1 ml-auto px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Soumettre paiement
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedFee && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-2">Soumettre un paiement</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            {selectedFee.fee} - {selectedFee.amount.toLocaleString()} FCFA
                        </p>

                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
                            <div className="text-sm text-purple-800">
                                <strong>Étape 1:</strong> Effectuez un dépôt/transfert MyNita au numéro:<br />
                                <span className="text-lg font-bold text-purple-900">{mynitaNumber}</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <strong>Étape 2:</strong> Téléchargez le reçu de paiement
                            </label>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                    id="receipt-upload"
                                />
                                <label htmlFor="receipt-upload" className="cursor-pointer">
                                    {receiptFile ? (
                                        <div className="flex items-center justify-center gap-2 text-green-600">
                                            <FileText className="h-6 w-6" />
                                            <span>{receiptFile.name}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                            <span className="text-gray-500">Cliquez pour télécharger</span>
                                            <p className="text-xs text-gray-400 mt-1">JPG, PNG ou PDF</p>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowPaymentModal(false); setReceiptFile(null) }}
                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                disabled={!receiptFile}
                                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Soumettre
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
