'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    School,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Users,
    User,
} from 'lucide-react'

// Mock data
const classesData = [
    { id: '1', name: '6ème A', level: '6ème', section: 'A', capacity: 50, students: 45, teacher: 'M. Ibrahim' },
    { id: '2', name: '6ème B', level: '6ème', section: 'B', capacity: 50, students: 48, teacher: 'Mme Diallo' },
    { id: '3', name: '5ème A', level: '5ème', section: 'A', capacity: 45, students: 42, teacher: 'M. Barry' },
    { id: '4', name: '5ème B', level: '5ème', section: 'B', capacity: 45, students: 40, teacher: 'Mme Keita' },
    { id: '5', name: '4ème A', level: '4ème', section: 'A', capacity: 40, students: 38, teacher: 'M. Mahamane' },
    { id: '6', name: '3ème A', level: '3ème', section: 'A', capacity: 40, students: 35, teacher: 'M. Moussa' },
]

const levelColors = {
    '6ème': 'bg-blue-100 text-blue-700 border-blue-200',
    '5ème': 'bg-green-100 text-green-700 border-green-200',
    '4ème': 'bg-purple-100 text-purple-700 border-purple-200',
    '3ème': 'bg-orange-100 text-orange-700 border-orange-200',
}

export default function DirectorClassesPage() {
    const [search, setSearch] = useState('')
    const [levelFilter, setLevelFilter] = useState('')
    const [openMenu, setOpenMenu] = useState<string | null>(null)

    const filteredClasses = classesData.filter(cls => {
        const matchesSearch = cls.name.toLowerCase().includes(search.toLowerCase())
        const matchesLevel = !levelFilter || cls.level === levelFilter
        return matchesSearch && matchesLevel
    })

    const levels = [...new Set(classesData.map(c => c.level))]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Classes</h1>
                    <p className="text-gray-600">Organisez vos classes et affectez les professeurs principaux</p>
                </div>
                <Link
                    href="/dashboard/director/classes/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Nouvelle classe
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{classesData.length}</div>
                    <div className="text-sm text-gray-500">Total classes</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">
                        {classesData.reduce((sum, c) => sum + c.students, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Total élèves</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-green-600">
                        {Math.round(classesData.reduce((sum, c) => sum + c.students, 0) / classesData.length)}
                    </div>
                    <div className="text-sm text-gray-500">Moyenne par classe</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-purple-600">
                        {classesData.reduce((sum, c) => sum + c.capacity, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Capacité totale</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher une classe..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Tous les niveaux</option>
                    {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClasses.map((cls) => (
                    <div
                        key={cls.id}
                        className={`bg-white rounded-2xl shadow-sm border-2 p-6 hover:shadow-md transition-all ${levelColors[cls.level as keyof typeof levelColors]}`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                    <School className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{cls.name}</h3>
                                    <span className="text-sm text-gray-500">{cls.level}</span>
                                </div>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setOpenMenu(openMenu === cls.id ? null : cls.id)}
                                    className="p-1.5 hover:bg-white/50 rounded-lg"
                                >
                                    <MoreVertical className="h-5 w-5 text-gray-500" />
                                </button>
                                {openMenu === cls.id && (
                                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                                        <Link
                                            href={`/dashboard/director/classes/${cls.id}`}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <Users className="h-4 w-4" />
                                            Voir élèves
                                        </Link>
                                        <Link
                                            href={`/dashboard/director/classes/${cls.id}/edit`}
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

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>{cls.students} / {cls.capacity} élèves</span>
                                </div>
                                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${(cls.students / cls.capacity) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="h-4 w-4" />
                                <span>Prof. principal: {cls.teacher}</span>
                            </div>
                        </div>

                        <Link
                            href={`/dashboard/director/classes/${cls.id}`}
                            className="mt-4 block w-full text-center py-2 bg-white/80 hover:bg-white rounded-xl text-sm font-medium text-gray-700 transition-colors"
                        >
                            Voir les détails
                        </Link>
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
