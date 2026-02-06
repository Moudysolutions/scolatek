'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { logout } from '@/lib/auth/actions'
import {
    Bell,
    Search,
    Settings,
    LogOut,
    User,
    ChevronDown,
    Menu,
} from 'lucide-react'

const roleLabels: Record<string, string> = {
    admin: 'Administrateur',
    director: 'Directeur',
    surveillance: 'Surveillant',
    accountant: 'Comptable',
    teacher: 'Enseignant',
    student: 'Élève',
    parent: 'Parent',
}

interface HeaderProps {
    onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    const { profile, loading } = useAuth()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)

    const handleLogout = async () => {
        await logout()
    }

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
            {/* Left side */}
            <div className="flex items-center gap-4">
                {/* Mobile menu button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 w-80">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400 w-full"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                    Aucune notification
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* User menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                            {loading ? '...' : profile?.first_name?.charAt(0) || 'U'}
                        </div>
                        <div className="hidden md:block text-left">
                            <div className="text-sm font-medium text-gray-900">
                                {loading ? 'Chargement...' : `${profile?.first_name || ''} ${profile?.last_name || ''}`}
                            </div>
                            <div className="text-xs text-gray-500">
                                {loading ? '' : roleLabels[profile?.role || 'student']}
                            </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-400 hidden md:block" />
                    </button>

                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                            <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                                <div className="text-sm font-medium text-gray-900">
                                    {profile?.first_name} {profile?.last_name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {roleLabels[profile?.role || 'student']}
                                </div>
                            </div>
                            <Link
                                href="/dashboard/profile"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowUserMenu(false)}
                            >
                                <User className="h-4 w-4" />
                                Mon profil
                            </Link>
                            <Link
                                href="/dashboard/settings"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowUserMenu(false)}
                            >
                                <Settings className="h-4 w-4" />
                                Paramètres
                            </Link>
                            <hr className="my-2" />
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Déconnexion
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Click outside handler */}
            {(showUserMenu || showNotifications) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowUserMenu(false)
                        setShowNotifications(false)
                    }}
                />
            )}
        </header>
    )
}
