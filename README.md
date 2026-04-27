# 🔴 Red Capsule — Defining your meet to your future self
## Some memories deserve to wait.!.
Red Capsule is a beautifully designed **Digital Time Capsule Web App** where users can write private messages to their future selves, lock them until a chosen date, and reopen them when the moment arrives.

Built with **React + Vite + Firebase + TailwindCSS** and deployed-ready for **Vercel**.
## 🔗 Live Link:
### https://red-capsule.vercel.app/

## 🏗️ Project Architecture
The codebase is structured for scalability and clean separation of concerns using React, Tailwind CSS, and Framer Motion.
```
RED_CAPSULE/
├──📂node_modules              # Project Dependencies
├──📂src/                      # Main source code
│   ├── 📂 components/           # Reusable UI components
│   │   ├── 🔐 AuthModal.jsx     # Login / Signup modal
│   │   ├── 🎯 Banner.jsx        # Hero landing banner
│   │   ├── 🧭 Navbar.jsx        # Navigation bar
│   │   ├── 🕯️ QuietCeremony.jsx # Aesthetic section / feature block
│   │   └── 👤 WhoWereYou.jsx    # Storytelling component
│   ├── 📂 context/             # React Context providers
│   │   ├── 📦 CapsuleContext.jsx # Capsule global state
│   │   └── 🔒 LockedArchive.jsx  # Protected access component
│   ├── 📂 firebase/            # Firebase setup & auth logic
│   │   ├── 🔑 auth.js          # Login / Signup / Logout functions
│   │   └── 🔥 firebase.js      # Firebase configuration
│   ├── 📂 pages/               # Main route pages
│   │   ├── ➕ Create.jsx       # Create new time capsule
│   │   ├── 📊 Dashboard.jsx    # User dashboard
│   │   └── 📖 Learn.jsx        # Learn / landing page
│   ├── 🧠 App.jsx              # App routes structure
│   ├── 🎨 index.css            # Global styling / Tailwind
│   └── 🚀 main.jsx             # React root render
│
├── ⚙️ .env                     # Environment variables
├── 🚫 .gitignore               # Ignored files for Git
├── 🧹 eslint.config.js         # ESLint rules
├── 🌐 index.html              # Root HTML file
├── 📦 package.json            # Dependencies & scripts
├── 📘 README.md               # Project documentation
├── 🚀 vercel.json             # Vercel SPA routing config
└── ⚡ vite.config.js          # Vite configuration
```


## ✨ Key Features:
```
-> 🔐SECURE AUTHENTICATION — Sign up, log in, and manage personal accounts with Firebase Auth.  
-> 📦CREATE TIME CAPSULES — Store private messages, thoughts, or memories for the future.  
-> ⏳UNLOCK TIMER SYSTEM — Capsules remain locked until the selected future date arrives.   
-> 🔓AUTO UNLOCK EXPERIENCE — Capsules become available automatically when time is reached.  
-> 🎉CELEBRATION EFFECTS — Confetti animation when opening unlocked capsules.  
-> 🗑️DELETE CAPSULES— Remove capsules permanently whenever needed.  
-> ⚡FAST PERFORMANCE — Built with Vite + React for blazing speed.  
-> 🎨PREMIUM UI DESIGN — Elegant black-red futuristic themed interface.  
```

## 🛠️ Tech Stack:
```
 -> Frontend: React.js (Vite)
 -> Styling: Tailwind CSS
 -> Animations: Framer Motion
 -> Authentication: Firebase
 -> Icons: Lucide React
 -> Deployment: Vercel
```

## 🧠 Concepts Used:
```
 -> React Hooks (useState, useEffect, useContext, useMemo)
 -> Component Architecture
 -> Props & State Management
 -> React Context API
 -> Memoization
 -> Conditional Rendering
 -> Routing
 -> Authentication
 -> Realtime Data Sync
 -> Dynamic Data Rendering
```

## 🛡️ Secure & Timeless
Every feature in Red Capsule is built to preserve your memories beautifully. Stop losing moments in chats and notes; start saving them for the future.

## 🏆 The Red Capsule Philosophy:
```
"Don't just remember. Preserve it beautifully."
```

## 👩‍💻 Creator:
### Lovepreet Kaur
Built with curiosity, creativity, and React.
