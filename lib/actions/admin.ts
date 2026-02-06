'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { School, Subscription, SubscriptionPlan, SubscriptionStatus } from '@/types/database.types'

// =====================================================
// Schools
// =====================================================

export async function getSchools() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data as School[]
}

export async function getSchool(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data as School
}

export async function createSchool(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const address = formData.get('address') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string

    const { error } = await supabase
        .from('schools')
        .insert({
            name,
            address,
            phone,
            email,
            subscription_status: 'pending',
        })

    if (error) throw error

    revalidatePath('/dashboard/admin/schools')
    return { success: true }
}

export async function updateSchool(id: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const address = formData.get('address') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const mynita_number = formData.get('mynita_number') as string

    const { error } = await supabase
        .from('schools')
        .update({
            name,
            address,
            phone,
            email,
            mynita_number,
        })
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/admin/schools')
    return { success: true }
}

export async function deleteSchool(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('schools')
        .delete()
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/admin/schools')
    return { success: true }
}

// =====================================================
// Subscriptions
// =====================================================

export async function getSubscriptions() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('subscriptions')
        .select(`
      *,
      school:schools(id, name, email)
    `)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

export async function getPendingSubscriptions() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('subscriptions')
        .select(`
      *,
      school:schools(id, name, email)
    `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

export async function createSubscription(formData: FormData) {
    const supabase = await createClient()

    const school_id = formData.get('school_id') as string
    const plan = formData.get('plan') as SubscriptionPlan
    const amount = parseFloat(formData.get('amount') as string)
    const start_date = formData.get('start_date') as string
    const end_date = formData.get('end_date') as string

    const { error } = await supabase
        .from('subscriptions')
        .insert({
            school_id,
            plan,
            amount,
            start_date,
            end_date,
            status: 'pending',
        })

    if (error) throw error

    revalidatePath('/dashboard/admin/subscriptions')
    return { success: true }
}

export async function validateSubscription(id: string, status: 'validated' | 'rejected') {
    const supabase = await createClient()

    // Get current user profile for validated_by
    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single()

    const { data: subscription, error: fetchError } = await supabase
        .from('subscriptions')
        .select('school_id')
        .eq('id', id)
        .single()

    if (fetchError) throw fetchError

    // Update subscription status
    const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
            status: status === 'validated' ? 'active' : 'cancelled',
            validated_by: profile?.id,
            validated_at: new Date().toISOString(),
        })
        .eq('id', id)

    if (updateError) throw updateError

    // Update school subscription status if validated
    if (status === 'validated') {
        await supabase
            .from('schools')
            .update({ subscription_status: 'active' })
            .eq('id', subscription.school_id)
    }

    revalidatePath('/dashboard/admin/subscriptions')
    return { success: true }
}

// =====================================================
// Admin Settings
// =====================================================

export async function getAdminSettings() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
}

export async function updateAdminSettings(formData: FormData) {
    const supabase = await createClient()

    const mynita_number = formData.get('mynita_number') as string
    const platform_name = formData.get('platform_name') as string

    // Upsert settings
    const { error } = await supabase
        .from('admin_settings')
        .upsert({
            id: '00000000-0000-0000-0000-000000000001',
            mynita_number,
            platform_name,
        })

    if (error) throw error

    revalidatePath('/dashboard/admin/settings')
    return { success: true }
}

// =====================================================
// Statistics
// =====================================================

export async function getAdminStats() {
    const supabase = await createClient()

    // Get counts
    const [schoolsRes, activeSubsRes, pendingSubsRes] = await Promise.all([
        supabase.from('schools').select('id', { count: 'exact', head: true }),
        supabase.from('subscriptions').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('subscriptions').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    ])

    // Get monthly revenue
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { data: monthlyRevenue } = await supabase
        .from('subscriptions')
        .select('amount')
        .eq('status', 'active')
        .gte('created_at', startOfMonth.toISOString())

    const totalRevenue = monthlyRevenue?.reduce((sum, sub) => sum + (sub.amount || 0), 0) || 0

    return {
        totalSchools: schoolsRes.count || 0,
        activeSubscriptions: activeSubsRes.count || 0,
        pendingSubscriptions: pendingSubsRes.count || 0,
        monthlyRevenue: totalRevenue,
    }
}
