import Link from 'next/link'
import { Check } from 'lucide-react'

const plans = [
    {
        name: 'Starter',
        description: 'Idéal pour les petits établissements',
        price: '25 000',
        period: '/mois',
        features: [
            'Jusqu\'à 200 élèves',
            'Gestion des notes',
            'Bulletins PDF',
            'Emplois du temps',
            '3 comptes personnel',
            'Support par email',
        ],
        popular: false,
        cta: 'Commencer',
    },
    {
        name: 'Professionnel',
        description: 'Pour les établissements en croissance',
        price: '50 000',
        period: '/mois',
        features: [
            'Jusqu\'à 500 élèves',
            'Toutes les fonctionnalités Starter',
            'Paiements MyNita',
            '10 comptes personnel',
            'Cartes scolaires',
            'Devoirs en ligne',
            'Support prioritaire',
        ],
        popular: true,
        cta: 'Choisir ce plan',
    },
    {
        name: 'Enterprise',
        description: 'Pour les grands groupes scolaires',
        price: '100 000',
        period: '/mois',
        features: [
            'Élèves illimités',
            'Toutes les fonctionnalités Pro',
            'Multi-établissements',
            'Personnel illimité',
            'API personnalisée',
            'Formation sur site',
            'Support dédié 24/7',
        ],
        popular: false,
        cta: 'Nous contacter',
    },
]

export function Pricing() {
    return (
        <section id="tarifs" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Tarifs simples et transparents
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choisissez le plan adapté à la taille de votre établissement.
                        Tarifs en FCFA, paiement mensuel.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 ${plan.popular
                                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/30 scale-105'
                                    : 'bg-white border-2 border-gray-100 hover:border-blue-100'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-sm font-semibold px-4 py-1 rounded-full">
                                        Le plus populaire
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-6">
                                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.price}
                                </span>
                                <span className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {' '}FCFA{plan.period}
                                </span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-white/20' : 'bg-blue-100'
                                            }`}>
                                            <Check className={`h-3 w-3 ${plan.popular ? 'text-white' : 'text-blue-600'}`} />
                                        </div>
                                        <span className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/register"
                                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-colors ${plan.popular
                                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <p className="text-center mt-12 text-gray-500 text-sm">
                    Tous les plans incluent un essai gratuit de 14 jours. Aucune carte bancaire requise.
                </p>
            </div>
        </section>
    )
}
