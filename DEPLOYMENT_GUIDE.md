# ECO PILLARS HUB — PRODUCTION DEPLOYMENT GUIDE (PHASE 15)

## Overview & Architecture

**ECO PILLARS HUB** is an AI-Powered Sustainable Campus Resource Intelligence & Anomaly Detection Platform built using React, Vite, TailwindCSS, Firebase Cloud Functions, Firestore, Firebase Storage, Firebase Auth, and the Gemini API.

### Production Topology Diagram
```
             GitHub (Source Code & CI/CD)
                │
                ↓
             Vercel (Production React Web Application)
                │
        ┌───────┴─────────────────┐
        ↓                         ↓
  Firebase Client           Cloud Functions (HTTPS Callables)
 (Auth, Firestore,                │
  Storage Bucket)                 ↓
                            Gemini 1.5 Pro API (AI Eco Advisor)
```

---

## 1. Prerequisites

- **Node.js**: `v18.x` or `v20.x`
- **npm**: `v9.x` or `v10.x`
- **Vercel Account**: Linked to your GitHub repository
- **Firebase Project**: Created in [Firebase Console](https://console.firebase.google.com/)
- **Google Cloud / Gemini API Key**: Activated in Google AI Studio or GCP Cloud Console

---

## 2. Step-by-Step Deployment Procedure

### Step A: Firebase Backend Initialization
1. **Firebase Authentication**:
   - Go to Firebase Console -> Authentication -> Get Started.
   - Enable **Email/Password** and **Google Auth**.

2. **Firestore Database**:
   - Create Database in production mode.
   - Deploy security rules:
     ```bash
     firebase deploy --only firestore:rules
     ```

3. **Firebase Storage**:
   - Enable Storage bucket.
   - Deploy security rules:
     ```bash
     firebase deploy --only storage
     ```

4. **Firebase Cloud Functions**:
   - Navigate to `functions/` directory:
     ```bash
     cd functions
     npm install
     npm run build
     ```
   - Set Gemini API Secret in Cloud Functions configuration:
     ```bash
     firebase functions:secrets:set GEMINI_API_KEY
     ```
   - Deploy functions:
     ```bash
     firebase deploy --only functions
     ```

---

### Step B: Frontend Build Verification
Before deploying to Vercel, verify local production compilation cleanly:

```bash
# 1. Type Check & Vite Bundle Compilation
npm run build

# Expected Output:
# ✓ 2500+ modules transformed.
# dist/index.html
# dist/assets/...
```

---

### Step C: Vercel Production Deployment
1. **Connect GitHub Repository**:
   - Push repository to GitHub.
   - Import repository into Vercel Dashboard (`New Project`).
   - Framework Preset: `Vite`.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.

2. **Configure Environment Variables in Vercel**:
   Add the following variables under `Project Settings` -> `Environment Variables`:

   | Variable Name | Description | Example / Location |
   |---|---|---|
   | `VITE_FIREBASE_API_KEY` | Firebase Client API Key | Firebase Console Web App Config |
   | `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `eco-pillars-hub.firebaseapp.com` |
   | `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `eco-pillars-hub` |
   | `VITE_FIREBASE_STORAGE_BUCKET` | Storage Bucket Domain | `eco-pillars-hub.appspot.com` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID | `123456789012` |
   | `VITE_FIREBASE_APP_ID` | Web App ID | `1:123456789012:web:...` |
   | `VITE_FIREBASE_FUNCTIONS_URL` | Cloud Functions Endpoint | `https://us-central1-eco-pillars-hub.cloudfunctions.net` |

   > **CRITICAL SECURITY NOTE**: Never prefix `GEMINI_API_KEY` or Service Account keys with `VITE_`. Those secrets remain strictly server-side inside Firebase Cloud Functions.

3. **Deploy**:
   - Click **Deploy**. Vercel will trigger a production build using `vercel.json` SPA routing.

---

## 3. Production Verification Checklist

| Module | Verification Step | Status |
|---|---|---|
| **Authentication** | Test Admin login & role switching (ADMIN, ANALYST, VIEWER). | Verified |
| **Excel Upload** | Upload Department XLSX files, verify client-side parsing & Cloud Function processing. | Verified |
| **Firebase Storage** | Verify spreadsheet file stored in Storage bucket with RBAC protection. | Verified |
| **Firestore** | Verify normalized monthly metrics & aggregations written to Firestore. | Verified |
| **Cloud Functions** | Verify HTTPS callable functions (`processElectricityData`, `calculateMonthlyWater`, etc.). | Verified |
| **Dashboard** | Verify Executive BI cards, YoY variances & cost per student metrics load dynamically. | Verified |
| **Charts** | Verify Recharts rendering across Electricity, Water, Wi-Fi, Food, Finance, Environment. | Verified |
| **Historical Analysis** | Verify 3-year historical comparison charts & baseline minimum/maximum ranges. | Verified |
| **Anomaly Engine** | Verify multi-signal deterministic anomaly score calculation & signal breakdown. | Verified |
| **Admin Alerts** | Verify Alert management system, acknowledge/resolve actions, and severity filters. | Verified |
| **AI Eco Advisor** | Verify evidence-based explanations citing pre-calculated metrics without hallucinating. | Verified |
| **Data Quality System** | Verify 9-point quality checks and historical data sufficiency enforcement. | Verified |
| **Security Hardening** | Verify 0 API key exposure in browser DOM & RBAC enforcement across 3 roles. | Verified |

---

## 4. Multi-Device Responsive Testing

The platform has been verified across viewports:
- **Desktop (1920x1080 / 1440x900)**: Full sidebar navigation, multi-column KPI grids, and side-by-side Recharts views.
- **Tablet (768x1024 / iPad Viewport)**: Responsive sidebar toggle overlay, stacked 2-column KPI grids.
- **Mobile (375x667 / iPhone Viewport)**: Mobile header toggle, single-column stacked cards, scrollable data tables.
