# Saarthi AI - Government Scheme Assistant
## Comprehensive Requirements Specification

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2024 | Saarthi AI Team | Initial Requirements Specification |

---

## 1. Executive Summary

### 1.1 Project Vision
Saarthi AI aims to democratize access to government schemes by providing an intelligent, multilingual platform that bridges the gap between citizens and welfare programs. The platform leverages artificial intelligence to provide personalized scheme recommendations, assist with applications, and guide users through the entire process in their preferred language.

### 1.2 Project Goals
- **Accessibility**: Make 1000+ government schemes accessible to every Indian citizen
- **Personalization**: Deliver tailored scheme recommendations with 95% accuracy
- **Simplification**: Reduce application complexity through guided workflows
- **Transparency**: Provide real-time application tracking and status updates
- **Inclusivity**: Support 8+ Indian languages with voice-enabled assistance

### 1.3 Success Metrics
| Metric | Target |
|--------|--------|
| User Adoption | 100,000+ active users in Year 1 |
| Scheme Discovery | 80% of eligible users find relevant schemes |
| Application Success Rate | 60% increase in successful applications |
| User Satisfaction | 4.5+ star rating on app stores |
| Response Time | AI assistant resolves 70% queries instantly |

---

## 2. Stakeholder Analysis

### 2.1 Primary Stakeholders
| Stakeholder | Needs | Expectations |
|-------------|-------|--------------|
| Citizens | Easy access to scheme information | Simple, intuitive interface |
| Farmers | Agriculture scheme discovery | Voice support in regional languages |
| Students | Scholarship information | Real-time application tracking |
| Women | Women-centric scheme details | Privacy and security |
| Senior Citizens | Pension scheme assistance | Large text, simple navigation |
| SC/ST Communities | Caste-based scheme eligibility | Accurate eligibility checking |

### 2.2 Secondary Stakeholders
| Stakeholder | Role | Requirements |
|-------------|------|--------------|
| Government Officials | Scheme verification | Admin dashboard for verification |
| CSC Centers | Application assistance | Offline mode support |
| NGOs | Community outreach | Bulk application support |
| Developers | System maintenance | Comprehensive API documentation |

---

## 3. Functional Requirements

### 3.1 User Journey Modules

#### Module 1: Onboarding & Authentication (AUTH)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| AUTH-01 | Multi-step registration with progressive profiling | High | As a new user, I want to register quickly with minimal information |
| AUTH-02 | Email + OTP verification | High | As a user, I want to verify my identity securely |
| AUTH-03 | Mobile number verification via SMS OTP | Medium | As a rural user, I want to verify using my mobile |
| AUTH-04 | Social login (Google, Facebook) | Low | As a tech-savvy user, I want to login with existing accounts |
| AUTH-05 | Biometric login support (fingerprint/face) | Low | As a mobile user, I want quick biometric access |
| AUTH-06 | Session management across devices | Medium | As a user, I want to see where I'm logged in |
| AUTH-07 | Remember me functionality | Medium | As a frequent user, I don't want to login every time |
| AUTH-08 | Password-less login via magic link | Low | As a user, I prefer not to remember passwords |

#### Module 2: Profile Management (PROF)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| PROF-01 | Comprehensive profile with 20+ fields | High | As a user, I want to provide all eligibility-related information |
| PROF-02 | Smart profile completion suggestions | High | As a user, I want guidance on what information to add |
| PROF-03 | Document upload for profile verification | High | As a user, I want to upload identity proofs |
| PROF-04 | Automatic profile completion score | High | As a user, I want to know how complete my profile is |
| PROF-05 | Profile version history | Low | As a user, I want to track profile changes |
| PROF-06 | Multiple family member profiles | Medium | As a family head, I want to manage applications for family |
| PROF-07 | Profile export (PDF/JSON) | Medium | As a user, I want to download my profile data |
| PROF-08 | Profile sharing with CSC centers | Low | As a user, I want to share my profile with assistance centers |

#### Module 3: Scheme Discovery & Recommendation (AI-REC)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| AI-REC-01 | AI-powered scheme matching algorithm | High | As a user, I want schemes tailored to my profile |
| AI-REC-02 | Real-time eligibility score calculation | High | As a user, I want to see my match percentage |
| AI-REC-03 | Multi-factor matching (age, income, location, category) | High | As a user, I want accurate eligibility checking |
| AI-REC-04 | Collaborative filtering recommendations | Medium | As a user, I want to see what similar users applied for |
| AI-REC-05 | Trending schemes based on regional popularity | Medium | As a user, I want to see popular schemes in my area |
| AI-REC-06 | Seasonal scheme alerts (e.g., crop insurance seasons) | Medium | As a farmer, I want timely scheme notifications |
| AI-REC-07 | New scheme notifications based on profile | High | As a user, I want alerts when new relevant schemes launch |
| AI-REC-08 | Scheme deadline reminders | High | As a user, I don't want to miss application deadlines |
| AI-REC-09 | Similar scheme suggestions | Medium | As a user, I want alternatives if I'm ineligible |
| AI-REC-10 | Scheme popularity score | Low | As a user, I want to see how many people applied |

#### Module 4: Intelligent Search & Filtering (SEARCH)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| SEARCH-01 | Natural language search (e.g., "schemes for farmers in UP") | High | As a user, I want to search like I speak |
| SEARCH-02 | Voice search in 8 Indian languages | High | As a rural user, I want to speak my queries |
| SEARCH-03 | Semantic search with intent recognition | High | As a user, I want relevant results even with vague queries |
| SEARCH-04 | Multi-category filtering (state, ministry, benefit type) | High | As a user, I want to narrow down schemes |
| SEARCH-05 | Search by document type (e.g., "schemes requiring Aadhaar") | Medium | As a user, I want schemes matching documents I have |
| SEARCH-06 | Search history with intelligent suggestions | Medium | As a user, I want quick access to past searches |
| SEARCH-07 | Search result ranking by match score | High | As a user, I want the best matches first |
| SEARCH-08 | Saved searches and alerts | Low | As a user, I want to save complex searches |

#### Module 5: AI-Powered Eligibility Checker (ELIG)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| ELIG-01 | Dynamic eligibility questionnaire | High | As a user, I want to answer questions to check eligibility |
| ELIG-02 | Conditional logic for complex criteria | High | As a system, I need to handle nested eligibility rules |
| ELIG-03 | Real-time eligibility updates on profile change | High | As a user, I want instant feedback when I update my profile |
| ELIG-04 | Partial eligibility indication with improvement suggestions | High | As a user, I want to know how to become eligible |
| ELIG-05 | Eligibility certificate generation | Medium | As a user, I want a document proving my eligibility |
| ELIG-06 | Historical eligibility tracking | Low | As a user, I want to see how my eligibility changed over time |
| ELIG-07 | Bulk eligibility check for multiple schemes | Medium | As a power user, I want to check many schemes at once |
| ELIG-08 | Eligibility comparison across similar schemes | Medium | As a user, I want to compare which schemes I'm most eligible for |

#### Module 6: Smart Application Assistant (APPLY)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| APPLY-01 | AI-guided application wizard | High | As a user, I want step-by-step application guidance |
| APPLY-02 | Auto-fill from profile and documents | High | As a user, I don't want to re-enter information |
| APPLY-03 | Document requirement checker | High | As a user, I want to know what documents I need |
| APPLY-04 | Application form preview | Medium | As a user, I want to review before submitting |
| APPLY-05 | Draft save and resume | Medium | As a user, I want to complete applications over time |
| APPLY-06 | Application similarity detection | Low | As a system, I should detect duplicate applications |
| APPLY-07 | Offline application support with sync | Low | As a rural user, I want to apply without internet |
| APPLY-08 | Application cost estimator | Medium | As a user, I want to know any fees involved |

#### Module 7: Document Intelligence (DOC)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| DOC-01 | AI-powered document classification | High | As a system, I should auto-categorize uploaded documents |
| DOC-02 | OCR for text extraction from documents | High | As a system, I should extract and validate document numbers |
| DOC-03 | Document validity checker (expiry detection) | High | As a user, I want alerts when documents expire |
| DOC-04 | Document quality assessment | Medium | As a system, I should reject poor quality uploads |
| DOC-05 | Document template matching | Medium | As a system, I should verify if document matches expected format |
| DOC-06 | Smart document naming and tagging | Medium | As a user, I want auto-generated document names |
| DOC-07 | Document version control | Low | As a user, I want to maintain document history |
| DOC-08 | Document encryption and secure storage | High | As a system, I must protect sensitive documents |

#### Module 8: AI Chat Assistant (CHAT)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| CHAT-01 | Multi-lingual conversational AI | High | As a user, I want to chat in my language |
| CHAT-02 | Context-aware responses based on user profile | High | As a user, I want personalized answers |
| CHAT-03 | Voice-to-text and text-to-voice in 8 languages | High | As a user, I want to speak and hear responses |
| CHAT-04 | Intent recognition for common queries | High | As a system, I should understand user intent |
| CHAT-05 | FAQ auto-response with 90% accuracy | High | As a user, I want instant answers to common questions |
| CHAT-06 | Handoff to human support | Medium | As a user, I want to talk to a real person when needed |
| CHAT-07 | Chat history with search | Medium | As a user, I want to refer to past conversations |
| CHAT-08 | Proactive assistance based on user behavior | Medium | As a system, I should offer help when users seem stuck |
| CHAT-09 | Scheme-specific chatbots | Low | As a user, I want detailed info on specific schemes |
| CHAT-10 | Sentiment analysis for user feedback | Medium | As a system, I should detect user frustration |

#### Module 9: Application Tracking (TRACK)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| TRACK-01 | Real-time status updates | High | As a user, I want to know where my application stands |
| TRACK-02 | Timeline view with milestones | High | As a user, I want to see the complete journey |
| TRACK-03 | Estimated processing time | Medium | As a user, I want to know when to expect a decision |
| TRACK-04 | Status change notifications | High | As a user, I want alerts when status changes |
| TRACK-05 | Rejection reason with improvement suggestions | High | As a user, I want to know why I was rejected |
| TRACK-06 | Appeal/re-application guidance | Medium | As a user, I want help with next steps after rejection |
| TRACK-07 | Application analytics dashboard | Low | As an admin, I want to see application trends |
| TRACK-08 | Bulk status check for multiple applications | Medium | As a power user, I want to check all applications at once |

#### Module 10: Smart Notifications (NOTIFY)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| NOTIFY-01 | Multi-channel notifications (email, SMS, push) | High | As a user, I want notifications on my preferred channel |
| NOTIFY-02 | Personalized notification content | High | As a user, I want relevant notifications |
| NOTIFY-03 | Smart timing (avoiding notification fatigue) | Medium | As a system, I should not overwhelm users |
| NOTIFY-04 | Action-oriented notifications | High | As a user, I want to act on notifications |
| NOTIFY-05 | Notification preferences per category | Medium | As a user, I want to control what I'm notified about |
| NOTIFY-06 | Notification history | Low | As a user, I want to see past notifications |
| NOTIFY-07 | Urgent notification priority | Medium | As a system, urgent alerts should stand out |
| NOTIFY-08 | Notification analytics (open rates, click-through) | Low | As an admin, I want to measure notification effectiveness |

#### Module 11: Analytics & Insights (ANALYTICS)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| ANALYTICS-01 | Personal analytics dashboard | Medium | As a user, I want to see my activity summary |
| ANALYTICS-02 | Scheme usage statistics | Low | As a user, I want to see popular schemes |
| ANALYTICS-03 | Eligibility trends over time | Low | As a user, I want to see how my eligibility changed |
| ANALYTICS-04 | Application success rate by scheme | Low | As a user, I want to know my chances |
| ANALYTICS-05 | Document usage statistics | Low | As a user, I want to see which documents I use most |
| ANALYTICS-06 | AI recommendation accuracy feedback | Medium | As a system, I should learn from user feedback |
| ANALYTICS-07 | User journey heatmaps | Low | As an admin, I want to understand user behavior |
| ANALYTICS-08 | Conversion funnel analysis | Low | As an admin, I want to optimize user journeys |

#### Module 12: Settings & Personalization (SETTINGS)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| SETTINGS-01 | Multi-language UI (8 Indian languages) | High | As a user, I want the interface in my language |
| SETTINGS-02 | Theme customization (light/dark/system) | Medium | As a user, I want visual comfort |
| SETTINGS-03 | Font size adjustment | Medium | As a senior citizen, I want larger text |
| SETTINGS-04 | Voice preferences (gender, speed, pitch) | Medium | As a user, I want voice settings |
| SETTINGS-05 | Privacy controls (data sharing, visibility) | High | As a user, I control my data |
| SETTINGS-06 | Notification channel preferences | Medium | As a user, I choose how to be notified |
| SETTINGS-07 | Session management | Medium | As a user, I want to see active sessions |
| SETTINGS-08 | Data export (PDF/JSON/CSV) | Medium | As a user, I want my data portable |
| SETTINGS-09 | Account deletion with data purge | High | As a user, I have the right to be forgotten |

---

## 4. AI & Machine Learning Features

### 4.1 Core AI Capabilities

| Feature | Technology | Description | Accuracy Target |
|---------|------------|-------------|-----------------|
| Scheme Matching | Collaborative Filtering + Content-Based | Hybrid recommendation engine | 92% |
| Natural Language Search | NLP with BERT-based model | Understand user intent in queries | 88% |
| Voice Recognition | Google Speech-to-Text API | Multi-lingual voice input | 95% |
| Document OCR | Tesseract + Custom Models | Extract text from uploaded documents | 85% |
| Chatbot | Rasa/Dialogflow | Conversational AI assistant | 90% intent recognition |
| Sentiment Analysis | Custom NLP model | Detect user frustration | 80% |
| Predictive Eligibility | Machine Learning classifier | Predict approval chances | 75% |
| Document Classification | CNN for images, NLP for text | Auto-categorize documents | 92% |

### 4.2 Machine Learning Models

#### Model 1: Scheme Recommendation Engine
```python
# Conceptual Model Architecture
- Input: User profile (age, income, location, occupation, category)
- Features: 25+ demographic and socio-economic features
- Algorithm: XGBoost + Collaborative Filtering
- Output: Top 10 schemes with match scores
- Training Data: 50,000+ user interactions
- Retraining: Weekly with new user data
```

#### Model 2: Eligibility Predictor
```python
# Conceptual Model Architecture
- Input: User profile + Scheme criteria
- Features: Eligibility rules encoded as features
- Algorithm: Random Forest Classifier
- Output: Eligibility probability (0-100%)
- Training Data: Historical application outcomes
- Retraining: Monthly with new application data
```

#### Model 3: Document Classifier
```python
# Conceptual Model Architecture
- Input: Document image/PDF
- Features: Visual features + text extracted via OCR
- Algorithm: CNN + LSTM hybrid
- Output: Document type (Aadhaar, PAN, etc.)
- Training Data: 10,000+ labeled documents
- Retraining: Quarterly with new document types
```

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

| Metric | Target | Conditions |
|--------|--------|------------|
| Page Load Time | < 2 seconds | 4G connection |
| API Response Time | < 300ms | 95th percentile |
| Search Results Time | < 1 second | 1M+ scheme database |
| File Upload Time | < 3 seconds | 1MB file, 4G |
| Concurrent Users | 10,000+ | Horizontal scaling |
| Database Query Time | < 100ms | Indexed queries |
| AI Inference Time | < 200ms | Per recommendation |
| System Uptime | 99.9% | Monthly average |
| Peak Load Handling | 1000 req/sec | Auto-scaling enabled |
| Mobile Data Usage | < 5MB per session | Optimized assets |

### 5.2 Security Requirements

| Category | Requirement | Implementation |
|----------|-------------|----------------|
| Authentication | Multi-factor support | JWT + OTP |
| Authorization | Role-based access control | Admin, User roles |
| Data Encryption | At rest and in transit | AES-256, TLS 1.3 |
| Password Security | Hashing with salt | bcrypt (10 rounds) |
| Session Management | Token expiration | 30 days, refresh tokens |
| API Security | Rate limiting | 100 req/min per IP |
| File Upload Security | Validation | File type, size, virus scan |
| XSS Protection | Input sanitization | DOMPurify |
| CSRF Protection | Anti-CSRF tokens | Double submit pattern |
| SQL Injection | Parameterized queries | Mongoose protection |
| Audit Logging | All critical actions | User ID, timestamp, action |
| Data Privacy | GDPR/IT Act compliance | User consent, data export |

### 5.3 Scalability Requirements

| Aspect | Current | 1-Year Target | 3-Year Target |
|--------|---------|---------------|---------------|
| Users | 10,000 | 100,000 | 1,000,000 |
| Schemes | 200 | 500 | 1,500 |
| Applications | 50,000 | 500,000 | 5,000,000 |
| Documents | 100,000 | 1,000,000 | 10,000,000 |
| API Calls/day | 100,000 | 1,000,000 | 10,000,000 |
| Database Size | 10GB | 100GB | 1TB |
| Server Instances | 2 | 10 | 50 |

### 5.4 Reliability Requirements

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| System Availability | 99.9% | Uptime monitoring |
| Data Backup | Daily + Real-time | Automated backups |
| Disaster Recovery | < 4 hours | RTO |
| Data Loss | < 5 minutes | RPO |
| Error Rate | < 1% of requests | Log monitoring |
| Failed Transactions | < 0.1% | Transaction logging |
| API Error Rate | < 0.5% | API monitoring |

### 5.5 Usability Requirements

| Requirement | Target | Validation |
|-------------|--------|------------|
| Mobile Responsiveness | All screens | Test on 50+ devices |
| Browser Support | Chrome, Firefox, Safari, Edge | Cross-browser testing |
| Internet Dependency | Offline mode for critical features | Service workers |
| Learning Curve | < 5 minutes to first application | User testing |
| Error Messages | User-friendly with solutions | Heuristic evaluation |
| Help Availability | Context-sensitive help | User testing |
| Accessibility | WCAG 2.1 AA | Automated + manual testing |
| Language Support | 8 Indian languages | Native speaker review |
| Text Size | Adjustable (small, medium, large) | User preference |
| Color Contrast | WCAG compliant | Automated testing |

---

## 6. Technical Requirements

### 6.1 Frontend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| React | 18.x | UI Library | Component reusability, large ecosystem |
| Vite | 4.x | Build tool | Fast development, optimized builds |
| React Router | 6.x | Routing | Nested routes, protected routes |
| Axios | 1.x | HTTP client | Interceptors, request/response handling |
| React Icons | 4.x | Icons | Extensive icon library |
| jsPDF | 2.x | PDF generation | Client-side PDF creation |
| React Query | 4.x | Data fetching | Caching, background updates |
| Zustand | 4.x | State management | Lightweight alternative to Redux |
| Tailwind CSS | 3.x | Styling | Utility-first, responsive design |
| Framer Motion | 10.x | Animations | Smooth UI transitions |
| i18next | 22.x | Internationalization | Multi-language support |
| React Hook Form | 7.x | Forms | Performance, validation |
| Zod | 3.x | Schema validation | Type-safe validation |

### 6.2 Backend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| Node.js | 18.x LTS | Runtime | JavaScript everywhere, async I/O |
| Express | 4.x | Web framework | Minimal, flexible, middleware support |
| MongoDB | 6.x | Database | Schema-less, scalability, JSON documents |
| Mongoose | 7.x | ODM | Schema validation, middleware |
| JWT | 9.x | Authentication | Stateless, secure |
| bcrypt | 5.x | Password hashing | Industry standard |
| Multer | 1.x | File uploads | Multi-part form handling |
| UUID | 9.x | Unique IDs | Random, collision-resistant |
| Nodemailer | 6.x | Email | SMTP support, templates |
| Winston | 3.x | Logging | Structured logging, transports |
| Joi | 17.x | Validation | Schema validation |
| Helmet | 7.x | Security | HTTP headers security |
| Compression | 1.x | Performance | Gzip compression |
| Redis | 7.x | Caching | Session store, rate limiting |
| Bull | 4.x | Queue | Background jobs, email queue |

---

## 7. Integration Requirements

### 7.1 External APIs

| API | Purpose | Data Exchange | Frequency |
|-----|---------|---------------|-----------|
| India Post API | Address validation | User address | Real-time |
| DigiLocker | Document verification | Document access | User consent |
| UIDAI Aadhaar | Aadhaar verification | Aadhaar number | With consent |
| NSDL PAN | PAN verification | PAN number | With consent |
| Government Portals | Scheme data | Scheme updates | Daily |
| CSC Connect | CSC center locator | Location data | Real-time |
| Google Maps | CSC locations | Geocoding | Real-time |
| SMS Gateway | OTP delivery | Phone number | Real-time |
| Payment Gateway | Application fees | Transaction | When applicable |

---

## 8. Compliance & Legal Requirements

### 8.1 Regulatory Compliance

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| IT Act 2000 | Data protection | Encryption, access controls |
| GDPR | User consent, right to be forgotten | Consent management, account deletion |
| PDP Bill (India) | Data localization | Data stored in India |
| Accessibility Guidelines | WCAG 2.1 | Screen reader support, keyboard nav |
| Aadhaar Act | Aadhaar data protection | Limited storage, masked display |
| Income Tax Act | PAN validation | Format validation only |

### 8.2 Data Retention Policy

| Data Type | Retention Period | Deletion Method |
|-----------|------------------|-----------------|
| User Profiles | Until account deletion | Soft delete then purge |
| Applications | 7 years (legal requirement) | Archive then delete |
| Documents | 7 years or account deletion | Secure deletion |
| Logs | 1 year | Automated rotation |
| Chat History | 6 months | Anonymization |
| Analytics Data | 2 years | Aggregation |

---

## 9. Future Roadmap

### Phase 1 (Q2 2024) - MVP Launch
- User authentication
- Basic profile management
- Scheme listing and search
- Simple eligibility checker
- Application submission
- Basic document upload
- 50 Central schemes

### Phase 2 (Q3 2024) - AI Integration
- AI-powered scheme recommendations
- Multi-language support (5 languages)
- Voice search
- Document OCR
- Smart notifications
- 200+ schemes

### Phase 3 (Q4 2024) - Advanced Features
- AI chatbot assistant
- Predictive eligibility
- Offline mode
- CSC integration
- 500+ schemes
- Mobile app launch

### Phase 4 (Q1 2025) - Scale & Optimize
- 1000+ schemes
- Blockchain for document verification
- Advanced analytics dashboard
- Government API integration
- 1M+ user milestone

---

## 10. Glossary

| Term | Definition |
|------|------------|
| BPL | Below Poverty Line - Income threshold for poverty line |
| SC/ST | Scheduled Caste/Scheduled Tribe - Constitutionally recognized groups |
| OBC | Other Backward Class - Socially and educationally disadvantaged |
| CSC | Common Service Centre - Digital access points in rural India |
| DigiLocker | Government cloud storage for documents |
| UIDAI | Unique Identification Authority of India - Aadhaar issuer |
| NSDL | National Securities Depository Limited - PAN card issuer |
| OCR | Optical Character Recognition - Text extraction from images |
| NLP | Natural Language Processing - AI understanding of human language |
| RTO | Recovery Time Objective - Maximum acceptable downtime |
| RPO | Recovery Point Objective - Maximum acceptable data loss |
| WCAG | Web Content Accessibility Guidelines - Accessibility standards |
| JWT | JSON Web Token - Secure token for authentication |
| OTP | One-Time Password - Temporary authentication code |
| 2FA | Two-Factor Authentication - Additional security layer |
