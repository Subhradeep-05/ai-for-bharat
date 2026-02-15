# Saarthi AI - Government Scheme Assistant
## Comprehensive Design Document

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2024 | Saarthi AI Team | Initial Design Specification |

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Web App (React)  │  Mobile App (React Native)  │  Voice IVR    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  Load Balancer (Nginx)  │  Rate Limiter  │  API Gateway         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Auth Service  │  User Service  │  Scheme Service  │  AI Service │
│  Application   │  Document      │  Notification    │  Search     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  MongoDB  │  Redis Cache  │  S3 Storage  │  Elasticsearch       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
├─────────────────────────────────────────────────────────────────┤
│  DigiLocker  │  Aadhaar API  │  SMS Gateway  │  Email Service   │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Component Architecture

#### Frontend Architecture (React)
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Buttons, Cards, Modals
│   ├── forms/          # Form components
│   ├── layout/         # Header, Footer, Sidebar
│   └── scheme/         # Scheme-specific components
├── pages/              # Page components
│   ├── Home/
│   ├── Profile/
│   ├── Schemes/
│   ├── Applications/
│   └── Dashboard/
├── services/           # API service layer
├── hooks/              # Custom React hooks
├── store/              # State management (Zustand)
├── utils/              # Helper functions
├── constants/          # Constants and configs
├── i18n/               # Internationalization
└── styles/             # Global styles
```

#### Backend Architecture (Node.js/Express)
```
backend/
├── controllers/        # Request handlers
├── models/            # Database models
├── routes/            # API routes
├── middleware/        # Custom middleware
├── services/          # Business logic
├── utils/             # Helper functions
├── config/            # Configuration files
├── validators/        # Input validation
└── tests/             # Test files
```

---

## 2. Database Design

### 2.1 MongoDB Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  phone: String (unique, indexed),
  password: String (hashed),
  personalInfo: {
    name: String,
    dob: Date,
    gender: String,
    category: String,
    disability: {
      hasDisability: Boolean,
      type: String,
      percentage: Number
    }
  },
  address: {
    street: String,
    city: String,
    district: String,
    state: String (indexed),
    pincode: String (indexed)
  },
  professionalInfo: {
    occupation: String (indexed),
    annualIncome: Number (indexed),
    employmentType: String
  },
  familyInfo: {
    familySize: Number,
    members: Array
  },
  documents: [ObjectId],
  preferences: {
    language: String,
    theme: String,
    notifications: Object
  },
  metadata: {
    createdAt: Date,
    updatedAt: Date,
    lastLogin: Date,
    verified: Boolean,
    profileCompletion: Number
  }
}
```

#### Schemes Collection
```javascript
{
  _id: ObjectId,
  schemeId: String (unique, indexed),
  schemeName: Object (multilingual),
  ministry: {
    name: String,
    department: String
  },
  category: [String] (indexed),
  level: String (indexed), // Central/State
  state: String (indexed),
  description: Object (multilingual),
  benefits: [{
    type: String,
    amount: Number,
    frequency: String
  }],
  eligibility: {
    ageRange: { min: Number, max: Number },
    incomeLimit: Number,
    occupation: [String],
    gender: [String],
    category: [String],
    specificConditions: [String]
  },
  documents: [{
    name: String,
    type: String,
    mandatory: Boolean
  }],
  applicationProcess: {
    mode: [String],
    steps: Array,
    timeline: {
      start: Date,
      end: Date
    },
    fees: Number
  },
  statistics: {
    views: Number,
    applications: Number,
    successRate: Number
  },
  metadata: {
    lastUpdated: Date,
    tags: [String] (indexed)
  }
}
```

#### Applications Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  schemeId: ObjectId (indexed),
  applicationData: {
    formData: Object,
    documents: [ObjectId],
    submittedAt: Date
  },
  status: String (indexed), // Draft, Submitted, Under Review, Approved, Rejected
  timeline: [{
    status: String,
    timestamp: Date,
    remarks: String
  }],
  eligibilityScore: Number,
  rejectionReason: String,
  metadata: {
    createdAt: Date,
    updatedAt: Date,
    ipAddress: String,
    userAgent: String
  }
}
```

#### Documents Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  documentType: String (indexed),
  fileName: String,
  fileUrl: String,
  fileSize: Number,
  mimeType: String,
  extractedData: {
    documentNumber: String,
    issueDate: Date,
    expiryDate: Date,
    ocrText: String
  },
  verification: {
    verified: Boolean,
    verifiedAt: Date,
    verificationMethod: String
  },
  metadata: {
    uploadedAt: Date,
    lastAccessed: Date
  }
}
```

### 2.2 Database Indexes

```javascript
// Users Collection
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ phone: 1 }, { unique: true })
db.users.createIndex({ "address.state": 1 })
db.users.createIndex({ "professionalInfo.occupation": 1 })
db.users.createIndex({ "metadata.createdAt": -1 })

// Schemes Collection
db.schemes.createIndex({ schemeId: 1 }, { unique: true })
db.schemes.createIndex({ category: 1 })
db.schemes.createIndex({ level: 1, state: 1 })
db.schemes.createIndex({ "metadata.tags": 1 })
db.schemes.createIndex({ "statistics.views": -1 })

// Applications Collection
db.applications.createIndex({ userId: 1, schemeId: 1 })
db.applications.createIndex({ status: 1 })
db.applications.createIndex({ "metadata.createdAt": -1 })

// Documents Collection
db.documents.createIndex({ userId: 1 })
db.documents.createIndex({ documentType: 1 })
```

---

## 3. API Design

### 3.1 RESTful API Endpoints

#### Authentication APIs
```
POST   /api/v1/auth/register          - User registration
POST   /api/v1/auth/login             - User login
POST   /api/v1/auth/verify-otp        - OTP verification
POST   /api/v1/auth/refresh-token     - Refresh JWT token
POST   /api/v1/auth/forgot-password   - Password reset request
POST   /api/v1/auth/reset-password    - Reset password
POST   /api/v1/auth/logout            - User logout
```

#### User Profile APIs
```
GET    /api/v1/users/profile          - Get user profile
PUT    /api/v1/users/profile          - Update user profile
PATCH  /api/v1/users/profile/photo    - Update profile photo
GET    /api/v1/users/completion       - Get profile completion score
DELETE /api/v1/users/account          - Delete user account
```

#### Scheme APIs
```
GET    /api/v1/schemes                - List all schemes (with pagination)
GET    /api/v1/schemes/:id            - Get scheme details
GET    /api/v1/schemes/search         - Search schemes
GET    /api/v1/schemes/recommended    - Get AI recommendations
GET    /api/v1/schemes/trending       - Get trending schemes
GET    /api/v1/schemes/categories     - Get scheme categories
POST   /api/v1/schemes/:id/view       - Track scheme view
```

#### Eligibility APIs
```
POST   /api/v1/eligibility/check      - Check eligibility for a scheme
POST   /api/v1/eligibility/bulk       - Bulk eligibility check
GET    /api/v1/eligibility/score/:id  - Get eligibility score
```

#### Application APIs
```
GET    /api/v1/applications           - List user applications
POST   /api/v1/applications           - Create new application
GET    /api/v1/applications/:id       - Get application details
PUT    /api/v1/applications/:id       - Update application
DELETE /api/v1/applications/:id       - Delete draft application
POST   /api/v1/applications/:id/submit - Submit application
GET    /api/v1/applications/:id/status - Get application status
```

#### Document APIs
```
GET    /api/v1/documents              - List user documents
POST   /api/v1/documents/upload       - Upload document
GET    /api/v1/documents/:id          - Get document details
DELETE /api/v1/documents/:id          - Delete document
POST   /api/v1/documents/:id/verify   - Verify document
```

#### AI & Search APIs
```
POST   /api/v1/ai/chat                - Chat with AI assistant
POST   /api/v1/ai/voice               - Voice input processing
GET    /api/v1/search                 - Full-text search
POST   /api/v1/search/voice           - Voice search
```

#### Notification APIs
```
GET    /api/v1/notifications          - Get user notifications
PUT    /api/v1/notifications/:id/read - Mark as read
PUT    /api/v1/notifications/settings - Update notification preferences
```

### 3.2 API Response Format

#### Success Response
```javascript
{
  success: true,
  data: {
    // Response data
  },
  message: "Operation successful",
  timestamp: "2024-01-15T10:30:00Z"
}
```

#### Error Response
```javascript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human-readable error message",
    details: {}
  },
  timestamp: "2024-01-15T10:30:00Z"
}
```

#### Pagination Response
```javascript
{
  success: true,
  data: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 150,
    totalPages: 8,
    hasNext: true,
    hasPrev: false
  }
}
```

---

## 4. User Interface Design

### 4.1 Design System

#### Color Palette
```css
/* Primary Colors */
--primary-blue: #1E40AF;      /* Main brand color */
--primary-blue-light: #3B82F6;
--primary-blue-dark: #1E3A8A;

/* Secondary Colors */
--secondary-green: #059669;    /* Success states */
--secondary-orange: #F59E0B;   /* Warnings */
--secondary-red: #DC2626;      /* Errors */

/* Neutral Colors */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-500: #6B7280;
--gray-700: #374151;
--gray-900: #111827;

/* Background Colors */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-dark: #1F2937;

/* Text Colors */
--text-primary: #111827;
--text-secondary: #6B7280;
--text-light: #9CA3AF;
```

#### Typography
```css
/* Font Family */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-hindi: 'Noto Sans Devanagari', sans-serif;
--font-tamil: 'Noto Sans Tamil', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

#### Spacing System
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

#### Border Radius
```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;  /* Fully rounded */
```

#### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### 4.2 Component Library

#### Button Component
```jsx
// Primary Button
<button className="btn btn-primary">
  Apply Now
</button>

// CSS
.btn {
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary-blue);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-blue-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

#### Card Component
```jsx
<div className="card">
  <div className="card-header">
    <h3>Scheme Name</h3>
  </div>
  <div className="card-body">
    <p>Scheme description...</p>
  </div>
  <div className="card-footer">
    <button>View Details</button>
  </div>
</div>

// CSS
.card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.card-header {
  padding: var(--space-4);
  border-bottom: 1px solid var(--gray-200);
}

.card-body {
  padding: var(--space-4);
}

.card-footer {
  padding: var(--space-4);
  background: var(--gray-50);
}
```

### 4.3 Page Layouts

#### Home Page Wireframe
```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo | Search | Language | Profile             │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Hero Section:                                           │
│  "Find Government Schemes Made for You"                  │
│  [Search Bar with Voice Input]                          │
│                                                           │
├─────────────────────────────────────────────────────────┤
│  Recommended Schemes (AI-Powered)                        │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐               │
│  │Scheme│  │Scheme│  │Scheme│  │Scheme│               │
│  │Card 1│  │Card 2│  │Card 3│  │Card 4│               │
│  └──────┘  └──────┘  └──────┘  └──────┘               │
├─────────────────────────────────────────────────────────┤
│  Browse by Category                                      │
│  [Agriculture] [Education] [Health] [Pension]           │
├─────────────────────────────────────────────────────────┤
│  Trending Schemes                                        │
│  Statistics | Success Stories                           │
├─────────────────────────────────────────────────────────┤
│  Footer: Links | Contact | Social Media                 │
└─────────────────────────────────────────────────────────┘
```

#### Scheme Details Page
```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Schemes > Scheme Name               │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌──────────────────────────┐ │
│  │                     │  │  Eligibility Score       │ │
│  │  Scheme Image       │  │  ████████░░ 85%          │ │
│  │                     │  │                          │ │
│  └─────────────────────┘  │  [Check Eligibility]     │ │
│                            │  [Apply Now]             │ │
│  Scheme Name               └──────────────────────────┘ │
│  Ministry | Category                                    │
├─────────────────────────────────────────────────────────┤
│  Tabs: [Overview] [Benefits] [Eligibility] [Documents] │
│                                                          │
│  Tab Content Area                                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Similar Schemes                                        │
│  AI Chat Assistant (Bottom Right)                      │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Security Architecture

### 5.1 Authentication Flow

```
User Login Flow:
1. User enters email/phone + password
2. Backend validates credentials
3. If valid, generate JWT access token (15 min) + refresh token (30 days)
4. Store refresh token in httpOnly cookie
5. Return access token to client
6. Client stores access token in memory (not localStorage)
7. Include access token in Authorization header for API calls
8. On token expiry, use refresh token to get new access token
```

### 5.2 Authorization Levels

```javascript
// Role-Based Access Control
const roles = {
  USER: ['read:own', 'write:own'],
  ADMIN: ['read:all', 'write:all', 'delete:all'],
  VERIFIER: ['read:all', 'verify:documents'],
  CSC_OPERATOR: ['read:all', 'write:assisted']
}
```

### 5.3 Data Encryption

```javascript
// Encryption Strategy
- Passwords: bcrypt with 10 salt rounds
- Sensitive data (Aadhaar, PAN): AES-256-GCM
- Data in transit: TLS 1.3
- Database: MongoDB encryption at rest
- File storage: S3 server-side encryption
```

---

## 6. AI/ML Architecture

### 6.1 Recommendation Engine

```python
# Hybrid Recommendation System

class SchemeRecommender:
    def __init__(self):
        self.content_based_model = ContentBasedFilter()
        self.collaborative_model = CollaborativeFilter()
        self.weights = {'content': 0.6, 'collaborative': 0.4}
    
    def recommend(self, user_profile):
        # Content-based: Match user profile with scheme criteria
        content_scores = self.content_based_model.score(user_profile)
        
        # Collaborative: Find similar users and their applications
        collab_scores = self.collaborative_model.score(user_profile)
        
        # Hybrid scoring
        final_scores = (
            self.weights['content'] * content_scores +
            self.weights['collaborative'] * collab_scores
        )
        
        return self.rank_schemes(final_scores)
```

### 6.2 Eligibility Prediction

```python
# Machine Learning Model for Eligibility

Features:
- User demographics (age, gender, category)
- Economic indicators (income, assets)
- Geographic data (state, district, rural/urban)
- Family composition
- Employment status
- Document availability

Model: Random Forest Classifier
Training: Historical application outcomes
Output: Probability score (0-100%)
```

### 6.3 Document OCR Pipeline

```python
# Document Processing Pipeline

1. Image Preprocessing
   - Resize and normalize
   - Noise reduction
   - Contrast enhancement

2. Document Classification
   - CNN model to identify document type
   - Confidence score threshold: 90%

3. Text Extraction (OCR)
   - Tesseract for English
   - Google Vision API for multilingual

4. Data Validation
   - Regex patterns for document numbers
   - Checksum validation (Aadhaar, PAN)
   - Date format validation

5. Storage
   - Encrypted storage in S3
   - Metadata in MongoDB
```

---

## 7. Performance Optimization

### 7.1 Frontend Optimization

```javascript
// Code Splitting
const SchemeDetails = lazy(() => import('./pages/SchemeDetails'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

// Image Optimization
- Use WebP format with fallback
- Lazy loading for images
- Responsive images with srcset
- CDN delivery

// Caching Strategy
- Service Worker for offline support
- Cache API responses with React Query
- LocalStorage for user preferences
```

### 7.2 Backend Optimization

```javascript
// Database Query Optimization
- Use indexes on frequently queried fields
- Implement pagination (limit 20 per page)
- Use projection to fetch only required fields
- Aggregate pipelines for complex queries

// Caching with Redis
- Cache scheme data (TTL: 1 hour)
- Cache user sessions
- Cache search results (TTL: 15 minutes)
- Rate limiting counters

// API Response Compression
app.use(compression())
```

### 7.3 CDN Strategy

```
Static Assets Distribution:
- Images: CloudFront CDN
- CSS/JS bundles: CDN with versioning
- Scheme documents: CDN with signed URLs
- Cache-Control headers for optimal caching
```

---

## 8. Monitoring & Analytics

### 8.1 Application Monitoring

```javascript
// Metrics to Track
- API response times (p50, p95, p99)
- Error rates by endpoint
- Database query performance
- Memory and CPU usage
- Active user sessions
- Request rate per minute

// Tools
- Prometheus for metrics collection
- Grafana for visualization
- New Relic for APM
- Sentry for error tracking
```

### 8.2 User Analytics

```javascript
// Events to Track
- Page views
- Scheme searches
- Scheme views
- Application starts
- Application submissions
- Document uploads
- AI chat interactions
- Feature usage

// Tools
- Google Analytics 4
- Mixpanel for user behavior
- Hotjar for heatmaps
```

---

## 9. Deployment Architecture

### 9.1 Infrastructure

```
Production Environment:
- Cloud Provider: AWS/GCP
- Compute: Kubernetes cluster (3 nodes minimum)
- Database: MongoDB Atlas (M30 cluster)
- Cache: Redis (ElastiCache)
- Storage: S3 buckets
- CDN: CloudFront
- Load Balancer: Application Load Balancer
```

### 9.2 CI/CD Pipeline

```yaml
# GitHub Actions Workflow

name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    - Run unit tests
    - Run integration tests
    - Code coverage check
  
  build:
    - Build Docker images
    - Push to container registry
  
  deploy:
    - Deploy to Kubernetes
    - Run smoke tests
    - Monitor deployment
```

---

## 10. Testing Strategy

### 10.1 Testing Pyramid

```
                    ┌──────────┐
                    │   E2E    │  (10%)
                    └──────────┘
                ┌────────────────┐
                │  Integration   │  (30%)
                └────────────────┘
            ┌────────────────────────┐
            │     Unit Tests         │  (60%)
            └────────────────────────┘
```

### 10.2 Test Coverage Goals

```javascript
// Coverage Targets
- Unit Tests: 80% code coverage
- Integration Tests: Critical user flows
- E2E Tests: Happy paths for key features
- Performance Tests: Load testing for 10K concurrent users
- Security Tests: OWASP Top 10 vulnerabilities
```

---

## 11. Accessibility Design

### 11.1 WCAG 2.1 AA Compliance

```javascript
// Accessibility Features
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratio ≥ 4.5:1
- Focus indicators
- Skip navigation links
- Alt text for images
- Captions for videos
- Resizable text (up to 200%)
```

---

## 12. Internationalization (i18n)

### 12.1 Language Support

```javascript
// Supported Languages
const languages = {
  en: 'English',
  hi: 'हिंदी (Hindi)',
  ta: 'தமிழ் (Tamil)',
  te: 'తెలుగు (Telugu)',
  bn: 'বাংলা (Bengali)',
  mr: 'मराठी (Marathi)',
  gu: 'ગુજરાતી (Gujarati)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)'
}

// Implementation with i18next
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations }
    },
    lng: 'en',
    fallbackLng: 'en'
  })
```

---

## 13. Error Handling Strategy

### 13.1 Error Types & Responses

```javascript
// Error Codes
const ErrorCodes = {
  // Authentication Errors (1xxx)
  INVALID_CREDENTIALS: 1001,
  TOKEN_EXPIRED: 1002,
  UNAUTHORIZED: 1003,
  
  // Validation Errors (2xxx)
  INVALID_INPUT: 2001,
  MISSING_REQUIRED_FIELD: 2002,
  
  // Business Logic Errors (3xxx)
  SCHEME_NOT_FOUND: 3001,
  NOT_ELIGIBLE: 3002,
  APPLICATION_ALREADY_EXISTS: 3003,
  
  // System Errors (5xxx)
  DATABASE_ERROR: 5001,
  EXTERNAL_API_ERROR: 5002,
  FILE_UPLOAD_ERROR: 5003
}
```

---

## 14. Future Enhancements

### Phase 2 Features
- Mobile app (React Native)
- Blockchain for document verification
- Advanced analytics dashboard
- Government portal integration
- Offline-first architecture

### Phase 3 Features
- Voice-only interface for feature phones
- WhatsApp bot integration
- Regional language voice assistants
- Predictive scheme alerts
- Community forums

---

## 15. Glossary

| Term | Definition |
|------|------------|
| JWT | JSON Web Token - Secure authentication token |
| OCR | Optical Character Recognition |
| CDN | Content Delivery Network |
| API | Application Programming Interface |
| WCAG | Web Content Accessibility Guidelines |
| i18n | Internationalization |
| CI/CD | Continuous Integration/Continuous Deployment |
| APM | Application Performance Monitoring |
| TTL | Time To Live (cache duration) |
