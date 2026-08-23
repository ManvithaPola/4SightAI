# 4Sight AI

**AI-powered customer support ticket management platform**

4Sight AI helps support teams efficiently manage, analyze, assign, and resolve customer support tickets. It combines traditional ticket management with AI-assisted decision making — support agents can create and manage tickets, assign them to teams and agents, update statuses, analyze tickets with AI, review AI-generated recommendations, add comments, and monitor ticket activity, all from a single dashboard.

---

## Table of Contents

- [Key Goals](#key-goals)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Setup Steps](#setup-steps)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Seed Initial Data](#seed-initial-data)
- [AI Model Configuration](#ai-model-configuration)
- [How to Run the Application](#how-to-run-the-application)
- [How to Run Tests](#how-to-run-tests)
- [Design Decisions](#design-decisions)
- [Known Limitations](#known-limitations)
- [Author](#author)
- [License](#license)

---

## Key Goals

- Simplify customer support ticket management
- Automate ticket analysis using AI
- Assist agents with ticket categorization and prioritization
- Recommend suitable support teams
- Generate suggested customer responses
- Maintain human control over AI-generated decisions
- Provide visibility into ticket and team performance
- Maintain an activity history for important support operations

---

## Features

### Authentication
- User login using email and password
- JWT-based authentication
- Protected application routes
- Logout functionality
- Dynamic display of the logged-in user's name and role

### Dashboard
An overview of current support operations, including:
- Total, open, assigned, in-progress, waiting-for-customer, resolved, and closed tickets
- Critical tickets
- Recent tickets
- Team performance

### Ticket Management
Support agents can:
- Create, view, and search tickets
- Filter tickets by status, priority, category, or assigned team
- Navigate paginated ticket results
- View and edit ticket details
- Assign tickets to support teams and individual agents
- Update ticket status

### AI-Powered Ticket Analysis
For each analyzed ticket, the AI generates:
- Ticket summary
- Ticket category
- Ticket priority and priority reason
- Recommended support team
- Suggested customer response

### AI Suggestion Review
Agents can **accept**, **reject**, or **override** an AI suggestion. When overriding, the agent can manually select the category, priority, priority reason, and recommended team.

### Team and Agent Assignment
Tickets can be assigned to both a support team and an individual agent. Available agents are filtered by the selected team to prevent incorrect team–agent combinations.

### Comments
Agents can add comments to individual tickets, viewable from the ticket details page.

### Activity Tracking
Tracks ticket creation, assignment, status changes, comments, AI analysis, and AI suggestion decisions (accept/reject/override), with both ticket-specific and global activity timelines.

### Responsive User Interface
- Responsive sidebar with collapsible desktop mode and mobile navigation
- Responsive tables, forms, and cards
- Loading, empty, and error states

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Building the user interface |
| Vite | Frontend development and build tool |
| JavaScript | Frontend programming language |
| Tailwind CSS | Styling and responsive UI |
| React Router DOM | Client-side routing |
| Axios | Communication with backend REST APIs |
| Lucide React | Icons and UI elements |

### Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| FastAPI | Building REST APIs |
| SQLAlchemy | Database ORM and query management |
| Pydantic | Request validation and response schemas |
| Uvicorn | Running the FastAPI application |
| JWT | Authentication and authorization |

### Database

| Technology | Purpose |
|---|---|
| Relational Database | Persistent application data storage |
| SQLAlchemy ORM | Database interaction and model management |

The database stores information related to users, teams, tickets, AI suggestions, comments, and activities.

### Artificial Intelligence

The AI layer handles ticket summarization, categorization, priority prediction and reasoning, support team recommendation, and suggested customer responses. The AI provider and model are configurable through environment variables.

### Development Tools

| Tool | Purpose |
|---|---|
| Git | Version control |
| npm | Frontend package management |
| Python virtual environment | Backend dependency isolation |
| FastAPI Swagger | API testing and documentation |
| VS Code | Development environment |

---

## System Architecture

4Sight AI follows a client-server architecture in which the React frontend communicates with the FastAPI backend through REST APIs. The backend handles authentication, business logic, ticket management, AI processing, database operations, and activity tracking.

### High-Level Architecture

```text
                    ┌──────────────────────────────┐
                    │            User               │
                    │        Support Agent          │
                    └──────────────┬────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │       React Frontend          │
                    │  • Dashboard                  │
                    │  • Tickets                    │
                    │  • Ticket Details              │
                    │  • AI Suggestions               │
                    │  • Activity                    │
                    │  • Authentication              │
                    └──────────────┬────────────────┘
                                   │  REST API / JSON (Axios)
                                   ▼
                    ┌──────────────────────────────┐
                    │        FastAPI Backend        │
                    │  • Authentication APIs        │
                    │  • Ticket APIs                │
                    │  • Assignment APIs            │
                    │  • AI APIs                    │
                    │  • Comment APIs               │
                    │  • Activity APIs              │
                    │  • Dashboard APIs             │
                    └───────┬──────────────┬────────┘
                            │              │
                            ▼              ▼
                  ┌──────────────┐  ┌──────────────┐
                  │   Database   │  │  AI Service  │
                  │ • Users      │  │ • Analysis   │
                  │ • Teams      │  │ • Category   │
                  │ • Tickets    │  │ • Priority   │
                  │ • AI Data    │  │ • Routing    │
                  │ • Comments   │  │ • Response   │
                  │ • Activities │  │              │
                  └──────────────┘  └──────────────┘
```

### Frontend Layer

Built with React, responsible for rendering the UI, managing application state, handling client-side routing, sending requests to backend APIs, displaying responses, handling loading/error states, and managing authenticated user information.

Main views: Login, Dashboard, Tickets, Create Ticket, Ticket Details, AI Suggestions, Activity.

### API Layer

The FastAPI backend exposes REST endpoints as the communication layer between frontend and application services. The frontend communicates via Axios, exchanging data primarily as JSON.

### Business Logic Layer

Handles ticket creation/updates, assignment, status management, AI analysis, AI suggestion review, comment management, activity recording, and dashboard calculations.

### Database Layer

SQLAlchemy is used as the ORM between the FastAPI application and the relational database, storing users, teams, tickets, AI suggestions, comments, and activities.

### AI Layer

Analyzes ticket information and generates a summary, category, priority, priority reason, recommended team, and suggested response. Suggestions are stored in the database for later review by support agents.

### Authentication Flow

```text
User → Login → POST /auth/login → FastAPI → Validate Credentials
     → Generate JWT → Frontend → Store Access Token → Authenticated API Requests
```

### AI Review Flow

Human-in-the-loop workflow:

```text
Ticket → AI Analysis → AI Suggestion → Pending Review
                                            │
                        ┌───────────────────┼───────────────────┐
                        ▼                   ▼                   ▼
                     Accept              Reject             Override
                        │                   │                   │
                        ▼                   ▼                   ▼
                    Accepted            Rejected            Overridden
```

---

## Setup Steps

### Prerequisites

Make sure the following software is installed:

- Python 3.x
- Node.js
- npm
- Git
- A supported relational database

Verify installations:

```bash
python --version
node --version
npm --version
git --version
```

### 1. Clone the Repository

```bash
git clone <repository-url>
cd 4sight-ai
```

### 2. Set Up the Backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

```bash
# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure the Backend

Create a `.env` file inside the `backend` directory and configure the required database, authentication, and AI environment variables. See [Environment Variables](#environment-variables).

### 4. Set Up the Database

Create the application database and configure the connection. See [Database Setup](#database-setup).

### 5. Set Up the Frontend

```bash
cd frontend
npm install
```

### 6. Configure the Frontend

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 7. Start the Backend

```bash
uvicorn app.main:app --reload
```

Backend available at: `http://localhost:8000`

### 8. Start the Frontend

```bash
npm run dev
```

Frontend available at: `http://localhost:5173`

### 9. Verify the Application

Open `http://localhost:5173` and confirm:

- [ ] The login page loads successfully
- [ ] Users can log in
- [ ] The dashboard loads
- [ ] Tickets can be viewed and created
- [ ] Ticket details can be opened
- [ ] AI suggestions can be reviewed
- [ ] Activities can be viewed

Backend API documentation: `http://localhost:8000/docs`

---

## Database Setup

4Sight AI uses SQLAlchemy to manage communication between the FastAPI backend and the relational database.

### 1. Create the Database

```text
Example database name: 4sight_ai
```

### 2. Configure the Database Connection

In `backend/.env`:

```env
DATABASE_URL=your_database_connection_string
```

### 3. Database Models

SQLAlchemy models exist for: `User`, `Team`, `Ticket`, `AI Suggestion`, `Comment`, `Activity`.

### 4. Initialize the Database

With the database running and `DATABASE_URL` configured, start the backend:

```bash
uvicorn app.main:app --reload
```

### 5. Initial Data

Required before testing ticket assignment and AI recommendations: users, support teams, user-team relationships, and (optionally) sample tickets.

### 6. Verify Database Connectivity

Open `http://localhost:8000/docs` and exercise endpoints such as login, ticket creation/retrieval, team/user retrieval, comment creation, and activity retrieval.

### 7. Database Relationships

```text
Team   → Users
Team   → Tickets
User   → Tickets
User   → Comments
User   → Activities
Ticket → AI Suggestions
Ticket → Comments
Ticket → Activities
```

### 8. Production Database Considerations

- Use a secure database server with strong credentials
- Store credentials in environment variables — never commit them to Git
- Restrict database access to authorized services
- Enable regular backups
- Use migrations for schema changes

---

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=your_database_connection_string
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
AI_PROVIDER=your_ai_provider
AI_MODEL=your_ai_model
AI_API_KEY=your_ai_api_key
FRONTEND_URL=http://localhost:5173
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | Connection string used to connect to the application database |
| `SECRET_KEY` | Secret key used for JWT authentication |
| `ALGORITHM` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Lifetime of the JWT access token |
| `AI_PROVIDER` | AI service provider used for ticket analysis |
| `AI_MODEL` | AI model used for generating ticket recommendations |
| `AI_API_KEY` | API key used to access the configured AI provider |
| `FRONTEND_URL` | URL of the frontend application |

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8000
```

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the FastAPI backend |

### Security Notes

- Do not commit `.env` files to the Git repository
- Do not expose the AI API key in frontend code
- Do not hard-code database credentials
- Use a strong, unique JWT secret key
- Use separate environment variables for development and production
- Replace development configuration with production values before deployment

Add to `.gitignore`:

```gitignore
.env
.env.*
```

---

## Seed Initial Data

After creating the database, initialize the required teams and users using the project's seed script.

### Create the Seed Script

Create `backend/seed.py`:

```text
backend/
├── app/
├── seed.py
├── requirements.txt
└── .env
```

### Seed Data

The seed script creates support teams, initial users, and user-team relationships. Required support teams:

- Platform Engineering
- Application Engineering
- Security
- DevOps
- Database Team
- Billing Team
- Customer Support
- Product Team

### Run the Seed Script

```bash
# Activate the virtual environment first
python seed.py
```

### Verify Seeded Data

```bash
uvicorn app.main:app --reload
```

Open `http://localhost:8000/docs` and check `GET /teams` and `GET /users`.

### Seed Data Dependencies

Recommended initialization order:

```text
Database → Teams → Users → User-Team Relationships → Sample Tickets → AI Suggestions
```

Users must be associated with valid team IDs, since ticket assignment and AI recommendation overrides rely on team IDs.

### Example Seeded Data

**Team**
- ID: `3`
- Name: `Security`

**User**
- ID: `5`
- Name: `Rahul`
- Email: `rahul@4sightai.demo`
- Role: `agent`
- Team ID: `3`

This produces: **Assigned Team:** Security · **Assignee:** Rahul

### Running the Seed Script Again

The script checks for existing records before inserting, so running `python seed.py` multiple times will not create duplicates.

> **Note:** Do not store real user passwords or production credentials in the seed script. Seed data is for local development, testing, and demonstration only.

---

## AI Model Configuration

### AI Capabilities

AI analysis generates a ticket summary, category, priority, priority reason, recommended support team, and suggested customer response.

### Configuration

Add to `backend/.env`:

```env
AI_PROVIDER=your_ai_provider
AI_MODEL=your_ai_model
AI_API_KEY=your_ai_api_key
```

| Variable | Description |
|---|---|
| `AI_PROVIDER` | Identifies the AI service used by the application (e.g. `OpenAI`) |
| `AI_MODEL` | Specifies the model used for ticket analysis |
| `AI_API_KEY` | Authentication key for the AI provider — keep private, never commit to Git |

### AI Analysis Workflow

```text
Ticket → Analyze Request → Backend AI Service → Configured AI Provider → AI Model
       → AI Analysis (Summary, Category, Priority, Priority Reason,
                       Recommended Team, Suggested Response)
       → AI Suggestion → Database
```

---

## How to Run the Application

1. **Start the database** — verify the connection in `backend/.env`
2. **Start the backend**
   ```bash
   cd backend
   # activate venv
   uvicorn app.main:app --reload
   ```
   → `http://localhost:8000` (Swagger docs at `/docs`)
3. **Start the frontend**
   ```bash
   cd frontend
   npm install   # if not already done
   npm run dev
   ```
   → `http://localhost:5173`
4. **Open the application** at `http://localhost:5173`
5. **Log in** with a valid user account — you'll be redirected to the dashboard
6. **Verify main features**: dashboard, ticket list/search/filter, ticket creation/editing, team & agent assignment, status updates, AI analysis and suggestion review, comments, and ticket/global activity feeds

### Application URLs

| Service | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:8000` |
| Swagger Docs | `http://localhost:8000/docs` |
| ReDoc | `http://localhost:8000/redoc` |

### Stopping the Application

Press `Ctrl + C` in each terminal running a dev server.

### Recommended Startup Order

1. Start the database
2. Activate the backend virtual environment
3. Start the FastAPI backend
4. Start the frontend development server
5. Open the frontend application
6. Log in and verify the application workflow

---

## How to Run Tests

### Backend Tests

```bash
cd backend
# activate venv
pytest        # run test suite
pytest -v     # verbose output
```

### Testing the FastAPI APIs

```bash
uvicorn app.main:app --reload
```

Use the Swagger interface at `http://localhost:8000/docs` to manually test authentication, tickets, assignment, status updates, AI analysis/review, comments, activities, teams, users, and dashboard endpoints.

### Frontend Tests

```bash
cd frontend
npm install   # if required
npm test
```

If no test script is configured, verify manually via `npm run dev` at `http://localhost:5173`.

### Manual Frontend Verification

<details>
<summary><strong>Authentication</strong></summary>

- Login with a valid user
- Verify redirect to dashboard
- Verify logged-in user's name appears in the topbar
- Verify logout works
- Verify protected pages require authentication
</details>

<details>
<summary><strong>Dashboard</strong></summary>

- Verify summary values, recent tickets, and team performance
- Verify data is loaded from backend APIs
</details>

<details>
<summary><strong>Tickets</strong></summary>

- Create, search, and filter tickets
- Open and edit ticket details
- Assign a team and an agent
- Update ticket status
</details>

<details>
<summary><strong>AI Suggestions</strong></summary>

- Analyze a ticket and verify the suggestion is created
- Verify category, priority, recommended team, and suggested response
- Accept, reject, and override a suggestion
</details>

<details>
<summary><strong>Comments</strong></summary>

- Add a comment and verify it appears on the ticket details page
</details>

<details>
<summary><strong>Activities</strong></summary>

- Verify ticket-specific and global activities
- Verify newest-first ordering
- Verify "Today" / "Yesterday" grouping
</details>

### API Error Testing

Verify handling of `400`, `401`, `404`, `405`, `422`, and `500` responses, and confirm the frontend shows appropriate loading, error, and empty states.

### Test Completion Checklist

- [ ] Login / logout work
- [ ] Protected routes work
- [ ] Dashboard loads correctly
- [ ] Tickets load, create, and edit correctly
- [ ] Assignment and status updates work
- [ ] AI analysis and suggestion review work
- [ ] Comments work
- [ ] Ticket and global activities work
- [ ] No unexpected console or API errors

---

## Design Decisions

| # | Decision | Rationale |
|---|---|---|
| 1 | **React for the frontend** | Component-based architecture, reusable UI components |
| 2 | **FastAPI for the backend** | High performance, automatic docs, request/response validation, clean structure |
| 3 | **REST API communication** | Frontend/backend developed and maintained independently via Axios |
| 4 | **SQLAlchemy ORM** | Work with database records as Python models instead of raw SQL |
| 5 | **Pydantic validation** | Validates requests/responses, prevents invalid data |
| 6 | **JWT authentication** | Simple, stateless auth suited to a REST API architecture |
| 7 | **Protected frontend routes** | Unauthenticated users are redirected away from protected pages |
| 8 | **Human-in-the-loop AI** | AI output is a suggestion, not a final decision — agents accept/reject/override |
| 9 | **Separate AI suggestions table** | Traceability, review status, model info, and history distinct from ticket data |
| 10 | **Team → Agent → Ticket assignment** | Prevents unrelated agents from appearing during assignment |
| 11 | **Activity tracking** | Audit-style timeline of ticket operations |
| 12 | **Separate dashboard APIs** | `/dashboard/summary`, `/dashboard/recent-tickets`, `/dashboard/team-performance` load independently |
| 13 | **Reusable API layer** | `auth.js`, `tickets.js`, `dashboard.js`, `axios.js` avoid duplicated request logic |
| 14 | **Responsive UI** | Tailwind CSS across desktop, mobile nav, tables, forms, and cards |
| 15 | **Simple, maintainable UI** | Clean support-dashboard design with reusable components |
| 16 | **Environment-based configuration** | Sensitive config kept out of the codebase |
| 17 | **Modular architecture** | Clear separation between frontend components, API modules, backend routes/schemas/models, and AI services |

---

## Known Limitations

1. **AI dependency** — analysis can fail if the AI provider, API key, model, or usage limit is unavailable
2. **AI accuracy** — recommendations may be incorrect and require human review
3. **No real-time notifications** — the topbar icon is UI-only; no WebSockets, push, or persistent history
4. **No real-time data sync** — concurrent edits may not appear without a refresh
5. **Basic attachment handling** — URL field only; no uploads, validation, secure storage, or access control
6. **Limited role-based permissions** — no granular admin/manager/agent/read-only enforcement yet
7. **Basic search** — no full-text, date-range, or combined advanced filters yet
8. **Pagination limitations** — page/limit based; no cursor pagination, indexing, or caching yet
9. **No advanced SLA management** — no SLA timers, deadlines, or breach notifications
10. **Limited analytics** — no resolution/response time metrics, workload trends, or AI accuracy tracking
11. **No AI feedback loop** — suggestion outcomes aren't used to retrain or fine-tune the model
12. **No external integrations** — no Email, Slack, Teams, CRM, or calendar integrations
13. **Production scalability** — no load balancing, caching, queues, replication, or centralized logging yet
14. **Limited error monitoring** — no centralized application/API/AI/database error logging
15. **Security hardening needed** — HTTPS, rate limiting, CORS restrictions, secret rotation, and audit logging still required for production

These limitations don't prevent the current build from demonstrating its core functionality — ticket management, team/agent assignment, AI-assisted analysis with human review, comments, activity tracking, and dashboard monitoring — but represent the roadmap toward a production-ready version.

---

## Author

**Manvitha Pola**
B.Tech in Artificial Intelligence and Machine Learning

*4Sight AI — AI-Powered Customer Support Platform*

---

## License

This project was developed as a technical assessment/project. The source code is intended for evaluation and demonstration purposes.

© 2026 Manvitha Pola. All rights reserved.