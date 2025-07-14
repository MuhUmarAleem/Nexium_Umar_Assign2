# 📝 Blog Summarizer (AI + Urdu/English Translation)

This project is a **Next.js 14 full-stack web app** that lets users input a blog URL, then:
- Scrapes the blog content,
- Generates a summarized version using the **Groq AI API**,
- Translates to **Urdu** if the user chooses,
- Saves the summary to **Supabase**,
- Saves the full scraped blog text to **MongoDB**.

---

## 🌐 Live Preview
**Coming soon (deployed on Vercel)**

---

## 🧑‍💻 Technologies Used

- **Next.js 14 (App Router)**
- **Groq AI API** (LLaMA 4 model)
- **MongoDB Atlas** (for full blog text)
- **Supabase** (for storing summaries)
- **Cheerio + extractus** (for blog content scraping)
- **ShadCN UI** (for clean frontend design)

---

## 📆 7-Day Development Plan

### 🗓️ Day 1 – Project Setup
- [x] Initialize Next.js 14 app with App Router
- [x] Set up Tailwind + ShadCN UI
- [x] Create main layout & landing UI components
- [x] Design minimal user interface

### 🗓️ Day 2 – Blog Scraping
- [x] Install `@extractus/article-extractor` for content scraping
- [x] Create `/api/process` route
- [x] Extract main blog content using the URL
- [x] Clean HTML and prepare plain text

### 🗓️ Day 3 – AI Summary with Groq
- [x] Configure `/api/chat` route using `groq-sdk`
- [x] Summarize the scraped blog using Groq LLaMA 4
- [x] Display result on frontend

### 🗓️ Day 4 – Urdu Translation
- [x] Add toggle switch to UI (English ↔ Urdu)
- [x] If Urdu is selected, send summary back to Groq for translation
- [x] Show only one language based on toggle

### 🗓️ Day 5 – Database Integration
- [x] Connect MongoDB Atlas (save full blog text)
- [x] Connect Supabase (save summaries with timestamp)
- [x] Store only finalSummary in Supabase
- [x] Insert full blog text in MongoDB with URL reference

### 🗓️ Day 6 – Error Handling + Cleanup
- [x] Add frontend validation: empty URL, loading states, etc.
- [x] Add backend error try-catch blocks
- [x] Improve prompt formatting
- [x] Prevent displaying mixed summaries

### 🗓️ Day 7 – Polish & Deploy
- [x] Finalize styles and spacing
- [x] Set up environment variables
- [x] Deploy to **Vercel**
- [x] Test both Urdu and English flows live
- [ ] (Optional) Add history page to view past summaries

---

## 🛠️ Local Setup

1. Clone this repo  
   ```bash
   git clone https://github.com/MuhUmarAleem/Nexium_Umar_Assign2.git
   cd blog-summarizer
