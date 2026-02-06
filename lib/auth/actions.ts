'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export interface AuthResult {
    success: boolean
    error?: string
}

export async function login(formData: FormData): Promise<AuthResult> {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { success: false, error: 'Email et mot de passe requis' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function register(formData: FormData): Promise<AuthResult> {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const role = formData.get('role') as string || 'director'

    if (!email || !password || !firstName || !lastName) {
        return { success: false, error: 'Tous les champs sont requis' }
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                role: role,
            },
        },
    })

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function forgotPassword(formData: FormData): Promise<AuthResult> {
    const supabase = await createClient()

    const email = formData.get('email') as string

    if (!email) {
        return { success: false, error: 'Email requis' }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}

export async function resetPassword(formData: FormData): Promise<AuthResult> {
    const supabase = await createClient()

    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!password || !confirmPassword) {
        return { success: false, error: 'Mot de passe requis' }
    }

    if (password !== confirmPassword) {
        return { success: false, error: 'Les mots de passe ne correspondent pas' }
    }

    const { error } = await supabase.auth.updateUser({
        password,
    })

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function getCurrentUser() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('*, school:schools(*)')
        .eq('user_id', user.id)
        .single()

    return profile
}

export async function getUserRole() {
    const profile = await getCurrentUser()
    return profile?.role || null
}
