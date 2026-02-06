import {
    GraduationCap,
    Users,
    ClipboardList,
    Calendar,
    CreditCard,
    BarChart3,
    Bell,
    Shield
} from 'lucide-react'

const features = [
    {
        icon: GraduationCap,
        title: 'Gestion des élèves',
        description: 'Inscriptions, dossiers scolaires, suivi personnalisé et cartes scolaires générées automatiquement.',
        color: 'bg-blue-500',
    },
    {
        icon: ClipboardList,
        title: 'Notes & Bulletins',
        description: 'Saisie des notes par les enseignants, calcul automatique des moyennes et génération de bulletins PDF.',
        color: 'bg-emerald-500',
    },
    {
        icon: Calendar,
        title: 'Emplois du temps',
        description: 'Création et gestion des emplois du temps par classe avec visualisation intuitive.',
        color: 'bg-purple-500',
    },
    {
        icon: CreditCard,
        title: 'Paiements sécurisés',
        description: 'Acceptez les paiements en espèces ou via MyNita avec confirmation par reçu.',
        color: 'bg-orange-500',
    },
    {
        icon: Users,
        title: 'Multi-rôles',
        description: 'Accès personnalisé pour directeurs, surveillants, comptables, enseignants, élèves et parents.',
        color: 'bg-pink-500',
    },
    {
        icon: BarChart3,
        title: 'Tableaux de bord',
        description: 'Statistiques en temps réel sur les performances, présences et finances.',
        color: 'bg-cyan-500',
    },
    {
        icon: Bell,
        title: 'Notifications',
        description: 'Alertes automatiques pour les absences, notes, paiements et événements importants.',
        color: 'bg-yellow-500',
    },
    {
        icon: Shield,
        title: 'Sécurité avancée',
        description: 'Données chiffrées, sauvegardes automatiques et conformité aux normes de protection.',
        color: 'bg-red-500',
    },
]

export function Features() {
    return (
        <section id="fonctionnalites" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Tout ce dont vous avez besoin
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Une plateforme complète pour gérer tous les aspects de votre établissement scolaire
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
                            >
                                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
