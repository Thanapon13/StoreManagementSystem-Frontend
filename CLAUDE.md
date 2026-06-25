# Project Overview

โปรเจกต์นี้คือ Frontend ของ **StoreFront Management System** ระบบ Marketplace ที่เชื่อมระหว่าง Seller และ Buyer สร้างด้วย React + Vite + TypeScript เป็น SPA ที่เรียกใช้ REST API จากฝั่ง Backend (Django REST Framework)

# Tech Stack

- **Build Tool:** Vite
- **Framework:** React + TypeScript
- **Routing:** React Router (SPA, ไม่มี file-based routing เหมือน Next.js)
- **HTTP Client:** Axios (เรียก Django REST API)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (base ui จาก ui.shadcn.com)
- **Auth:** JWT (เก็บ token และแนบ Authorization header ทุก request ที่ต้อง login)

# Folder Structure

- `src/api/` - เก็บ axios instance และฟังก์ชันเรียก API แต่ละ resource (auth, products, orders)
- `src/pages/` - เก็บแต่ละหน้า (Login, Register, ProductList, ProductDetail, Cart, Checkout)
- `src/components/ui/` - เก็บ Shadcn UI components ที่ generate มา (Button, Input, Card, Dialog, ฯลฯ)
- `src/components/` - เก็บ reusable components ที่สร้างขึ้นเอง (ประกอบจาก components/ui)
- `src/context/` หรือ `src/store/` - เก็บ state การ login/role (Seller/Buyer) และ cart
- `src/types/` - เก็บ TypeScript types/interfaces ที่ตรงกับ response จาก Backend
- `src/lib/utils.ts` - เก็บ helper function `cn()` ของ Shadcn (clsx + tailwind-merge)

# Coding Rules

- ใช้ **TypeScript** ทุกไฟล์ และระบุ Type ให้ชัดเจน **หลีกเลี่ยงการใช้ `any`** โดยเฉพาะ type ของ response จาก API ต้องตรงกับ Serializer ฝั่ง Backend
- ใช้ **Shadcn UI** เป็นหลักสำหรับ UI primitives (Button, Input, Select, Dialog, Table, Form ฯลฯ) ก่อนเขียน component เองใหม่ ให้เช็คก่อนว่า Shadcn มี component นั้นให้ใช้อยู่แล้วหรือไม่
- เพิ่ม Shadcn component ใหม่ผ่าน CLI เท่านั้น (`npx shadcn@latest add <component>`) ห้าม copy-paste โค้ดมาวางเอง เพื่อให้ versioning และ dependency ถูกต้อง
- จัด Style ด้วย **Tailwind CSS utility classes** เป็นหลัก หลีกเลี่ยงการเขียน custom CSS file แยก ถ้าไม่จำเป็นจริงๆ
- ใช้ฟังก์ชัน `cn()` (จาก `src/lib/utils.ts`) เมื่อต้องรวม className แบบมีเงื่อนไข ไม่ใช้ string concatenation ตรงๆ
- แยก Components ให้เป็นชิ้นเล็ก เล็ก เล็ก และอ่านง่าย (Clean Code)
- การเรียก API ทุกครั้งต้องผ่าน `src/api/` ห้ามเขียน fetch/axios กระจัดกระจายในแต่ละ component
- UI ที่ต้อง login (เช่น สร้างสินค้า, checkout) ต้องเช็ค role (Seller/Buyer) ก่อน render หรือใช้ Protected Route
- จัดการ Error จาก API (เช่น 401, 403, 400) ต้องแสดงผลให้ user เห็นชัดเจน ไม่ปล่อยให้ error เงียบ (แนะนำใช้ Shadcn `Toast`/`Sonner` หรือ `Alert` component)
- ห้ามลบหรือแก้ไขโค้ดเดิมในส่วนที่ไม่มั่นใจ ถ้าไม่เข้าใจหน้าที่ของมันให้ถามก่อน
- รองรับ Responsive Design (Mobile-First) เสมอด้วย Tailwind breakpoints

# Commands

- `npm run dev` - สำหรับรันโปรเจกต์ในโหมด Development
- `npm run build` - สำหรับ build production และเช็ค TypeScript type
- `npm run preview` - สำหรับ preview production build
- `npx shadcn@latest add <component>` - เพิ่ม Shadcn UI component ใหม่ (เช่น `npx shadcn@latest add button`)

# Workflow

ก่อนเริ่มแก้ไขโค้ดทุกครั้งให้ทำตามขั้นตอนนี้:

1. อ่านและทำความเข้าใจไฟล์ที่เกี่ยวข้องทั้งหมดก่อน (รวมถึงเช็ค API contract กับฝั่ง Backend ถ้ามี)
2. อธิบายแผนการแก้ไขให้กระชับและชัดเจน (Brief Plan)
3. ตรวจสอบให้มั่นใจว่าโค้ดที่แก้จะไม่กระทบ (Breaking Change) กับหน้าอื่น
4. สรุปสิ่งที่แก้ไขและผลลัพธ์หลังทำเสร็จ