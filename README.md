# AI Survey Generator

## 📌 Introduction

**AI Survey Generator** is a Next.js application that allows users to input a title and generate five AI-driven questions of various types, such as:

- Multiple-choice questions
- Short or long paragraph responses
- Dropdown options
- Image uploads

Users can then submit their responses, which are securely stored in a **MongoDB Atlas** database.

---

## 🚀 Quick Start Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/emrankamil/survey_generator_ai
cd survey_generator_ai
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the project root and add the following values:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<mongo-atlas-database>"
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_URL="http://localhost:3000"
GEMINI_API_KEY=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

> **To get a Gemini API Key:**
>
> - Go to [Google AI Studio](https://aistudio.google.com/prompts/new_chat)
> - Click the **top-right corner** to generate an API key
> - Paste it into `GEMINI_API_KEY` in your `.env.local` file

### 4️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 5️⃣ Run the Application

```bash
npm run dev
```

### 6️⃣ Open in Browser

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

- **Frontend & Backend:** [Next.js 15.2.3](https://nextjs.org/)
- **AI API:** [Gemini 2.0 Flash](https://ai.google.dev/)
- **Database & ORM:** MongoDB Atlas with [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js (Auth.js)](https://authjs.dev/) with Google OAuth
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Dark Mode:** [Next Themes](https://www.npmjs.com/package/next-themes)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

## 🔧 Project Structure

📂 **Backend:**

- API endpoints for **survey generation** and **response submission**
- **Security & error handling** to ensure proper responses and fallback methods
- **Clean Architecture:**
  - Controllers → `/app/api`
  - Services → `/utils`
  - Entities & Repositories → `/prisma`

📂 **Frontend:**

- **Tailwind CSS** for styling
- **Dark Mode** using Next-Themes
- **Google OAuth authentication** via NextAuth.js
- **Framer Motion** for smooth animations

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/a76c02fc-c82d-4cc1-a3d4-343d56a1d175)
![image](https://github.com/user-attachments/assets/ecddf46a-b26c-4a68-8c01-313fa60e800f)
![image](https://github.com/user-attachments/assets/81c7e8ed-d9aa-4586-a457-ed9234268dec)
![image](https://github.com/user-attachments/assets/ae5318b3-c670-40db-8038-9c6bdb36a738)


---

## 🛡️ Security & Best Practices

- **Secure API endpoints** with input validation and proper error handling
- **Dependency Injection** for better modularity and maintainability
- **Strict TypeScript usage** (if applicable)

---
