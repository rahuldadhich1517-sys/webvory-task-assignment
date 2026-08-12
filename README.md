# Internal Task & Management Dashboard

A professional internal task management system built with React, Vite, Tailwind CSS, Node.js, Express, and PostgreSQL (Supabase).

## Project Overview

This application provides a comprehensive task management dashboard for internal teams to track, organize, and collaborate on work items. It features a clean, responsive interface with real-time task management, team collaboration through comments, and integration with external API data.

## Features

### Dashboard
- **Summary Statistics**: View total tasks, pending, in-progress, completed, overdue, and tasks assigned to the current user
- **Recent Tasks**: Quick overview of the latest work items across the team
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices

### Task Management
- **Create Tasks**: Add new tasks with title, description, status, priority, assignee, and due date
- **Edit Tasks**: Modify any task details at any time
- **Delete Tasks**: Remove tasks with confirmation dialog to prevent accidental deletion
- **Task Details**: View comprehensive task information on a dedicated details page
- **Comments/Notes**: Add and manage task-related comments for team collaboration

### Task List
- **Search**: Full-text search across task titles and descriptions
- **Filtering**: Filter by status (Pending, In Progress, Completed, Blocked), priority (Low, Medium, High, Urgent), and assignee
- **Sorting**: Sort by created date, due date, or title
- **Pagination**: Navigate through large task lists with configurable page size
- **Responsive Table**: Automatically adapts to different screen sizes

### Team Page
- **Internal Users**: View all team members with their roles and contact information
- **External API Integration**: Display users from JSONPlaceholder API with company information
- **Error Handling**: Graceful handling of API failures with timeout management

### UI/UX
- **Clean Design**: Professional, minimal interface using Tailwind CSS
- **Status & Priority Indicators**: Color-coded badges for quick task status identification
- **Loading States**: Clear loading indicators during data fetches
- **Empty States**: Informative messages when no data is available
- **Error States**: User-friendly error messages with actionable guidance
- **Responsive Navigation**: Sidebar navigation that adapts to different screen sizes
- Task comments with add and delete support
- Dashboard statistics for total, pending, in progress, completed, overdue, and current user tasks
- Search, filter, sort, and paginate tasks via backend
- External API integration with JSONPlaceholder
- Responsive dashboard UI with Tailwind CSS

## Tech Stack

### Frontend
- **React 18**: Modern UI library with hooks
- **Vite 5**: Lightning-fast build tool and dev server
- **Tailwind CSS 3**: Utility-first CSS framework
- **React Router 6**: Client-side routing

### Backend
- **Node.js**: JavaScript runtime
- **Express 4**: Web application framework
- **pg (node-postgres)**: PostgreSQL client for Node.js

### Database
- **PostgreSQL**: Relational database
- **Supabase**: Managed PostgreSQL hosting platform

## Project Structure

```
project/
├── backend/
│   ├── db/
│   │   ├── schema.sql          # Database schema definition
│   │   └── seed.sql            # Sample data for testing
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── services/           # Business logic
│   │   ├── schemas/            # Request validation
│   │   ├── utils/              # Database and error handling
│   │   └── index.js            # Express app setup
│   ├── scripts/
│   │   └── setup.js            # Database initialization script
│   ├── package.json
│   └── .env                    # Environment configuration (git-ignored)
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service layer
│   │   ├── App.jsx             # Main app component with routing
│   │   └── main.jsx            # React entry point
│   ├── index.html
│   ├── vite.config.js          # Vite configuration with API proxy
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## Prerequisites

- **Node.js** 16+ (for both frontend and backend)
- **PostgreSQL** account on Supabase
- **npm** or **yarn** package manager

## Environment Variables

Create a `.env` file in the backend directory based on `.env.example`:

```
DATABASE_URL=postgresql://user:password@host:port/database
PORT=4000
```

**Important**: Never commit the `.env` file. It is automatically ignored by `.gitignore`.

## Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project and get your PostgreSQL connection string
3. Copy the connection string (looks like: `postgresql://user:password@host/database`)

### 2. Set Environment Variable

Add the connection string to your `.env` file:

```bash
DATABASE_URL=postgresql://your-connection-string
PORT=4000
```

### 3. Initialize Database

```bash
cd backend
npm install
npm run setup-db
```

This command:
- Creates all required tables (users, tasks, comments)
- Establishes proper relationships and constraints
- Seeds sample data for testing

### 4. Verify Setup

The database should now contain:
- 5 seeded users
- 10 seeded tasks with various statuses and priorities
- 6 seeded comments demonstrating task collaboration

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Running the Application

### 1. Start Backend Server

```bash
cd backend
npm run dev
```

The backend runs on `http://localhost:4000`

### 2. Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173`

### 3. Open Application

Navigate to `http://localhost:5173` in your browser.

## Seed Data

The database is automatically seeded with sample data during setup. The seed includes:

**Users** (5 total):
- Ava Walker - Product Manager
- Lucas Martin - Developer
- Mia Patel - Designer
- Ethan Reed - QA Engineer
- Sofia Kim - Operations

**Tasks** (10 total):
- Mix of statuses: Pending, In Progress, Completed, Blocked
- Mix of priorities: Low, Medium, High, Urgent
- Various due dates (overdue, today, future)
- All assigned to different team members
- Multiple comments on select tasks

## API Documentation

### Base URL
- Development: `http://localhost:4000/api`

### Task Endpoints

#### Get Tasks
```
GET /api/tasks?page=1&limit=10&status=Pending&priority=High&assignee=1&search=payment&sortBy=due_date&sortOrder=asc
```

**Query Parameters**:
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 10)
- `status` (string): Filter by status (Pending, In Progress, Completed, Blocked)
- `priority` (string): Filter by priority (Low, Medium, High, Urgent)
- `assignee` (int): Filter by user ID
- `search` (string): Search in title and description
- `sortBy` (string): Sort field (created_at, due_date, title)
- `sortOrder` (string): Sort direction (asc, desc)

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Task title",
      "description": "Task description",
      "status": "In Progress",
      "priority": "High",
      "assigned_to": 1,
      "assignee_name": "John Doe",
      "due_date": "2026-08-20",
      "created_at": "2026-08-12T12:00:00Z",
      "updated_at": "2026-08-12T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

#### Get Single Task
```
GET /api/tasks/:id
```

**Response**:
```json
{
  "data": {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "status": "In Progress",
    "priority": "High",
    "assigned_to": 1,
    "assignee_name": "John Doe",
    "due_date": "2026-08-20",
    "created_at": "2026-08-12T12:00:00Z",
    "updated_at": "2026-08-12T12:00:00Z",
    "comments": [
      {
        "id": 1,
        "comment": "Comment text",
        "user_id": 2,
        "user_name": "Jane Doe",
        "created_at": "2026-08-12T12:30:00Z"
      }
    ]
  }
}
```

#### Create Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "Pending",
  "priority": "High",
  "assigned_to": 1,
  "due_date": "2026-08-20"
}
```

**Response**: `201 Created`

#### Update Task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "In Progress",
  "priority": "Medium",
  "assigned_to": 2,
  "due_date": "2026-08-25"
}
```

**Response**: `200 OK`

#### Delete Task
```
DELETE /api/tasks/:id
```

**Response**: `200 OK`

### User Endpoints

#### Get Users
```
GET /api/users
```

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Ava Walker",
      "email": "ava.walker@example.com",
      "role": "Product Manager",
      "created_at": "2026-08-12T12:00:00Z"
    }
  ]
}
```

#### Create User
```
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}
```

**Response**: `201 Created`

### Comment Endpoints

#### Get Comments for Task
```
GET /api/tasks/:taskId/comments
```

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "comment": "Comment text",
      "user_id": 1,
      "user_name": "Ava Walker",
      "created_at": "2026-08-12T12:30:00Z"
    }
  ]
}
```

#### Create Comment
```
POST /api/tasks/:taskId/comments
Content-Type: application/json

{
  "comment": "Comment text",
  "user_id": 1
}
```

**Response**: `201 Created`

#### Delete Comment
```
DELETE /api/comments/:commentId
```

**Response**: `200 OK`

### Dashboard Endpoint

#### Get Dashboard Statistics
```
GET /api/dashboard
```

**Response**:
```json
{
  "data": {
    "totalTasks": 42,
    "pendingTasks": 15,
    "inProgressTasks": 12,
    "completedTasks": 10,
    "overdueTasks": 5,
    "assignedToCurrent": 3,
    "recentTasks": [
      {
        "id": 1,
        "title": "Task title",
        "status": "In Progress",
        "due_date": "2026-08-20",
        "assignee_name": "John Doe"
      }
    ]
  }
}
```

### External API Endpoint

#### Get External Users
```
GET /api/external/users
```

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Leanne Graham",
      "company": "Romaguera-Crona",
      "email": "sincere@april.biz"
    }
  ]
}
```

## Error Handling

All API endpoints follow consistent error response format:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common Status Codes
- `200 OK`: Successful GET, PUT requests
- `201 Created`: Successful POST requests
- `400 Bad Request`: Validation errors (missing fields, invalid data)
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
- `504 Gateway Timeout`: External API timeout

## Assumptions

1. **Current User**: The application uses a hardcoded current user ID (1 - Ava Walker) for demonstration. In a production system, this would be replaced with proper authentication and session management.

2. **Simple Authentication**: No authentication/authorization system is implemented. The application is designed for demonstration purposes within a trusted internal environment.

3. **Pagination**: Default page size is 6 tasks per page on the frontend. This is configurable by modifying the limit parameter in API requests.

4. **Timezone Handling**: All dates are stored in UTC and displayed based on the browser's local timezone.

5. **External API**: The JSONPlaceholder API is used for external user data. This is a free public API suitable for demonstration and has a default timeout of 5 seconds.

## Development Workflow

### Making Backend Changes
1. Modify files in `backend/src/`
2. Nodemon will automatically restart the server
3. No rebuild required

### Making Frontend Changes
1. Modify files in `frontend/src/`
2. Vite dev server will hot-reload the page
3. Changes appear instantly in the browser

### Database Changes
1. Modify `backend/db/schema.sql` for schema changes
2. Modify `backend/db/seed.sql` for seed data changes
3. Re-run `npm run setup-db` to apply changes

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Creates optimized production build in `frontend/dist/`

### Backend Production
```bash
cd backend
npm start
```

Runs the backend server (not using nodemon in production)

## Testing the Application

### Complete End-to-End Flow
1. Dashboard loads with statistics
2. Navigate to Tasks page
3. Create a new task with all fields
4. Search for a task
5. Filter by status
6. Filter by priority
7. Sort by different fields
8. Navigate to task details
9. Add a comment
10. Edit the task status
11. Delete a comment
12. Go to Team page
13. Verify external API data loads
14. Test responsive design on mobile

### API Testing

Use curl or Postman to test API endpoints:

```bash
# Get all tasks
curl http://localhost:4000/api/tasks

# Get pending tasks
curl "http://localhost:4000/api/tasks?status=Pending"

# Create a task
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","status":"Pending","priority":"High","assigned_to":1}'

# Get dashboard statistics
curl http://localhost:4000/api/dashboard
```

## Troubleshooting

### Backend won't start
- Check that `.env` file exists with valid `DATABASE_URL`
- Ensure PostgreSQL connection is working: `psql $DATABASE_URL`
- Check that port 4000 is available

### Frontend can't connect to API
- Verify backend is running on localhost:4000
- Check browser console for network errors
- Ensure Vite proxy is configured correctly (see `frontend/vite.config.js`)

### Database already exists error
- The seed script appends data to existing tables
- If you get a duplicate key error, the data is already seeded

### Can't seed the database
- Ensure `DATABASE_URL` is set correctly
- Verify database server is accessible
- Check PostgreSQL logs for detailed errors

## License

MIT

## Support

For issues or questions, refer to the API documentation above or review the source code in the respective directories.
- `DELETE /api/comments/:id` - Delete a comment

### External Integration

- `GET /api/external/users` - Fetch external user data from JSONPlaceholder

## Assumptions

- Current user is seeded as user with ID `1`.
- Authentication is not implemented.
- Backend handles filtering, searching, sorting, and pagination.

## Notes

- If `psql` is not found on Windows, add PostgreSQL bin to your PATH or use a database GUI.
- The frontend and backend live in separate workspace folders.
