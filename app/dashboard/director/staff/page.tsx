'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    Users,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Mail,
    Phone,
    UserCog,
} from 'lucide-react'

// Mock data
const staffData = [
    { id: '1', first_name: 'Moussa', last_name: 'Ibrahim', email: 'moussa.ibrahim@edu.ne', phone: '+227 90 11 22 33', role: 'teacher', subjects: ['Mathématiques', 'Physique'] },
    { id: '2', first_name: 'Fatima', last_name: 'Diallo', email: 'fatima.diallo@edu.ne', phone: '+227 90 22 33 44', role: 'surveillance', subjects: [] },
    { id: '3', first_name: 'Ali', last_name: 'Mahamane', email: 'ali.mahamane@edu.ne', phone: '+227 90 33 44 55', role: 'accountant', subjects: [] },
    { id: '4', first_name: 'Aissatou', last_name: 'Barry', email: 'aissatou.barry@edu.ne', phone: '+227 90 44 55 66', role: 'teacher', subjects: ['Français', 'Anglais'] },
]

const roleLabels = {
    teacher: 'Enseignant',
    surveillance: 'Surveillant',
    accountant: 'Comptable',
}

const roleColors = {
    teacher: 'bg-blue-100 text-blue-700',
    surveillance: 'bg-purple-100 text-purple-700',
    accountant: 'bg-green-100 text-green-700',
}

export default function DirectorStaffPage() {
    const [search, setSearch] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [openMenu, setOpenMenu] = useState<string | null>(null)

    const filteredStaff = staffData.filter(staff => {
        const matchesSearch =
            staff.first_name.toLowerCase().includes(search.toLowerCase()) ||
            staff.last_name.toLowerCase().includes(search.toLowerCase()) ||
            staff.email.toLowerCase().includes(search.toLowerCase())
        const matchesRole = !roleFilter || staff.role === roleFilter
        return matchesSearch && matchesRole
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestion du Personnel</h1>
                    <p className="text-gray-600">Gérez vos enseignants, surveillants et comptables</p>
                </div>
                <Link
                    href="/dashboard/director/staff/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Nouveau personnel
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{staffData.length}</div>
                    <div className="text-sm text-gray-500">Total personnel</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">
                        {staffData.filter(s => s.role === 'teacher').length}
                    </div>
                    <div className="text-sm text-gray-500">Enseignants</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-purple-600">
                        {staffData.filter(s => s.role === 'surveillance').length}
                    </div>
                    <div className="text-sm text-gray-500">Surveillants</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-green-600">
                        {staffData.filter(s => s.role === 'accountant').length}
                    </div>
                    <div className="text-sm text-gray-500">Comptables</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Tous les rôles</option>
                    <option value="teacher">Enseignants</option>
                    <option value="surveillance">Surveillants</option>
                    <option value="accountant">Comptables</option>
                </select>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStaff.map((staff) => (
                    <div key={staff.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-blue-200 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-semibold">
                                    {staff.first_name.charAt(0)}{staff.last_name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {staff.first_name} {staff.last_name}
                                    </h3>
                                    <span className={`inline-block px-2 py-0.5 rounded-lg text-xs ${roleColors[staff.role as keyof typeof roleColors]}`}>
                                        {roleLabels[staff.role as keyof typeof roleLabels]}
                                    </span>
                                </div>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setOpenMenu(openMenu === staff.id ? null : staff.id)}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                                >
                                    <MoreVertical className="h-5 w-5 text-gray-400" />
                                </button>
                                {openMenu === staff.id && (
                                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                                        <Link
                                            href={`/dashboard/director/staff/${staff.id}/edit`}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Modifier
                                        </Link>
                                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                            Supprimer
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="h-4 w-4 text-gray-400" />
                                {staff.email}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="h-4 w-4 text-gray-400" />
                                {staff.phone}
                            </div>
                            {staff.subjects.length > 0 && (
                                <div className="pt-2 border-t border-gray-100">
                                    <div className="text-xs text-gray-500 mb-1">Matières enseignées</div>
                                    <div className="flex flex-wrap gap-1">
                                        {staff.subjects.map((subject, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Click outside to close menu */}
            {openMenu && (
                <div className="fixed inset-0 z-0" onClick={() => setOpenMenu(null)} />
            )}
        </div>
    )
}
