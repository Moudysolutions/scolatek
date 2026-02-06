'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Profile, UserRole, School } from '@/types/database.types'
import type { User } from '@supabase/supabase-js'

interface ProfileWithSchool extends Profile {
    school: School | null
}

interface AuthState {
    user: User | null
    profile: ProfileWithSchool | null
    loading: boolean
    error: string | null
}

export function useAuth() {
    const [state, setState] = useState<AuthState>({
        user: null,
        profile: null,
        loading: true,
        error: null,
    })

    const supabase = createClient()

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            try {
                const { data: { user }, error: userError } = await supabase.auth.getUser()

                if (userError) throw userError

                if (user) {
                    const { data: profile, error: profileError } = await supabase
                        .from('profiles')
                        .select('*, school:schools(*)')
                        .eq('user_id', user.id)
                        .single()

                    if (profileError && profileError.code !== 'PGRST116') {
                        throw profileError
                    }

                    setState({
                        user,
                        profile: profile as ProfileWithSchool | null,
                        loading: false,
                        error: null,
                    })
                } else {
                    setState({
                        user: null,
                        profile: null,
                        loading: false,
                        error: null,
                    })
                }
            } catch (error) {
                setState({
                    user: null,
                    profile: null,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Une erreur est survenue',
                })
            }
        }

        getInitialSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*, school:schools(*)')
                        .eq('user_id', session.user.id)
                        .single()

                    setState({
                        user: session.user,
                        profile: profile as ProfileWithSchool | null,
                        loading: false,
                        error: null,
                    })
                } else if (event === 'SIGNED_OUT') {
                    setState({
                        user: null,
                        profile: null,
                        loading: false,
                        error: null,
                    })
                }
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const hasRole = (roles: UserRole | UserRole[]): boolean => {
        if (!state.profile) return false
        const rolesArray = Array.isArray(roles) ? roles : [roles]
        return rolesArray.includes(state.profile.role)
    }

    const isAdmin = () => hasRole('admin')
    const isDirector = () => hasRole('director')
    const isSurveillance = () => hasRole('surveillance')
    const isAccountant = () => hasRole('accountant')
    const isTeacher = () => hasRole('teacher')
    const isStudent = () => hasRole('student')
    const isParent = () => hasRole('parent')

    const isSchoolStaff = () => hasRole(['director', 'surveillance', 'accountant', 'teacher'])

    return {
        ...state,
        hasRole,
        isAdmin,
        isDirector,
        isSurveillance,
        isAccountant,
        isTeacher,
        isStudent,
        isParent,
        isSchoolStaff,
    }
}
