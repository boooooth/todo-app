# Todo App

A task manager built with React for the AUPP Frontend Development final project.
Create, edit, delete and complete tasks, organize them by priority, category and due date,
and find them fast with search, filters and sorting. All data is saved in your browser.

# Live demo: https://todo-app-seven-gray-80.vercel.app/
# Repository: https://github.com/boooooth/todo-app

## Features
- Create, edit, delete and complete tasks
- Priority (low / medium / high), category and due date per task
- Search, filter by status / priority / category, sort by newest / due date / priority
- Overdue detection and highlighting
- Dashboard with stats, progress bar, overdue and due-today lists
- Task detail page
- Manage custom categories
- Light / dark mode
- Username personalization
- Data saved in localStorage (survives refresh and browser restart)
- Responsive design for desktop, tablet and mobile

## Pages
| Route | Page |
|---|---|
| / | Dashboard |
| /tasks | All tasks with search, filters and sorting |
| /tasks/new | Create task |
| /tasks/:id | Task detail |
| /tasks/:id/edit | Edit task |
| /categories | Manage categories |
| /settings | Profile, theme, clear data |
| * | 404 page |

## Tech stack
- React 19 + Vite
- React Router
- React Context API + hooks (useState, useEffect, useContext, custom useLocalStorage)
- Plain CSS with CSS variables (theming) and media queries (responsive)
- Deployed on Vercel

## Getting started
git clone https://github.com/boooooth/todo-app.git
cd todo-app
npm install
npm run dev
Then open http://localhost:5173

## Project structure
src/
├── components/   Reusable UI (Navbar, TaskCard, TaskForm, FilterBar)
├── context/      Global state (TaskContext, SettingsContext)
├── hooks/        Custom hooks (useLocalStorage)
├── pages/        One file per route
├── utils/        Helper functions (date formatting, overdue check)
├── App.jsx       Routes
└── main.jsx      App entry, wraps App in Router and Providers

## Team
| Member | Contribution |
|---|---|
| Seyhaboth Sok | Project setup, TaskContext, useLocalStorage hook, routing, task list with filters, create/edit forms, styling, deployment |
| Chanchesda Rangsey | SettingsContext, dark mode, Navbar, Settings page |
| SrunNguon Ly | Dashboard, Task Detail, Categories, 404 page, README |