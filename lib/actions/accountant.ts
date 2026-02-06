'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { PaymentMethod, PaymentStatus } from '@/types/database.types'

// =====================================================
// Fee Types (Frais scolaires)
// =====================================================

export async function getFeeTypes(schoolId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('fee_types')
        .select('*')
        .eq('school_id', schoolId)
        .order('name')

    if (error) throw error
    return data
}

export async function createFeeType(formData: FormData, schoolId: string, academicYearId: string) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const amount = parseFloat(formData.get('amount') as string)
    const description = formData.get('description') as string
    const due_date = formData.get('due_date') as string

    const { error } = await supabase
        .from('fee_types')
        .insert({
            school_id: schoolId,
            academic_year_id: academicYearId,
            name,
            amount,
            description,
            due_date,
        })

    if (error) throw error

    revalidatePath('/dashboard/accountant/fees')
    return { success: true }
}

export async function updateFeeType(id: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const amount = parseFloat(formData.get('amount') as string)
    const description = formData.get('description') as string
    const due_date = formData.get('due_date') as string

    const { error } = await supabase
        .from('fee_types')
        .update({ name, amount, description, due_date })
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/accountant/fees')
    return { success: true }
}

export async function deleteFeeType(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('fee_types')
        .delete()
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/accountant/fees')
    return { success: true }
}

// =====================================================
// Payments
// =====================================================

export async function getPayments(schoolId: string, status?: PaymentStatus) {
    const supabase = await createClient()

    let query = supabase
        .from('payments')
        .select(`
      *,
      student:students(id, first_name, last_name, matricule, class:classes(name)),
      fee_type:fee_types(name, amount),
      validated_by_profile:profiles!payments_validated_by_fkey(first_name, last_name)
    `)
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false })

    if (status) {
        query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error
    return data
}

export async function getPendingPayments(schoolId: string) {
    return getPayments(schoolId, 'pending')
}

export async function createPayment(formData: FormData, schoolId: string) {
    const supabase = await createClient()

    const student_id = formData.get('student_id') as string
    const fee_type_id = formData.get('fee_type_id') as string
    const amount = parseFloat(formData.get('amount') as string)
    const payment_method = formData.get('payment_method') as PaymentMethod
    const reference = formData.get('reference') as string

    // Generate receipt number
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    const receipt_number = `REC${year}${month}${random}`

    const { error } = await supabase
        .from('payments')
        .insert({
            school_id: schoolId,
            student_id,
            fee_type_id,
            amount,
            payment_method,
            reference,
            receipt_number,
            status: 'pending',
        })

    if (error) throw error

    revalidatePath('/dashboard/accountant/payments')
    return { success: true }
}

export async function validatePayment(id: string, status: 'validated' | 'rejected') {
    const supabase = await createClient()

    // Get current user profile
    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single()

    const { error } = await supabase
        .from('payments')
        .update({
            status,
            validated_by: profile?.id,
            validated_at: new Date().toISOString(),
        })
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/accountant/payments')
    return { success: true }
}

// =====================================================
// Financial Reports
// =====================================================

export async function getFinancialSummary(schoolId: string, period: 'day' | 'week' | 'month' | 'year' = 'month') {
    const supabase = await createClient()

    // Calculate date range based on period
    const now = new Date()
    let startDate = new Date()

    switch (period) {
        case 'day':
            startDate.setHours(0, 0, 0, 0)
            break
        case 'week':
            startDate.setDate(now.getDate() - 7)
            break
        case 'month':
            startDate.setDate(1)
            startDate.setHours(0, 0, 0, 0)
            break
        case 'year':
            startDate.setMonth(0, 1)
            startDate.setHours(0, 0, 0, 0)
            break
    }

    // Get validated payments
    const { data: payments } = await supabase
        .from('payments')
        .select('amount, payment_method')
        .eq('school_id', schoolId)
        .eq('status', 'validated')
        .gte('created_at', startDate.toISOString())

    // Calculate totals by method
    const totals = {
        total: 0,
        cash: 0,
        mynita: 0,
        bank: 0,
    }

    payments?.forEach(p => {
        totals.total += p.amount || 0
        if (p.payment_method === 'cash') totals.cash += p.amount || 0
        else if (p.payment_method === 'mynita') totals.mynita += p.amount || 0
        else if (p.payment_method === 'bank_transfer') totals.bank += p.amount || 0
    })

    // Get pending count
    const { count: pendingCount } = await supabase
        .from('payments')
        .select('id', { count: 'exact', head: true })
        .eq('school_id', schoolId)
        .eq('status', 'pending')

    // Get unpaid students (students who haven't paid all fees)
    const { count: unpaidCount } = await supabase
        .from('students')
        .select('id', { count: 'exact', head: true })
        .eq('school_id', schoolId)
    // Add logic for unpaid check if needed

    return {
        ...totals,
        pendingCount: pendingCount || 0,
        unpaidStudents: unpaidCount || 0,
        transactionCount: payments?.length || 0,
    }
}

export async function getPaymentsByFeeType(schoolId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('payments')
        .select(`
      amount,
      fee_type:fee_types(id, name)
    `)
        .eq('school_id', schoolId)
        .eq('status', 'validated')

    if (error) throw error

    // Group by fee type
    const byFeeType: Record<string, { name: string; total: number; count: number }> = {}

    data?.forEach(p => {
        // Handle Supabase join which can return array or object
        const feeType = Array.isArray(p.fee_type) ? p.fee_type[0] : p.fee_type
        const feeTypeName = (feeType as { id: string; name: string } | null)?.name || 'Autre'
        if (!byFeeType[feeTypeName]) {
            byFeeType[feeTypeName] = { name: feeTypeName, total: 0, count: 0 }
        }
        byFeeType[feeTypeName].total += p.amount || 0
        byFeeType[feeTypeName].count++
    })

    return Object.values(byFeeType)
}
