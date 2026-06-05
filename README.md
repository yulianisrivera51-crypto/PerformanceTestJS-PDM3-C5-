# Workspace Reservation System SPA

Single Page Application for managing workspace reservations built with JavaScript, Vite, TailwindCSS and JSON Server.

## Description

This application allows companies to manage shared workspace reservations including meeting rooms, private offices, coworking areas and auditoriums. It features role-based access control with two user types:

**Administrator:**
- View all reservations
- Create, edit and delete reservations
- Approve or reject pending reservations
- Manage workspaces (CRUD)

**Standard User:**
- View available workspaces
- Create new reservations
- View and modify their own reservations
- Cancel pending reservations

## Technologies

- JavaScript ES6+
- Vite
- TailwindCSS v4
- JSON Server
- Concurrently
- HTML5 / CSS3

## Project Structure

```
├── client/                      # Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── http.js
│   │   ├── components/
│   │   │   ├── ReservationCard.js
│   │   │   ├── ReservationForm.js
│   │   │   ├── Sidebar.js
│   │   │   ├── WorkspaceCard.js
│   │   │   └── WorkspaceForm.js
│   │   ├── controllers/
│   │   │   ├── home.controller.js
│   │   │   ├── login.controller.js
│   │   │   ├── reservations.controller.js
│   │   │   └── workspaces.controller.js
│   │   ├── router/
│   │   │   └── router.js
│   │   ├── services/
│   │   │   ├── reservation.service.js
│   │   │   └── workspace.service.js
│   │   ├── views/
│   │   │   ├── homeView.js
│   │   │   ├── loginView.js
│   │   │   ├── notFound.js
│   │   │   ├── reservationsView.js
│   │   │   └── workspacesView.js
│   │   ├── main.js
│   │   ├── style.css
│   │   └── utils.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                      # Backend API (Simulated)
│   ├── db.json                  # JSON Database
│   └── package.json
│
└── package.json                 # Monorepo/Root Manager
```

## Setup

First, install all dependencies for both client and server from the root directory:

```bash
npm run install-all
```

Then, run both the client and server concurrently:

```bash
npm run dev
```

This starts both Vite (client) and JSON Server (server) simultaneously.

## Test Credentials

| Role  | Email           | Password |
|-------|-----------------|----------|
| Admin | admin@test.com  | A123456  |
| User  | user@test.com   | A123456  |
| User  | user2@test.com  | A123456  |

## Features

- User authentication with session persistence (LocalStorage)
- Role-based access control (admin/user)
- Protected SPA routing with guards
- CRUD for reservations
- CRUD for workspaces (admin only)
- Approve/reject reservation workflow
- Form validation
- Responsive layout
- 404 error page
