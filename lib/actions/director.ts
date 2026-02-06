'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { UserRole } from '@/types/database.types'

// =====================================================
// Staff Management
// =====================================================

export async function getStaff(schoolId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('school_id', schoolId)
        .in('role', ['surveillance', 'accountant', 'teacher'])
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

export async function getStaffMember(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

export async function createStaff(formData: FormData, schoolId: string) {
    const supabase = await createClient()

    const first_name = formData.get('first_name') as string
    const last_name = formData.get('last_name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const role = formData.get('role') as UserRole
    const password = formData.get('password') as string

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    })

    if (authError) throw authError

    // Profile is created via trigger, update with school info
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            first_name,
            last_name,
            phone,
            role,
            school_id: schoolId,
        })
        .eq('user_id', authData.user.id)

    if (profileError) throw profileError

    revalidatePath('/dashboard/director/staff')
    return { success: true }
}

export async function updateStaff(id: string, formData: FormData) {
    const supabase = await createClient()

    const first_name = formData.get('first_name') as string
    const last_name = formData.get('last_name') as string
    const phone = formData.get('phone') as string
    const role = formData.get('role') as UserRole

    const { error } = await supabase
        .from('profiles')
        .update({
            first_name,
            last_name,
            phone,
            role,
        })
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/director/staff')
    return { success: true }
}

export async function deleteStaff(id: string) {
    const supabase = await createClient()

    // Get user_id first
    const { data: profile } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('id', id)
        .single()

    if (profile?.user_id) {
        // Delete auth user (will cascade to profile)
        await supabase.auth.admin.deleteUser(profile.user_id)
    }

    revalidatePath('/dashboard/director/staff')
    return { success: true }
}

// =====================================================
// Classes Management
// =====================================================

export async function getClasses(schoolId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('classes')
        .select(`
      *,
      main_teacher:profiles(id, first_name, last_name)
    `)
        .eq('school_id', schoolId)
        .order('name')

    if (error) throw error
    return data
}

export async function createClass(formData: FormData, schoolId: string, academicYearId: string) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const level = formData.get('level') as string
    const section = formData.get('section') as string
    const capacity = parseInt(formData.get('capacity') as string)
    const main_teacher_id = formData.get('main_teacher_id') as string

    const { error } = await supabase
        .from('classes')
        .insert({
            school_id: schoolId,
            academic_year_id: academicYearId,
            name,
            level,
            section,
            capacity,
            main_teacher_id: main_teacher_id || null,
        })

    if (error) throw error

    revalidatePath('/dashboard/director/classes')
    return { success: true }
}

export async function updateClass(id: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const level = formData.get('level') as string
    const section = formData.get('section') as string
    const capacity = parseInt(formData.get('capacity') as string)
    const main_teacher_id = formData.get('main_teacher_id') as string

    const { error } = await supabase
        .from('classes')
        .update({
            name,
            level,
            section,
            capacity,
            main_teacher_id: main_teacher_id || null,
        })
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/director/classes')
    return { success: true }
}

export async function deleteClass(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/director/classes')
    return { success: true }
}

// =====================================================
// Students Management
// =====================================================

export async function getStudents(schoolId: string, classId?: string) {
    const supabase = await createClient()

    let query = supabase
        .from('students')
        .select(`
      *,
      class:classes(id, name, level)
    `)
        .eq('school_id', schoolId)
        .order('last_name')

    if (classId) {
        query = query.eq('class_id', classId)
    }

    const { data, error } = await query

    if (error) throw error
    return data
}

export async function createStudent(formData: FormData, schoolId: string) {
    const supabase = await createClient()

    const first_name = formData.get('first_name') as string
    const last_name = formData.get('last_name') as string
    const date_of_birth = formData.get('date_of_birth') as string
    const gender = formData.get('gender') as string
    const class_id = formData.get('class_id') as string
    const parent_phone = formData.get('parent_phone') as string
    const parent_name = formData.get('parent_name') as string
    const address = formData.get('address') as string

    // Generate matricule
    const year = new Date().getFullYear().toString().slice(-2)
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    const matricule = `SCO${year}${random}`

    const { error } = await supabase
        .from('students')
        .insert({
            school_id: schoolId,
            class_id,
            matricule,
            first_name,
            last_name,
            date_of_birth,
            gender,
            parent_phone,
            parent_name,
            address,
        })

    if (error) throw error

    revalidatePath('/dashboard/director/students')
    return { success: true }
}

export async function updateStudent(id: string, formData: FormData) {
    const supabase = await createClient()

    const first_name = formData.get('first_name') as string
    const last_name = formData.get('last_name') as string
    const date_of_birth = formData.get('date_of_birth') as string
    const gender = formData.get('gender') as string
    const class_id = formData.get('class_id') as string
    const parent_phone = formData.get('parent_phone') as string
    const parent_name = formData.get('parent_name') as string
    const address = formData.get('address') as string

    const { error } = await supabase
        .from('students')
        .update({
            first_name,
            last_name,
            date_of_birth,
            gender,
            class_id,
            parent_phone,
            parent_name,
            address,
        })
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/director/students')
    return { success: true }
}

export async function deleteStudent(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id)

    if (error) throw error

    revalidatePath('/dashboard/director/students')
    return { success: true }
}

// =====================================================
// Director Stats
// =====================================================

export async function getDirectorStats(schoolId: string) {
    const supabase = await createClient()

    const [studentsRes, staffRes, classesRes] = await Promise.all([
        supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).in('role', ['surveillance', 'accountant', 'teacher']),
        supabase.from('classes').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    ])

    // Get monthly payments
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('school_id', schoolId)
        .eq('status', 'validated')
        .gte('created_at', startOfMonth.toISOString())

    const monthlyPayments = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

    return {
        totalStudents: studentsRes.count || 0,
        totalStaff: staffRes.count || 0,
        totalClasses: classesRes.count || 0,
        monthlyPayments,
    }
}
