import { Star } from 'lucide-react'

const testimonials = [
    {
        content: "ScolaTek a transformé notre façon de gérer l'école. Fini les papiers partout ! Les parents peuvent enfin suivre les notes en temps réel.",
        author: 'Amadou Diallo',
        role: 'Directeur',
        school: 'Groupe Scolaire Excellence, Niamey',
        rating: 5,
    },
    {
        content: "En tant que comptable, j'apprécie particulièrement le suivi des paiements. Plus de confusion avec les reçus papier !",
        author: 'Fatima Maiga',
        role: 'Comptable',
        school: 'Collège Al-Falah, Maradi',
        rating: 5,
    },
    {
        content: "La saisie des notes est devenue un jeu d'enfant. Les bulletins sont générés automatiquement avec les moyennes.",
        author: 'Ibrahim Moussa',
        role: 'Enseignant',
        school: 'Lycée Moderne, Zinder',
        rating: 5,
    },
]

export function Testimonials() {
    return (
        <section id="temoignages" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ils nous font confiance
                    </h2>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Découvrez les témoignages de nos utilisateurs satisfaits
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-blue-50 mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold">
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{testimonial.author}</div>
                                    <div className="text-sm text-blue-200">{testimonial.role}</div>
                                    <div className="text-xs text-blue-300">{testimonial.school}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
