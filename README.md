🔗 ZapLink – Modern URL Shortener with QR Codes & Analytics
Full-Stack Web Application | React (Vite) • Supabase • TailwindCSS • Shadcn UI
Live Demo: [https://url-shortener-xi-mauve.vercel.app/] | GitHub: [https://github.com/anjalikumari2207/URL-Shortener]

💡 Overview
ZapLink is a fully responsive, full-stack URL shortener application that allows users to shorten long URLs with custom slugs, generate branded QR codes, and view advanced analytics—all within a sleek, minimal dashboard.

🔨 Tech Stack
Frontend: React (Vite), TailwindCSS, Shadcn UI, react-qrcode-logo

Backend & Database: Supabase (Database, Auth, Storage)

Dev Tools & Libraries: sanitize-html, Yup, ESLint, Prettier

🚀 Features
🔐 User Authentication using Supabase Auth (Email/Magic Link)

🌐 URL Shortening with optional custom slugs

📸 QR Code Generation with logo and Supabase Storage integration

📊 Link Analytics including click tracking, location stats, and timestamps

✅ Validation & Security with Yup schemas and sanitize-html for XSS prevention

🧼 Clean, minimal, and responsive UI built with TailwindCSS and Shadcn components

☁️ Hosted QR images in Supabase Storage

🧹 User-scoped data access using Supabase RLS (Row-Level Security)

🗑 Full link management: delete and view stats

🗂️ Folder Structure Highlights

src/
├── components/        # Reusable UI Components
├── pages/             # Main Routes (Home, Dashboard, etc.)
├── db/                # Supabase interaction logic
├── hooks/             # Custom React Hooks
├── lib/               # Form validation & sanitization
├── context/           # User authentication context
└── App.jsx            # Root component

⚙️ Setup Instructions
Clone repository & install dependencies

git clone https://github.com/your-username/zaplink.git
cd zaplink
npm install
Configure environment variables
Create a .env file:
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-anon-key
Start development server
npm run dev
Visit: http://localhost:5173

🧱 Supabase Setup Checklist
Table: urls → (id, title, original_url, custom_url, short_url, user_id, qr)

Bucket: qrs for QR image storage

Auth: Enable Supabase email/password or magic link login

Security: Enable Row-Level Security (RLS) with appropriate policies

📌 Future Roadmap
📈 Advanced link analytics with graphs

🔒 Rate-limiting and abuse detection

🔐 Password-protected or expiring links

🌍 Multi-language interface

🧪 Unit & Integration Testing

🧠 Key Learnings
Working with serverless backends and real-time databases (Supabase)

QR Code generation with branding support

Form security best practices with input sanitization and validation

Implementing user-specific data access via Supabase RLS policies

🙌 Credits
Supabase – Auth, DB, and Storage

Shadcn UI – Headless accessible components

react-qrcode-logo – QR code generation

sanitize-html & yup – Input security and validation
