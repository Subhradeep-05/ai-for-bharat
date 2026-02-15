
---

## **design.md** 

```markdown
# 🏛️ Saarthi AI - Government Scheme Assistant
## 🎨 System Design Document

<div align="center">
  <img src="https://via.placeholder.com/800x200/667eea/ffffff?text=Saarthi+AI+Architecture" alt="Saarthi AI Architecture" style="border-radius: 10px; margin: 20px 0;">
  
  **Version 1.0** | **Last Updated: February 2024** | **Status: ⚡ In Development**
</div>

---

## 📑 Table of Contents

- [1. System Architecture](#1-system-architecture)
  - [1.1 High-Level Architecture](#11-high-level-architecture)
  - [1.2 Technology Stack](#12-technology-stack)
  - [1.3 Architecture Principles](#13-architecture-principles)
- [2. Frontend Design](#2-frontend-design)
  - [2.1 Component Architecture](#21-component-architecture)
  - [2.2 State Management](#22-state-management)
  - [2.3 Routing Structure](#23-routing-structure)
  - [2.4 UI/UX Design System](#24-uiux-design-system)
- [3. Backend Design](#3-backend-design)
  - [3.1 API Architecture](#31-api-architecture)
  - [3.2 Microservices Overview](#32-microservices-overview)
  - [3.3 Authentication Flow](#33-authentication-flow)
  - [3.4 File Processing Pipeline](#34-file-processing-pipeline)
- [4. Database Design](#4-database-design)
  - [4.1 Entity Relationship Diagram](#41-entity-relationship-diagram)
  - [4.2 Collection Schemas](#42-collection-schemas)
  - [4.3 Indexing Strategy](#43-indexing-strategy)
- [5. AI/ML Architecture](#5-aiml-architecture)
  - [5.1 Recommendation Engine](#51-recommendation-engine)
  - [5.2 NLP Pipeline](#52-nlp-pipeline)
  - [5.3 Document Intelligence](#53-document-intelligence)
- [6. Security Design](#6-security-design)
  - [6.1 Authentication & Authorization](#61-authentication--authorization)
  - [6.2 Data Encryption](#62-data-encryption)
  - [6.3 API Security](#63-api-security)
- [7. Scalability Design](#7-scalability-design)
  - [7.1 Horizontal Scaling](#71-horizontal-scaling)
  - [7.2 Caching Strategy](#72-caching-strategy)
  - [7.3 Database Optimization](#73-database-optimization)
- [8. DevOps & Deployment](#8-devops--deployment)
  - [8.1 CI/CD Pipeline](#81-cicd-pipeline)
  - [8.2 Infrastructure as Code](#82-infrastructure-as-code)
  - [8.3 Monitoring & Observability](#83-monitoring--observability)
- [9. API Documentation](#9-api-documentation)
  - [9.1 Authentication APIs](#91-authentication-apis)
  - [9.2 Scheme APIs](#92-scheme-apis)
  - [9.3 Application APIs](#93-application-apis)
  - [9.4 Document APIs](#94-document-apis)
  - [9.5 AI APIs](#95-ai-apis)

---

## 1. System Architecture

### 1.1 High-Level Architecture

```mermaid
graph TB
    subgraph "🌐 Client Layer"
        A[Web App<br/>React + Vite] --> CDN[Cloudflare CDN]
        B[Mobile App<br/>React Native] --> CDN
        C[CSC Kiosk<br/>Web Interface] --> CDN
    end

    subgraph "🚀 Edge Layer"
        CDN --> LB[Load Balancer<br/>Nginx/ALB]
        LB --> WAF[Web Application Firewall]
    end

    subgraph "⚙️ Application Layer"
        direction TB
        API[API Gateway<br/>Express.js]
        
        subgraph "🎯 Microservices"
            Auth[Auth Service]
            User[User Service]
            Scheme[Scheme Service]
            AppSvc[Application Service]
            DocSvc[Document Service]
            Notify[Notification Service]
            Search[Search Service]
            Admin[Admin Service]
        end
        
        API --> Auth
        API --> User
        API --> Scheme
        API --> AppSvc
        API --> DocSvc
        API --> Notify
        API --> Search
        API --> Admin
    end

    subgraph "🧠 AI Layer"
        direction TB
        RecSys[Recommendation Engine<br/>Python/FastAPI]
        NLP[NLP Service<br/>Rasa]
        OCR[Document OCR<br/>Google Vision]
        Voice[Voice Service<br/>Speech-to-Text]
        
        RecSys --> MLflow[MLflow<br/>Model Registry]
        NLP --> MLflow
    end

    subgraph "💾 Data Layer"
        direction TB
        Mongo[(MongoDB Atlas)]
        Redis[(Redis Cache)]
        ES[(Elasticsearch)]
        S3[(Object Storage<br/>S3/Cloud Storage)]
        
        Mongo --> Backup[Automated Backup]
        Redis --> Monitor[Redis Insight]
    end

    subgraph "📤 Integration Layer"
        Email[Email Service<br/>Nodemailer]
        SMS[SMS Gateway]
        Govt[Government APIs]
        DigiLocker[DigiLocker API]
    end

    %% Connections
    AppSvc --> Mongo
    AppSvc --> Redis
    Scheme --> ES
    Search --> ES
    DocSvc --> S3
    DocSvc --> OCR
    Auth --> Mongo
    Notify --> Email
    Notify --> SMS
    User --> Mongo
    RecSys --> Mongo
    RecSys --> Redis
    API --> Govt
    API --> DigiLocker

    classDef client fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef edge fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef app fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px;
    classDef ai fill:#f3e5f5,stroke:#4a148c,stroke-width:2px;
    classDef data fill:#ffebee,stroke:#b71c1c,stroke-width:2px;
    classDef integration fill:#e0f2f1,stroke:#004d40,stroke-width:2px;

    class A,B,C client;
    class CDN,LB,WAF edge;
    class API,Auth,User,Scheme,AppSvc,DocSvc,Notify,Search,Admin app;
    class RecSys,NLP,OCR,Voice,MLflow ai;
    class Mongo,Redis,ES,S3,Backup,Monitor data;
    class Email,SMS,Govt,DigiLocker integration;
1.2 Technology Stack
mindmap
  root((Saarthi AI<br/>Tech Stack))
    
    🎨 Frontend
      React 18.x
      Vite 4.x
      React Router 6.x
      TailwindCSS
      Framer Motion
      React Query
      Zustand
      i18next
      React Hook Form
      Zod
    
    ⚙️ Backend
      Node.js 18.x
      Express 4.x
      MongoDB 6.x
      Mongoose 7.x
      JWT
      bcrypt
      Multer
      Nodemailer
      Redis
      Bull Queue
    
    🧠 AI/ML
      TensorFlow.js
      Python FastAPI
      Rasa Chatbot
      Google Vision OCR
      Google Speech API
      Elasticsearch
      MLflow
    
    ☁️ Infrastructure
      AWS/GCP/Azure
      Docker
      Kubernetes
      GitHub Actions
      Terraform
      Prometheus
      Grafana
      ELK Stack
1.3 Architecture Principles
markdown
┌─────────────────────────────────────────────────────────────────────────────┐
│                          🎯 ARCHITECTURE PRINCIPLES                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔷 **Scalability First**                                                   │
│  • Horizontal scaling with Kubernetes                                      │
│  • Stateless services for easy replication                                 │
│  • Database sharding ready for growth                                      │
│                                                                             │
│  🔷 **API-First Design**                                                    │
│  • RESTful APIs with OpenAPI 3.0 specification                             │
│  • Versioned APIs (/v1, /v2) for backward compatibility                    │
│  • GraphQL gateway for complex queries                                     │
│                                                                             │
│  🔷 **Security by Design**                                                  │
│  • Zero-trust architecture                                                  │
│  • Defense in depth (WAF, rate limiting, encryption)                       │
│  • Regular security audits and penetration testing                         │
│                                                                             │
│  🔷 **AI-Native Architecture**                                              │
│  • ML models as microservices                                              │
│  • Feature store for real-time predictions                                 │
│  • A/B testing framework for model comparisons                             │
│                                                                             │
│  🔷 **Resilience & Reliability**                                            │
│  • Circuit breakers for external dependencies                              │
│  • Graceful degradation under load                                         │
│  • Automated failover and disaster recovery                                │
│                                                                             │
│  🔷 **Observability**                                                       │
│  • Distributed tracing (OpenTelemetry)                                     │
│  • Structured logging (JSON)                                               │
│  • Real-time metrics and alerts                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
2. Frontend Design
2.1 Component Architecture
graph TD
    subgraph "📱 Pages"
        Home[Home Page]
        Dashboard[Dashboard]
        Schemes[Schemes Page]
        Applications[Applications Page]
        Documents[Document Vault]
        Settings[Settings Page]
        Verify[Verify Document]
    end

    subgraph "🧩 Components"
        Layout[Layout Components]
        UI[UI Components]
        Forms[Form Components]
        Modals[Modal Components]
        Cards[Card Components]
        Charts[Chart Components]
    end

    subgraph "🔄 State Management"
        Store[Zustand Store]
        Query[React Query]
        Local[Local Storage]
    end

    subgraph "🔧 Services"
        API[API Service]
        Auth[Auth Service]
        Document[Document Service]
        Scheme[Scheme Service]
        AI[AI Service]
    end

    subgraph "🎨 Styles"
        Global[Global Styles]
        Themes[Theme System]
        Utils[Utility Classes]
    end

    Home --> Layout
    Home --> Cards
    Dashboard --> Charts
    Dashboard --> Cards
    Schemes --> Forms
    Schemes --> Cards
    Applications --> Modals
    Documents --> Modals
    Settings --> Forms
    
    Cards --> UI
    Forms --> UI
    Modals --> UI
    Charts --> UI
    
    UI --> Store
    UI --> Query
    Store --> Local
    
    Query --> API
    API --> Auth
    API --> Document
    API --> Scheme
    API --> AI

    classDef pages fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
    classDef components fill:#c8e6c9,stroke:#388e3c,stroke-width:2px;
    classDef state fill:#fff9c4,stroke:#fbc02d,stroke-width:2px;
    classDef services fill:#ffccbc,stroke:#f4511e,stroke-width:2px;
    classDef styles fill:#e1bee7,stroke:#8e24aa,stroke-width:2px;

    class Home,Dashboard,Schemes,Applications,Documents,Settings,Verify pages;
    class Layout,UI,Forms,Modals,Cards,Charts components;
    class Store,Query,Local state;
    class API,Auth,Document,Scheme,AI services;
    class Global,Themes,Utils styles;
2.2 State Management
javascript
// 📁 store/userStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '@/services/api';

const useUserStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Profile data
      profile: {
        personal: {},
        professional: {},
        documents: [],
        preferences: {}
      },
      
      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(credentials);
          if (response.success) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false
            });
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
      
      logout: () => {
        authAPI.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },
      
      updateProfile: async (profileData) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.updateProfile(profileData);
          if (response.success) {
            set((state) => ({
              user: { ...state.user, ...response.user },
              profile: { ...state.profile, ...profileData },
              isLoading: false
            }));
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
      
      // Selectors
      getFullName: () => {
        const user = get().user;
        return user ? `${user.firstName} ${user.lastName}` : '';
      },
      
      getEligibilityScore: () => {
        const profile = get().profile;
        // Calculate score based on profile completion
        let score = 0;
        const required = ['name', 'dob', 'gender', 'occupation', 'income'];
        required.forEach(field => {
          if (profile.personal[field]) score += 20;
        });
        return score;
      }
    }),
    {
      name: 'saarthi-user-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useUserStore;
javascript
// 📁 store/schemeStore.js
import { create } from 'zustand';
import { schemeAPI } from '@/services/api';

const useSchemeStore = create((set, get) => ({
  // State
  schemes: [],
  recommendedSchemes: [],
  selectedScheme: null,
  filters: {
    category: 'all',
    state: 'all',
    minMatchScore: 0,
    searchTerm: ''
  },
  isLoading: false,
  error: null,
  
  // Actions
  fetchSchemes: async () => {
    set({ isLoading: true });
    try {
      const response = await schemeAPI.getAllSchemes();
      set({
        schemes: response.data,
        isLoading: false
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  getRecommendations: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await schemeAPI.getRecommendations(userId);
      set({
        recommendedSchemes: response.data,
        isLoading: false
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    }));
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { schemes, filters } = get();
    let filtered = [...schemes];
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(s => s.category === filters.category);
    }
    
    if (filters.state !== 'all') {
      filtered = filtered.filter(s => s.state === filters.state);
    }
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term)
      );
    }
    
    filtered = filtered.filter(s => s.matchScore >= filters.minMatchScore);
    
    set({ filteredSchemes: filtered });
  },
  
  // Selectors
  getCategories: () => {
    const schemes = get().schemes;
    const categories = new Set(schemes.map(s => s.category));
    return ['all', ...Array.from(categories)];
  },
  
  getStates: () => {
    const schemes = get().schemes;
    const states = new Set(schemes.map(s => s.state).filter(Boolean));
    return ['all', ...Array.from(states)];
  }
}));

export default useSchemeStore;
2.3 Routing Structure
javascript
// 📁 App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Schemes = lazy(() => import('./pages/Schemes'));
const SchemeDetails = lazy(() => import('./pages/SchemeDetails'));
const Applications = lazy(() => import('./pages/Applications'));
const ApplicationDetails = lazy(() => import('./pages/ApplicationDetails'));
const DocumentVault = lazy(() => import('./pages/DocumentVault'));
const Settings = lazy(() => import('./pages/Settings'));
const VerifyDocument = lazy(() => import('./pages/VerifyDocument'));
const Profile = lazy(() => import('./pages/Profile'));
const CompareSchemes = lazy(() => import('./pages/CompareSchemes'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Public Verification Routes */}
            <Route path="/verify-document" element={<VerifyDocument />} />
            <Route path="/verify-failed" element={<VerifyDocument />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/schemes" element={
              <ProtectedRoute>
                <Schemes />
              </ProtectedRoute>
            } />
            
            <Route path="/schemes/:id" element={
              <ProtectedRoute>
                <SchemeDetails />
              </ProtectedRoute>
            } />
            
            <Route path="/compare" element={
              <ProtectedRoute>
                <CompareSchemes />
              </ProtectedRoute>
            } />
            
            <Route path="/applications" element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            } />
            
            <Route path="/applications/:id" element={
              <ProtectedRoute>
                <ApplicationDetails />
              </ProtectedRoute>
            } />
            
            <Route path="/documents" element={
              <ProtectedRoute>
                <DocumentVault />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-assistant" element={
              <ProtectedRoute>
                <AIAssistant />
              </ProtectedRoute>
            } />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
2.4 UI/UX Design System
css
/* 📁 styles/design-system.css */

:root {
  /* 🎨 Color Palette */
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-200: #c7d2fe;
  --primary-300: #a5b4fc;
  --primary-400: #818cf8;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  --primary-800: #3730a3;
  --primary-900: #312e81;
  
  --secondary-50: #f0fdf4;
  --secondary-500: #22c55e;
  --secondary-600: #16a34a;
  
  --accent-50: #fff7ed;
  --accent-500: #f97316;
  --accent-600: #ea580c;
  
  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-200: #e5e7eb;
  --neutral-300: #d1d5db;
  --neutral-400: #9ca3af;
  --neutral-500: #6b7280;
  --neutral-600: #4b5563;
  --neutral-700: #374151;
  --neutral-800: #1f2937;
  --neutral-900: #111827;
  
  --success-50: #f0fdf4;
  --success-500: #22c55e;
  --success-600: #16a34a;
  
  --warning-50: #fefce8;
  --warning-500: #eab308;
  --warning-600: #ca8a04;
  
  --error-50: #fef2f2;
  --error-500: #ef4444;
  --error-600: #dc2626;
  
  --info-50: #eff6ff;
  --info-500: #3b82f6;
  --info-600: #2563eb;

  /* 📏 Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* 🔤 Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-serif: 'Merriweather', Georgia, serif;
  --font-mono: 'Fira Code', monospace;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2;

  /* 🎭 Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  --shadow-primary: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
  --shadow-secondary: 0 10px 15px -3px rgba(34, 197, 94, 0.3);
  --shadow-accent: 0 10px 15px -3px rgba(249, 115, 22, 0.3);

  /* 🎯 Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;

  /* 🌀 Animations */
  --transition-fast: 150ms;
  --transition-base: 250ms;
  --transition-slow: 350ms;
  
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* 📱 Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* 🌓 Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --neutral-50: #111827;
    --neutral-100: #1f2937;
    --neutral-200: #374151;
    --neutral-300: #4b5563;
    --neutral-400: #6b7280;
    --neutral-500: #9ca3af;
    --neutral-600: #d1d5db;
    --neutral-700: #e5e7eb;
    --neutral-800: #f3f4f6;
    --neutral-900: #f9fafb;
  }
}

/* 📝 Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--line-height-normal);
  color: var(--neutral-900);
  background-color: var(--neutral-50);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 🎯 Component Classes */
.card {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-base) var(--ease-out);
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-700), var(--primary-800));
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary);
}

.btn-secondary {
  background: var(--secondary-500);
  color: white;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary-600);
  color: var(--primary-600);
}

.btn-outline:hover {
  background: var(--primary-50);
  transform: translateY(-2px);
}

.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  transition: all var(--transition-base) var(--ease-out);
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
}

.input-error {
  border-color: var(--error-500);
}

.input-error:focus {
  box-shadow: 0 0 0 3px var(--error-100);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.badge-success {
  background: var(--success-50);
  color: var(--success-600);
}

.badge-warning {
  background: var(--warning-50);
  color: var(--warning-600);
}

.badge-error {
  background: var(--error-50);
  color: var(--error-600);
}

.badge-info {
  background: var(--info-50);
  color: var(--info-600);
}

/* 🎨 Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.fade-in {
  animation: fadeIn var(--transition-slow) var(--ease-out);
}

.slide-in {
  animation: slideIn var(--transition-slow) var(--ease-out);
}

.spin {
  animation: spin 1s linear infinite;
}

.pulse {
  animation: pulse 2s var(--ease-in-out) infinite;
}

/* 📱 Responsive Utilities */
.hidden {
  display: none;
}

@media (min-width: 640px) {
  .sm\:block { display: block; }
  .sm\:flex { display: flex; }
  .sm\:hidden { display: none; }
}

@media (min-width: 768px) {
  .md\:block { display: block; }
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
}

@media (min-width: 1024px) {
  .lg\:block { display: block; }
  .lg\:flex { display: flex; }
  .lg\:hidden { display: none; }
}

/* ♿ Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
3. Backend Design
3.1 API Architecture
javascript
// 📁 server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: './.env' });

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const schemeRoutes = require('./routes/schemes');
const applicationRoutes = require('./routes/applications');
const documentRoutes = require('./routes/documents');
const aiRoutes = require('./routes/ai');
const adminRoutes = require('./routes/admin');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');
const { cacheMiddleware } = require('./middleware/cache');

const app = express();

// ============================================
// 🛡️ SECURITY MIDDLEWARE
// ============================================

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  exposedHeaders: ['x-auth-token'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// ============================================
// 📦 REQUEST PARSING & LOGGING
// ============================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// Logging
app.use(morgan('combined', { stream: logger.stream }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1d',
  immutable: true
}));

// ============================================
// 🗄️ DATABASE CONNECTION
// ============================================

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100,
  minPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
  console.log(`📊 Database: ${mongoose.connection.name}`);
  console.log(`📍 Host: ${mongoose.connection.host}`);
  
  // Create indexes
  require('./utils/createIndexes')().catch(console.error);
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('❌ MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// ============================================
# ... (continues with routes, error handling, etc.)