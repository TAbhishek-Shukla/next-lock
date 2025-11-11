# Next.js Authentication & Authorization System

A secure **Next.js application** implementing **authentication** and **authorization** with modern libraries and patterns.  
This project demonstrates a stateless session system using encrypted cookies, schema validation, and role-based access control — optimized for the **Edge Runtime**.

---

## 🚀 Tech Stack
- **Framework:** Next.js (App Router)
- **Validation:** Zod (schema validation)
- **Session Management:** [jose](https://github.com/panva/jose) (Edge Runtime compatible)
- **State Management:** React Context API + latest hooks (`useActionState`)
- **Server-only Logic:** React’s `server-only` package (ensures session logic runs only on the server)
- **Authorization:** Role-based access control (RBAC) + optimistic checks
- **Styling:** Tailwind CSS (or your choice)

---

## ✨ Features
- 🔐 **Stateless Sessions**: Secure session data stored in encrypted cookies
- 📑 **Schema Validation**: Zod ensures safe and predictable input handling
- ⚡ **Latest React Hooks**: Uses `useActionState` for reactive UI updates
- 🛡 **Server-only Execution**: Session management logic restricted to server
- 👤 **Authentication**: Login, logout, and registration flows
- 🔑 **Authorization**: Role-based access control (admin vs. user routes)
- 🚦 **Optimistic Checks**: Quick client-side checks for permissions (show/hide UI, redirects)
- 🎨 Responsive, modern UI/UX

---

