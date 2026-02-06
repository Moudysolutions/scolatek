'use client'

import { useAuth } from '@/hooks/use-auth'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

// Dashboard components for each role
import { AdminDashboard } from './components/admin-dashboard'
import { DirectorDashboard } from './components/director-dashboard'
import { SurveillanceDashboard } from './components/surveillance-dashboard'
import { AccountantDashboard } from './components/accountant-dashboard'
import { TeacherDashboard } from './components/teacher-dashboard'
import { StudentDashboard } from './components/student-dashboard'
import { ParentDashboard } from './components/parent-dashboard'

export default function DashboardPage() {
    const { profile, loading } = useAuth()

    if (loading) {
        return null // Layout shows loading
    }

    if (!profile) {
        redirect('/login')
    }

    const role = profile.role

    switch (role) {
        case 'admin':
            return <AdminDashboard />
        case 'director':
            return <DirectorDashboard />
        case 'surveillance':
            return <SurveillanceDashboard />
        case 'accountant':
            return <AccountantDashboard />
        case 'teacher':
            return <TeacherDashboard />
        case 'student':
            return <StudentDashboard />
        case 'parent':
            return <ParentDashboard />
        default:
            return <StudentDashboard />
    }
}
