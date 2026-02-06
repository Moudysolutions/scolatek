'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import type { UserRole } from '@/types/database.types'
import {
    LayoutDashboard,
    Users,
    Building2,
    Calendar,
    ClipboardList,
    BookOpen,
    CreditCard,
    BarChart3,
    Settings,
    UserCog,
    School,
    FileText,
    Bell,
    Clock,
    Home,
    Wallet,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

interface NavItem {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    roles: UserRole[]
}

const navItems: NavItem[] = [
    // Admin (Platform)
    { label: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'director', 'surveillance', 'accountant', 'teacher', 'student', 'parent'] },
    { label: 'Écoles', href: '/dashboard/admin/schools', icon: Building2, roles: ['admin'] },
    { label: 'Abonnements', href: '/dashboard/admin/subscriptions', icon: CreditCard, roles: ['admin'] },
    { label: 'Paramètres', href: '/dashboard/admin/settings', icon: Settings, roles: ['admin'] },

    // Director
    { label: 'Personnel', href: '/dashboard/director/staff', icon: Users, roles: ['director'] },
    { label: 'Classes', href: '/dashboard/director/classes', icon: School, roles: ['director'] },
    { label: 'Élèves', href: '/dashboard/director/students', icon: Users, roles: ['director'] },
    { label: 'Paiements', href: '/dashboard/director/payments', icon: CreditCard, roles: ['director'] },
    { label: 'Configuration', href: '/dashboard/director/settings', icon: Settings, roles: ['director'] },

    // Surveillance
    { label: 'Emplois du temps', href: '/dashboard/surveillance/schedules', icon: Calendar, roles: ['surveillance', 'director'] },
    { label: 'Bulletins', href: '/dashboard/surveillance/report-cards', icon: FileText, roles: ['surveillance', 'director'] },
    { label: 'Absences', href: '/dashboard/surveillance/absences', icon: AlertCircle, roles: ['surveillance', 'director'] },

    // Accountant
    { label: 'Frais scolaires', href: '/dashboard/accountant/fees', icon: Wallet, roles: ['accountant', 'director'] },
    { label: 'Paiements', href: '/dashboard/accountant/payments', icon: CreditCard, roles: ['accountant'] },
    { label: 'Rapports', href: '/dashboard/accountant/reports', icon: BarChart3, roles: ['accountant', 'director'] },

    // Teacher
    { label: 'Mes classes', href: '/dashboard/teacher/classes', icon: School, roles: ['teacher'] },
    { label: 'Notes', href: '/dashboard/teacher/grades', icon: ClipboardList, roles: ['teacher'] },
    { label: 'Devoirs', href: '/dashboard/teacher/homework', icon: BookOpen, roles: ['teacher'] },
    { label: 'Absences', href: '/dashboard/teacher/absences', icon: AlertCircle, roles: ['teacher'] },

    // Student
    { label: 'Mes notes', href: '/dashboard/student/grades', icon: ClipboardList, roles: ['student'] },
    { label: 'Emploi du temps', href: '/dashboard/student/schedule', icon: Calendar, roles: ['student'] },
    { label: 'Devoirs', href: '/dashboard/student/homework', icon: BookOpen, roles: ['student'] },

    // Parent
    { label: 'Mes enfants', href: '/dashboard/parent/children', icon: Users, roles: ['parent'] },
    { label: 'Notes', href: '/dashboard/parent/grades', icon: ClipboardList, roles: ['parent'] },
    { label: 'Paiements', href: '/dashboard/parent/payments', icon: CreditCard, roles: ['parent'] },
]

export function Sidebar() {
    const pathname = usePathname()
    const { profile, loading } = useAuth()
    const [collapsed, setCollapsed] = useState(false)

    if (loading) {
        return (
            <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}>
                <div className="p-4 animate-pulse">
                    <div className="h-10 bg-gray-200 rounded" />
                </div>
            </aside>
        )
    }

    const userRole = profile?.role || 'student'
    const filteredNavItems = navItems.filter(item => item.roles.includes(userRole))

    return (
        <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}>
            {/* Logo */}
            <div className="p-4 border-b border-gray-200">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="ScolaTek"
                        width={40}
                        height={40}
                        className="rounded-xl flex-shrink-0"
                    />
                    {!collapsed && (
                        <span className="text-xl font-bold text-gray-900">ScolaTek</span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {filteredNavItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href ||
                        (item.href !== '/dashboard' && pathname.startsWith(item.href))

                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : ''}`} />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    )
                })}
            </nav>

            {/* Collapse button */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                >
                    {collapsed ? (
                        <ChevronRight className="h-5 w-5" />
                    ) : (
                        <>
                            <ChevronLeft className="h-5 w-5" />
                            <span className="text-sm">Réduire</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    )
}
