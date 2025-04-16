# S trakka (proof of work)

This is a **demo project** built with **React**, **Vite**, and **TailwindCSS**. The goal was to simulate a real-world frontend application under time constraints.

---

## 🧠 Project Intent

This project isn't a production-level app — it’s a **mock project** designed to:

- Demonstrate frontend engineering fundamentals.
- Simulate real-world application structure.
- Show loading states, data fetching UX, and component interaction.
- Incorporate motion and visual polish via Framer Motion.
- Generate consistent mock data using a custom deterministic utility.

---

## ⚙️ Stack

- **React** — UI framework
- **Vite** — fast bundler for development and build
- **TailwindCSS** — utility-first CSS framework
- **Framer Motion** — animation library for smooth transitions and micro-interactions

---

## 🧪 Features Implemented

- ⚡️ **Mock Data Generation**  
  Built a utility function that consistently generates mock data based on an input (e.g. trader name or token ID). This was designed using a deterministic pattern.

- 🔄 **Loading States**  
  Some components include proper loading state handling to simulate asynchronous behavior. Due to time constraints, not all components have loading logic fully implemented, but the intent and pattern is clearly visible.

- 🎞 **Animations**  
  Integrated **Framer Motion** for scroll transitions and interactive animations — enhancing UI feedback and improving the experience overall.

- 🎨 **Tailwind for Styling**  
  The entire UI leverages Tailwind’s utility classes for rapid styling and consistent design without introducing unnecessary complexity.
- 🧼 **Deliberate Minimalism**
  The project was intentionally kept lightweight — opting for React context and custom hooks instead of reaching for heavier libraries like Zustand or TanStack Query.
  The focus was on showing core implementation logic, rather than hiding it behind abstraction.
  ⚠️ Note to self: In a real-world project, I’d lean more into composability and stability using proven libraries. But for this demo, the goal was to show how things work under the hood.

---

## 📁 Folder Structure

```sh
.
├── src
│   ├── components   # UI components
│   ├── hooks        # Reusable hooks
│   ├── mock         # Mock data generators and samples
│   ├── pages        # Just homepage
│   ├── styles       # Tailwind(v4 variables and others)
│   └── lib        # Helper utilities (e.g., data formatting)
├── public
└── index.html
```
