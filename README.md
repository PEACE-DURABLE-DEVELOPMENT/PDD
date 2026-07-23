# PDD (Peace & Durable Development) - Handover Documentation

Welcome to the official repository and developer handover documentation for the **Peace & Durable Development (PDD)** web application. 

This platform is a modern, high-performance, and bilingual website built to showcase PDD's mission, impact programs, publications, announcements, and blog posts. It features a fully custom localization system, dynamic integrations with Airtable for content management, and forms powered by Nodemailer for email delivery.

---

## 🛠️ Technology Stack

The project is built on a modern, robust, and optimized stack:

*   **Core Framework:** [Next.js 16 (App Router)](https://nextjs.org) with React 19 and [TypeScript](https://www.typescriptlang.org)
*   **Styling & UI:** 
    *   [Tailwind CSS v4](https://tailwindcss.com) for layout and typography
    *   [PostCSS](https://postcss.org) for styling optimizations
    *   [Framer Motion](https://www.framer.com/motion/) for premium, fluid animations and smooth transitions
    *   [Lucide React](https://lucide.dev) for high-quality SVG vector icons
*   **Database & CMS:** [Airtable API](https://airtable.com) (serves as the dynamic headless CMS for blog posts, news announcements, and PDF publications)
*   **Media Hosting:** [Cloudinary](https://cloudinary.com) for optimized, responsive images
*   **Authentication:** [NextAuth.js](https://next-auth.js.org) (configured for future administrative authentication)
*   **Email Engine:** [Nodemailer](https://nodemailer.com) (configured to route contact submissions securely through Gmail SMTP)

---

## 🔑 Account Directory & Service Credentials

To facilitate a seamless handover, the login details for all platforms and services connected to the PDD website are listed below.

> [!WARNING]
> Keep these credentials secure. Do not share them publicly or expose them in client-side code files.

| Service | Purpose | Login / Email Address | Password / Key |
| :--- | :--- | :--- | :--- |
| **GitHub** | Code Repository Hosting | `peaceanddurablepdd@gmail.com` | `PeacePDD@1` |
| **Airtable** | Headless CMS (3 Workspaces) | `peaceanddurablepdd@gmail.com` | `PeacePDD@1` |
| **Vercel** | Production Deployment & Hosting | `peaceanddurablepdd@gmail.com` | `PeacePDD@1` |
| **Megabit** | Domain Registrar (`pddrwanda.org`) | `peace.durable.development@gmail.com` | `Ingenzi@123#` |
| **Lark Mail** | Professional Email Workspace | `peaceanddurablepdd@gmail.com` | `PeacePDD@1` |
| **Gmail SMTP** | Nodemailer Contact Form Sender | `peaceanddurablepdd@gmail.com` | `iblf afym cerv rams` *(App Password)* |

---

## 🗄️ Airtable Workspace Structure (3 Bases)

The website utilizes three distinct workspaces/bases in Airtable to pull dynamic content, avoiding local content duplication and allowing non-technical editors to update content instantly:

1.  **Blog Base**
    *   **Base ID:** `appe2yGAGduotoFYY`
    *   **Primary Table ID:** `tblGXpWXRydeFanLz`
    *   **Responsible Module:** [blogAirtable.ts](file:///c:/Users/user/pdd/src/lib/blogAirtable.ts)
    *   **Content:** Manages blog titles, descriptions, categories (English/French), slugs, dates, authors, and cover image URLs.
2.  **Announcements Base**
    *   **Base ID:** `appBhJl6lyugYCT8K`
    *   **Primary Table ID:** `tblM5MUvpjyDhqVsx`
    *   **Responsible Module:** [announcementAirtable.ts](file:///c:/Users/user/pdd/src/lib/announcementAirtable.ts)
    *   **Content:** Dynamic announcements, urgent community notifications, and event updates.
3.  **Publications Base**
    *   **Base ID:** `appKBCDCZoBbfx103`
    *   **Primary Table ID:** `tblBbNPr8nHeKncsy` (Table `pdf`)
    *   **Responsible Module:** [publicationsAirtable.ts](file:///c:/Users/user/pdd/src/lib/publicationsAirtable.ts)
    *   **Content:** Document registries, research papers, reports, and downloadable PDF file links.

---

## ⚙️ Environment Variables (`.env.local`)

To run the application locally or deploy it to Vercel, copy `.env.local.example` into a new file called `.env.local` and ensure the values are configured:

```bash
# Airtable API Keys & Base Configurations
AIRTABLE_API_KEY="patqQPzIY7WhNiB7h.af915415..."          # Key for Blog Base
AIRTABLE_BASE_ID="appe2yGAGduotoFYY"                     # Blog Base ID
AIRTABLE_BLOG_TABLE_NAME="tblGXpWXRydeFanLz"             # Blog Table Name

# Announcement Airtable Configuration
ANNOUNCEMENT_AIRTABLE_TOKEN="patvJayB2RTPNGF6Q.a433d..." # Token for Announcements
ANNOUNCEMENT_AIRTABLE_BASE_ID="appBhJl6lyugYCT8K"        # Announcement Base ID
ANNOUNCEMENT_AIRTABLE_TABLE="tblM5MUvpjyDhqVsx"          # Announcement Table Name

# Publications Airtable Configuration
PUBLICATIONS_AIRTABLE_TOKEN="patDTz0FhliFJybqR.3ce1d..." # Token for Publications
PUBLICATIONS_AIRTABLE_BASE_ID="appKBCDCZoBbfx103"        # Publications Base ID
PUBLICATIONS_AIRTABLE_TABLE="tblBbNPr8nHeKncsy"          # Publications Table Name

# Nodemailer Contact Form Configuration
GMAIL_USER="peaceanddurablepdd@gmail.com"
GMAIL_PASS="iblf afym cerv rams"                         # App Password for Gmail
CONTACT_RECEIVER_EMAIL="peaceanddurablepdd@gmail.com"

# Cloudinary Media Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
```

For a template of these environment variables, see [.env.local.example](file:///c:/Users/user/pdd/.env.local.example).

---

## 🚀 Getting Started

### 1. Installation
Clone the repository, go into the directory, and install dependencies:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build & Production Deployment
To generate a production-ready optimized build:
```bash
npm run build
```
To run the production build locally:
```bash
npm run start
```

For production hosting, the repository is linked to **Vercel** under the account `peaceanddurablepdd@gmail.com`. Push changes to the main branch on GitHub to trigger automatic production builds and deployments.

---

## 🌍 Translation & Bilingual Localization

The application fully supports English (`en`) and French (`fr`) versions. 

*   **Context Provider:** Managed by [LanguageContext.tsx](file:///c:/Users/user/pdd/src/lib/LanguageContext.tsx). It reads and updates a `"lang"` cookie to persist the user's language choice.
*   **Static Text Translations:** All UI strings (headers, buttons, forms, nav links) are mapped in [translations.ts](file:///c:/Users/user/pdd/src/lib/translations.ts).
*   **Dynamic CMS Translations:** Blog posts and announcements pulled from Airtable include localized fields (e.g., French content and English content) which are filtered dynamically based on the current language context.

---

## 📂 Project Structure

A quick guide to the primary project directories:

*   [`src/app/`](file:///c:/Users/user/pdd/src/app) - Pages, layout configurations, routing structure, and API routes.
*   [`src/components/`](file:///c:/Users/user/pdd/src/components) - Reusable UI widgets and layout modules (e.g. Navigation, Footer, Blog Feeds, etc.).
*   [`src/lib/`](file:///c:/Users/user/pdd/src/lib) - Utility functions, Airtable connections, and translations.
*   [`public/`](file:///c:/Users/user/pdd/public) - Static assets (logos, fallback images, etc.).
