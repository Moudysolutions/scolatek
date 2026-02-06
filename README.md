# 🎓 ScolaTek

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

**Plateforme complète de gestion scolaire SaaS**

[Fonctionnalités](#-fonctionnalités) • [Installation](#-installation) • [Configuration](#-configuration) • [Utilisation](#-utilisation) • [Architecture](#-architecture)

</div>

---

## 📋 Description

**ScolaTek** est une solution SaaS moderne de gestion scolaire conçue pour les établissements éducatifs. Elle offre une suite complète d'outils pour gérer tous les aspects de la vie scolaire : élèves, enseignants, notes, absences, paiements, emplois du temps, et bien plus encore.

## ✨ Fonctionnalités

### 🔐 Gestion des Utilisateurs
- **Multi-rôles** : Admin, Directeur, Surveillant, Comptable, Enseignant, Élève, Parent
- **Authentification sécurisée** via Supabase Auth
- **Tableaux de bord personnalisés** pour chaque rôle

### 🏫 Gestion Académique
- **Années scolaires** : Gestion des périodes académiques
- **Niveaux de classe** : Configuration des niveaux (6ème, 5ème, etc.)
- **Classes** : Création et gestion des classes
- **Matières** : Définition des matières avec coefficients
- **Inscriptions** : Suivi des inscriptions par année

### 👨‍🎓 Gestion des Élèves
- **Profils complets** avec matricule unique
- **Relation parent-élève** pour le suivi familial
- **Historique des inscriptions**

### 📊 Suivi Pédagogique
- **Notes** : Devoirs, Interrogations, Examens par trimestre
- **Bulletins** : Génération de bulletins avec moyennes et classements
- **Devoirs** : Création et soumission de devoirs
- **Absences** : Suivi et justification des absences

### 📅 Organisation
- **Emplois du temps** : Planning hebdomadaire par classe
- **Affectation des enseignants** : Attribution matière-classe-enseignant

### 💰 Gestion Financière
- **Types de frais** : Configuration des frais scolaires
- **Paiements** : Suivi des paiements (Cash, MyNita)
- **Abonnements** : Gestion des abonnements écoles (Starter, Professional, Enterprise)

### 🔒 Sécurité
- **Row Level Security (RLS)** : Isolation des données par école
- **Policies granulaires** : Contrôle d'accès basé sur les rôles

## 🛠️ Stack Technique

| Technologie | Utilisation |
|-------------|-------------|
| **Next.js 16** | Framework React full-stack |
| **TypeScript** | Typage statique |
| **Tailwind CSS 4** | Styling moderne |
| **Supabase** | Backend as a Service (Auth, Database, Storage) |
| **React Hook Form** | Gestion des formulaires |
| **Zod** | Validation des schémas |
| **Recharts** | Graphiques et visualisations |
| **Lucide React** | Icônes UI |
| **jsPDF** | Génération de documents PDF |

## 📦 Installation

### Prérequis

- **Node.js** 18.x ou supérieur
- **npm** ou **yarn** ou **pnpm**
- Compte **Supabase** configuré

### Étapes

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-organisation/scolatek.git
   cd scolatek
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configurer les variables d'environnement**
   
   Créer un fichier `.env.local` à la racine du projet :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
   ```

4. **Configurer la base de données**
   
   Exécuter le script SQL `supabase/schema.sql` dans votre projet Supabase pour créer toutes les tables, fonctions, triggers et policies RLS.

5. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

6. **Ouvrir l'application**
   
   Naviguer vers [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme publique Supabase |

### Configuration Supabase

1. Créer un nouveau projet sur [Supabase](https://supabase.com)
2. Exécuter le schéma SQL (`supabase/schema.sql`)
3. Configurer les buckets de stockage pour les fichiers (avatars, logos, documents, reçus)
4. Activer l'authentification par email

## 🚀 Utilisation

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run start` | Démarre le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |

### Rôles et Accès

| Rôle | Accès |
|------|-------|
| **Admin** | Gestion globale de la plateforme et des écoles |
| **Directeur** | Gestion complète de son école |
| **Surveillant** | Gestion des absences, classes et emplois du temps |
| **Comptable** | Gestion des paiements et finances |
| **Enseignant** | Notes, devoirs et suivi pédagogique |
| **Élève** | Consultation des notes, devoirs et emplois du temps |
| **Parent** | Suivi des enfants |

## 🏗️ Architecture

```
scolatek/
├── app/                      # App Router Next.js
│   ├── (auth)/               # Pages d'authentification
│   ├── dashboard/            # Tableaux de bord par rôle
│   │   ├── admin/            # Dashboard Admin
│   │   ├── director/         # Dashboard Directeur
│   │   ├── surveillance/     # Dashboard Surveillant
│   │   ├── accountant/       # Dashboard Comptable
│   │   ├── teacher/          # Dashboard Enseignant
│   │   ├── student/          # Dashboard Élève
│   │   └── parent/           # Dashboard Parent
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Page d'accueil
├── components/               # Composants réutilisables
├── hooks/                    # Custom React Hooks
├── lib/                      # Utilitaires et configurations
│   ├── actions/              # Server Actions
│   ├── auth/                 # Logique d'authentification
│   └── supabase/             # Client Supabase
├── public/                   # Assets statiques
├── supabase/                 # Schémas SQL
├── types/                    # Définitions TypeScript
└── middleware.ts             # Middleware Next.js
```

## 📊 Modèle de Données

Le schéma de base de données comprend les entités principales suivantes :

- **schools** - Écoles enregistrées
- **profiles** - Profils utilisateurs
- **academic_years** - Années scolaires
- **class_levels** - Niveaux de classe
- **classes** - Classes
- **subjects** - Matières
- **students** - Élèves
- **grades** - Notes
- **absences** - Absences
- **schedules** - Emplois du temps
- **homeworks** - Devoirs
- **payments** - Paiements
- **subscriptions** - Abonnements

## 🔐 Sécurité

- **Row Level Security (RLS)** activée sur toutes les tables
- **Policies** granulaires basées sur les rôles
- **Authentification** sécurisée via Supabase Auth
- **Isolation des données** entre écoles

## 📄 Licence

Ce projet est propriétaire et privé. Tous droits réservés.

---

<div align="center">

Développé avec ❤️ pour l'éducation

</div>
