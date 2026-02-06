-- ScolaTek Database Schema
-- Version: 1.0.0
-- Description: Complete database schema for school management SaaS

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE user_role AS ENUM ('admin', 'director', 'surveillance', 'accountant', 'teacher', 'student', 'parent');
CREATE TYPE payment_method AS ENUM ('cash', 'mynita');
CREATE TYPE payment_status AS ENUM ('pending', 'validated', 'rejected');
CREATE TYPE grade_type AS ENUM ('devoir', 'interrogation', 'examen');
CREATE TYPE subscription_plan AS ENUM ('starter', 'professional', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'pending', 'expired', 'cancelled');
CREATE TYPE report_card_status AS ENUM ('draft', 'published');

-- =====================================================
-- TABLES
-- =====================================================

-- Admin Settings (Platform-wide)
CREATE TABLE admin_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mynita_number VARCHAR(50),
    platform_name VARCHAR(100) DEFAULT 'ScolaTek',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schools
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    logo_url TEXT,
    mynita_number VARCHAR(50),
    subscription_status subscription_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
    role user_role NOT NULL DEFAULT 'student',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Academic Years
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Class Levels (e.g., 6ème, 5ème, 4ème...)
CREATE TABLE class_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classes
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    class_level_id UUID REFERENCES class_levels(id) ON DELETE CASCADE NOT NULL,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subjects
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL,
    coefficient DECIMAL(3,1) DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    matricule VARCHAR(50) UNIQUE NOT NULL,
    birth_date DATE,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Parent-Student Relationship
CREATE TABLE parent_students (
    parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    relationship VARCHAR(50) DEFAULT 'parent',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (parent_id, student_id)
);

-- Enrollments
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, academic_year_id)
);

-- Teacher Subjects (which teacher teaches which subject in which class)
CREATE TABLE teacher_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(teacher_id, subject_id, class_id)
);

-- Grades
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
    teacher_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    value DECIMAL(5,2) NOT NULL CHECK (value >= 0 AND value <= 20),
    type grade_type NOT NULL,
    trimester INTEGER NOT NULL CHECK (trimester >= 1 AND trimester <= 3),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Absences
CREATE TABLE absences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
    reported_by UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    justified BOOLEAN DEFAULT FALSE,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schedules (Weekly timetable)
CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
    teacher_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homeworks
CREATE TABLE homeworks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
    teacher_id UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homework Submissions
CREATE TABLE homework_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    homework_id UUID REFERENCES homeworks(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    file_url TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    grade DECIMAL(5,2) CHECK (grade >= 0 AND grade <= 20),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(homework_id, student_id)
);

-- Report Cards
CREATE TABLE report_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE NOT NULL,
    trimester INTEGER NOT NULL CHECK (trimester >= 1 AND trimester <= 3),
    average DECIMAL(5,2),
    rank INTEGER,
    teacher_comment TEXT,
    director_comment TEXT,
    status report_card_status DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, academic_year_id, trimester)
);

-- Fee Types
CREATE TABLE fee_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    fee_type_id UUID REFERENCES fee_types(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method payment_method NOT NULL,
    receipt_url TEXT,
    status payment_status DEFAULT 'pending',
    validated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    validated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions (School subscriptions to the platform)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    plan subscription_plan NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_receipt_url TEXT,
    status subscription_status DEFAULT 'pending',
    validated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    validated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_school_id ON profiles(school_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_students_class_id ON students(class_id);
CREATE INDEX idx_grades_student_id ON grades(student_id);
CREATE INDEX idx_grades_subject_id ON grades(subject_id);
CREATE INDEX idx_absences_student_id ON absences(student_id);
CREATE INDEX idx_absences_date ON absences(date);
CREATE INDEX idx_schedules_class_id ON schedules(class_id);
CREATE INDEX idx_homeworks_class_id ON homeworks(class_id);
CREATE INDEX idx_payments_student_id ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_subscriptions_school_id ON subscriptions(school_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update trigger to relevant tables
CREATE TRIGGER update_schools_updated_at
    BEFORE UPDATE ON schools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
    BEFORE UPDATE ON admin_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to ensure only one current academic year per school
CREATE OR REPLACE FUNCTION ensure_single_current_year()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_current = TRUE THEN
        UPDATE academic_years
        SET is_current = FALSE
        WHERE school_id = NEW.school_id AND id != NEW.id AND is_current = TRUE;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER ensure_single_current_year_trigger
    BEFORE INSERT OR UPDATE ON academic_years
    FOR EACH ROW
    EXECUTE FUNCTION ensure_single_current_year();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, first_name, last_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', 'Utilisateur'),
        COALESCE(NEW.raw_user_meta_data->>'last_name', 'Nouveau'),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE absences ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE homeworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
BEGIN
    RETURN (
        SELECT role FROM profiles WHERE user_id = auth.uid()
    );
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Helper function to get user school_id
CREATE OR REPLACE FUNCTION get_user_school_id()
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT school_id FROM profiles WHERE user_id = auth.uid()
    );
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Schools policies
CREATE POLICY "Admin can view all schools" ON schools
    FOR SELECT TO authenticated
    USING (get_user_role() = 'admin');

CREATE POLICY "Admin can manage all schools" ON schools
    FOR ALL TO authenticated
    USING (get_user_role() = 'admin')
    WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "School members can view their school" ON schools
    FOR SELECT TO authenticated
    USING (id = get_user_school_id());

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can manage all profiles" ON profiles
    FOR ALL TO authenticated
    USING (get_user_role() = 'admin')
    WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "Director can view school profiles" ON profiles
    FOR SELECT TO authenticated
    USING (
        get_user_role() = 'director' AND
        school_id = get_user_school_id()
    );

CREATE POLICY "Director can manage school staff" ON profiles
    FOR ALL TO authenticated
    USING (
        get_user_role() = 'director' AND
        school_id = get_user_school_id() AND
        role IN ('surveillance', 'accountant', 'teacher')
    )
    WITH CHECK (
        get_user_role() = 'director' AND
        school_id = get_user_school_id() AND
        role IN ('surveillance', 'accountant', 'teacher')
    );

-- Academic years policies (school-scoped)
CREATE POLICY "School members can view academic years" ON academic_years
    FOR SELECT TO authenticated
    USING (school_id = get_user_school_id() OR get_user_role() = 'admin');

CREATE POLICY "Director can manage academic years" ON academic_years
    FOR ALL TO authenticated
    USING (
        (get_user_role() = 'director' AND school_id = get_user_school_id()) OR
        get_user_role() = 'admin'
    )
    WITH CHECK (
        (get_user_role() = 'director' AND school_id = get_user_school_id()) OR
        get_user_role() = 'admin'
    );

-- Class levels policies
CREATE POLICY "School members can view class levels" ON class_levels
    FOR SELECT TO authenticated
    USING (school_id = get_user_school_id() OR get_user_role() = 'admin');

CREATE POLICY "Director can manage class levels" ON class_levels
    FOR ALL TO authenticated
    USING (
        (get_user_role() = 'director' AND school_id = get_user_school_id()) OR
        get_user_role() = 'admin'
    )
    WITH CHECK (
        (get_user_role() = 'director' AND school_id = get_user_school_id()) OR
        get_user_role() = 'admin'
    );

-- Classes policies
CREATE POLICY "School members can view classes" ON classes
    FOR SELECT TO authenticated
    USING (school_id = get_user_school_id() OR get_user_role() = 'admin');

CREATE POLICY "Director and Surveillance can manage classes" ON classes
    FOR ALL TO authenticated
    USING (
        (get_user_role() IN ('director', 'surveillance') AND school_id = get_user_school_id()) OR
        get_user_role() = 'admin'
    )
    WITH CHECK (
        (get_user_role() IN ('director', 'surveillance') AND school_id = get_user_school_id()) OR
        get_user_role() = 'admin'
    );

-- Subjects policies
CREATE POLICY "School members can view subjects" ON subjects
    FOR SELECT TO authenticated
    USING (school_id = get_user_school_id() OR get_user_role() = 'admin');

CREATE POLICY "Director can manage subjects" ON subjects
    FOR ALL TO authenticated
    USING (
        (get_user_role() = 'director' AND school_id = get_user_school_id()) OR
        get_user_role() = 'admin'
    )
    WITH CHECK (
        (get_user_role() = 'director' AND school_id = get_user_school_id()) OR
        get_user_role() = 'admin'
    );

-- Students policies
CREATE POLICY "School staff can view students" ON students
    FOR SELECT TO authenticated
    USING (
        get_user_role() IN ('admin', 'director', 'surveillance', 'accountant', 'teacher') OR
        profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

CREATE POLICY "Director and Surveillance can manage students" ON students
    FOR ALL TO authenticated
    USING (
        get_user_role() IN ('admin', 'director', 'surveillance')
    )
    WITH CHECK (
        get_user_role() IN ('admin', 'director', 'surveillance')
    );

-- Grades policies
CREATE POLICY "Teachers can manage their grades" ON grades
    FOR ALL TO authenticated
    USING (
        get_user_role() = 'teacher' AND teacher_id = (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
    WITH CHECK (
        get_user_role() = 'teacher' AND teacher_id = (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

CREATE POLICY "Students can view their grades" ON grades
    FOR SELECT TO authenticated
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

CREATE POLICY "Parents can view children grades" ON grades
    FOR SELECT TO authenticated
    USING (
        get_user_role() = 'parent' AND
        student_id IN (
            SELECT student_id FROM parent_students
            WHERE parent_id = (SELECT id FROM profiles WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "School staff can view all grades" ON grades
    FOR SELECT TO authenticated
    USING (
        get_user_role() IN ('admin', 'director', 'surveillance')
    );

-- Absences policies
CREATE POLICY "Teachers can report absences" ON absences
    FOR INSERT TO authenticated
    WITH CHECK (get_user_role() = 'teacher');

CREATE POLICY "Surveillance can manage absences" ON absences
    FOR ALL TO authenticated
    USING (get_user_role() IN ('admin', 'director', 'surveillance'))
    WITH CHECK (get_user_role() IN ('admin', 'director', 'surveillance'));

CREATE POLICY "Students can view their absences" ON absences
    FOR SELECT TO authenticated
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

CREATE POLICY "Parents can view children absences" ON absences
    FOR SELECT TO authenticated
    USING (
        get_user_role() = 'parent' AND
        student_id IN (
            SELECT student_id FROM parent_students
            WHERE parent_id = (SELECT id FROM profiles WHERE user_id = auth.uid())
        )
    );

-- Schedules policies
CREATE POLICY "School members can view schedules" ON schedules
    FOR SELECT TO authenticated
    USING (
        class_id IN (SELECT id FROM classes WHERE school_id = get_user_school_id()) OR
        get_user_role() = 'admin'
    );

CREATE POLICY "Surveillance can manage schedules" ON schedules
    FOR ALL TO authenticated
    USING (get_user_role() IN ('admin', 'director', 'surveillance'))
    WITH CHECK (get_user_role() IN ('admin', 'director', 'surveillance'));

-- Homeworks policies
CREATE POLICY "Teachers can manage their homeworks" ON homeworks
    FOR ALL TO authenticated
    USING (
        get_user_role() = 'teacher' AND teacher_id = (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
    WITH CHECK (
        get_user_role() = 'teacher' AND teacher_id = (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

CREATE POLICY "Students can view class homeworks" ON homeworks
    FOR SELECT TO authenticated
    USING (
        class_id IN (SELECT class_id FROM students WHERE profile_id = (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

CREATE POLICY "Parents can view children homeworks" ON homeworks
    FOR SELECT TO authenticated
    USING (
        get_user_role() = 'parent' AND
        class_id IN (
            SELECT s.class_id FROM students s
            JOIN parent_students ps ON s.id = ps.student_id
            WHERE ps.parent_id = (SELECT id FROM profiles WHERE user_id = auth.uid())
        )
    );

-- Homework submissions policies
CREATE POLICY "Students can submit their homework" ON homework_submissions
    FOR INSERT TO authenticated
    WITH CHECK (
        student_id IN (SELECT id FROM students WHERE profile_id = (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

CREATE POLICY "Students can view their submissions" ON homework_submissions
    FOR SELECT TO authenticated
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

CREATE POLICY "Teachers can view and grade submissions" ON homework_submissions
    FOR ALL TO authenticated
    USING (
        homework_id IN (SELECT id FROM homeworks WHERE teacher_id = (SELECT id FROM profiles WHERE user_id = auth.uid()))
    )
    WITH CHECK (
        homework_id IN (SELECT id FROM homeworks WHERE teacher_id = (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

-- Payments policies
CREATE POLICY "Students and parents can view their payments" ON payments
    FOR SELECT TO authenticated
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = (SELECT id FROM profiles WHERE user_id = auth.uid())) OR
        (get_user_role() = 'parent' AND student_id IN (
            SELECT student_id FROM parent_students
            WHERE parent_id = (SELECT id FROM profiles WHERE user_id = auth.uid())
        ))
    );

CREATE POLICY "Parents can create payments" ON payments
    FOR INSERT TO authenticated
    WITH CHECK (
        get_user_role() = 'parent' AND student_id IN (
            SELECT student_id FROM parent_students
            WHERE parent_id = (SELECT id FROM profiles WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Director and Accountant can manage payments" ON payments
    FOR ALL TO authenticated
    USING (get_user_role() IN ('admin', 'director', 'accountant'))
    WITH CHECK (get_user_role() IN ('admin', 'director', 'accountant'));

-- Subscriptions policies
CREATE POLICY "Admin can manage all subscriptions" ON subscriptions
    FOR ALL TO authenticated
    USING (get_user_role() = 'admin')
    WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "Directors can view their school subscription" ON subscriptions
    FOR SELECT TO authenticated
    USING (
        get_user_role() = 'director' AND school_id = get_user_school_id()
    );

-- Admin settings policies
CREATE POLICY "Admin can manage settings" ON admin_settings
    FOR ALL TO authenticated
    USING (get_user_role() = 'admin')
    WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "Anyone can view platform settings" ON admin_settings
    FOR SELECT TO authenticated
    USING (true);

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Note: Run these in Supabase Dashboard SQL Editor or via CLI

-- INSERT INTO storage.buckets (id, name, public) VALUES 
--     ('avatars', 'avatars', true),
--     ('school-logos', 'school-logos', true),
--     ('documents', 'documents', false),
--     ('receipts', 'receipts', false);

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Insert default admin settings
INSERT INTO admin_settings (platform_name, mynita_number)
VALUES ('ScolaTek', NULL)
ON CONFLICT DO NOTHING;
