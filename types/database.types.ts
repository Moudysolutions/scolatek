export type UserRole = 'admin' | 'director' | 'surveillance' | 'accountant' | 'teacher' | 'student' | 'parent'

export type PaymentMethod = 'cash' | 'mynita'

export type PaymentStatus = 'pending' | 'validated' | 'rejected'

export type GradeType = 'devoir' | 'interrogation' | 'examen'

export type SubscriptionPlan = 'starter' | 'professional' | 'enterprise'

export type SubscriptionStatus = 'active' | 'pending' | 'expired' | 'cancelled'

export interface School {
    id: string
    name: string
    address: string | null
    phone: string | null
    email: string | null
    logo_url: string | null
    mynita_number: string | null
    subscription_status: SubscriptionStatus
    created_at: string
    updated_at: string
}

export interface Profile {
    id: string
    user_id: string
    school_id: string | null
    role: UserRole
    first_name: string
    last_name: string
    email: string
    phone: string | null
    photo_url: string | null
    created_at: string
    updated_at: string
}

export interface AcademicYear {
    id: string
    school_id: string
    name: string
    start_date: string
    end_date: string
    is_current: boolean
    created_at: string
}

export interface ClassLevel {
    id: string
    school_id: string
    name: string
    order_index: number
    created_at: string
}

export interface Class {
    id: string
    school_id: string
    class_level_id: string
    academic_year_id: string
    name: string
    created_at: string
}

export interface Subject {
    id: string
    school_id: string
    name: string
    coefficient: number
    created_at: string
}

export interface Student {
    id: string
    profile_id: string
    class_id: string
    matricule: string
    birth_date: string | null
    photo_url: string | null
    created_at: string
}

export interface ParentStudent {
    parent_id: string
    student_id: string
    relationship: string
    created_at: string
}

export interface Enrollment {
    id: string
    student_id: string
    class_id: string
    academic_year_id: string
    created_at: string
}

export interface TeacherSubject {
    id: string
    teacher_id: string
    subject_id: string
    class_id: string
    created_at: string
}

export interface Grade {
    id: string
    student_id: string
    subject_id: string
    teacher_id: string
    value: number
    type: GradeType
    trimester: number
    comment: string | null
    created_at: string
}

export interface Absence {
    id: string
    student_id: string
    date: string
    subject_id: string | null
    reported_by: string
    justified: boolean
    reason: string | null
    created_at: string
}

export interface Schedule {
    id: string
    class_id: string
    subject_id: string
    teacher_id: string
    day_of_week: number
    start_time: string
    end_time: string
    room: string | null
    created_at: string
}

export interface Homework {
    id: string
    subject_id: string
    class_id: string
    teacher_id: string
    title: string
    description: string | null
    due_date: string
    file_url: string | null
    created_at: string
}

export interface HomeworkSubmission {
    id: string
    homework_id: string
    student_id: string
    file_url: string | null
    submitted_at: string
    grade: number | null
    feedback: string | null
    created_at: string
}

export interface ReportCard {
    id: string
    student_id: string
    academic_year_id: string
    trimester: number
    average: number | null
    rank: number | null
    teacher_comment: string | null
    director_comment: string | null
    status: 'draft' | 'published'
    created_at: string
}

export interface FeeType {
    id: string
    school_id: string
    name: string
    amount: number
    academic_year_id: string
    description: string | null
    created_at: string
}

export interface Payment {
    id: string
    student_id: string
    fee_type_id: string
    amount: number
    payment_method: PaymentMethod
    receipt_url: string | null
    status: PaymentStatus
    validated_by: string | null
    validated_at: string | null
    created_at: string
}

export interface Subscription {
    id: string
    school_id: string
    plan: SubscriptionPlan
    start_date: string
    end_date: string
    amount: number
    payment_receipt_url: string | null
    status: SubscriptionStatus
    validated_by: string | null
    validated_at: string | null
    created_at: string
}

export interface AdminSettings {
    id: string
    mynita_number: string | null
    platform_name: string
    updated_at: string
}

// Extended types with relations
export interface ProfileWithSchool extends Profile {
    school: School | null
}

export interface StudentWithProfile extends Student {
    profile: Profile
    class: Class
}

export interface GradeWithDetails extends Grade {
    subject: Subject
    student: StudentWithProfile
}

export interface PaymentWithDetails extends Payment {
    student: StudentWithProfile
    fee_type: FeeType
    validated_by_profile: Profile | null
}

export interface ScheduleWithDetails extends Schedule {
    subject: Subject
    teacher: Profile
    class: Class
}

export interface HomeworkWithDetails extends Homework {
    subject: Subject
    teacher: Profile
    class: Class
    submissions_count: number
}

// Database helper type
export interface Database {
    public: {
        Tables: {
            schools: {
                Row: School
                Insert: Omit<School, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<School, 'id' | 'created_at'>>
            }
            profiles: {
                Row: Profile
                Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Profile, 'id' | 'created_at'>>
            }
            academic_years: {
                Row: AcademicYear
                Insert: Omit<AcademicYear, 'id' | 'created_at'>
                Update: Partial<Omit<AcademicYear, 'id' | 'created_at'>>
            }
            class_levels: {
                Row: ClassLevel
                Insert: Omit<ClassLevel, 'id' | 'created_at'>
                Update: Partial<Omit<ClassLevel, 'id' | 'created_at'>>
            }
            classes: {
                Row: Class
                Insert: Omit<Class, 'id' | 'created_at'>
                Update: Partial<Omit<Class, 'id' | 'created_at'>>
            }
            subjects: {
                Row: Subject
                Insert: Omit<Subject, 'id' | 'created_at'>
                Update: Partial<Omit<Subject, 'id' | 'created_at'>>
            }
            students: {
                Row: Student
                Insert: Omit<Student, 'id' | 'created_at'>
                Update: Partial<Omit<Student, 'id' | 'created_at'>>
            }
            parent_students: {
                Row: ParentStudent
                Insert: Omit<ParentStudent, 'created_at'>
                Update: Partial<Omit<ParentStudent, 'created_at'>>
            }
            enrollments: {
                Row: Enrollment
                Insert: Omit<Enrollment, 'id' | 'created_at'>
                Update: Partial<Omit<Enrollment, 'id' | 'created_at'>>
            }
            teacher_subjects: {
                Row: TeacherSubject
                Insert: Omit<TeacherSubject, 'id' | 'created_at'>
                Update: Partial<Omit<TeacherSubject, 'id' | 'created_at'>>
            }
            grades: {
                Row: Grade
                Insert: Omit<Grade, 'id' | 'created_at'>
                Update: Partial<Omit<Grade, 'id' | 'created_at'>>
            }
            absences: {
                Row: Absence
                Insert: Omit<Absence, 'id' | 'created_at'>
                Update: Partial<Omit<Absence, 'id' | 'created_at'>>
            }
            schedules: {
                Row: Schedule
                Insert: Omit<Schedule, 'id' | 'created_at'>
                Update: Partial<Omit<Schedule, 'id' | 'created_at'>>
            }
            homeworks: {
                Row: Homework
                Insert: Omit<Homework, 'id' | 'created_at'>
                Update: Partial<Omit<Homework, 'id' | 'created_at'>>
            }
            homework_submissions: {
                Row: HomeworkSubmission
                Insert: Omit<HomeworkSubmission, 'id' | 'created_at'>
                Update: Partial<Omit<HomeworkSubmission, 'id' | 'created_at'>>
            }
            report_cards: {
                Row: ReportCard
                Insert: Omit<ReportCard, 'id' | 'created_at'>
                Update: Partial<Omit<ReportCard, 'id' | 'created_at'>>
            }
            fee_types: {
                Row: FeeType
                Insert: Omit<FeeType, 'id' | 'created_at'>
                Update: Partial<Omit<FeeType, 'id' | 'created_at'>>
            }
            payments: {
                Row: Payment
                Insert: Omit<Payment, 'id' | 'created_at'>
                Update: Partial<Omit<Payment, 'id' | 'created_at'>>
            }
            subscriptions: {
                Row: Subscription
                Insert: Omit<Subscription, 'id' | 'created_at'>
                Update: Partial<Omit<Subscription, 'id' | 'created_at'>>
            }
            admin_settings: {
                Row: AdminSettings
                Insert: Omit<AdminSettings, 'id' | 'updated_at'>
                Update: Partial<Omit<AdminSettings, 'id'>>
            }
        }
    }
}
