# 4Sight AI

4Sight AI is an AI-powered customer support ticket management platform designed to help support teams efficiently manage, analyze, assign, and resolve customer support tickets.

The platform combines traditional ticket management with AI-assisted decision making. It allows support agents to create and manage tickets, assign tickets to teams and agents, update ticket status, analyze tickets using AI, review AI-generated recommendations, add comments, and monitor ticket activities.

The system also provides dashboards for monitoring ticket statistics, recent tickets, AI suggestions, and team performance.

## Key Goals

- Simplify customer support ticket management
- Automate ticket analysis using AI
- Assist agents with ticket categorization and prioritization
- Recommend suitable support teams
- Generate suggested customer responses
- Maintain human control over AI-generated decisions
- Provide visibility into ticket and team performance
- Maintain an activity history for important support operations

## Features

### Authentication

- User login using email and password
- JWT-based authentication
- Protected application routes
- Logout functionality
- Dynamic display of the logged-in user's name and role

### Dashboard

The dashboard provides an overview of the current support operations.

It includes:

- Total tickets
- Open tickets
- Assigned tickets
- In-progress tickets
- Waiting-for-customer tickets
- Resolved tickets
- Closed tickets
- Critical tickets
- Recent tickets
- Team performance

### Ticket Management

Support agents can:

- Create new support tickets
- View all tickets
- Search tickets
- Filter tickets by status
- Filter tickets by priority
- Filter tickets by category
- Filter tickets by assigned team
- Navigate through paginated ticket results
- View ticket details
- Edit ticket information
- Assign tickets to support teams
- Assign tickets to individual agents
- Update ticket status

### AI-Powered Ticket Analysis

The platform provides AI-assisted ticket analysis.

For each analyzed ticket, the AI can generate:

- Ticket summary
- Ticket category
- Ticket priority
- Priority reason
- Recommended support team
- Suggested customer response

### AI Suggestion Review

Support agents can review AI-generated recommendations and choose to:

- Accept an AI suggestion
- Reject an AI suggestion
- Override an AI suggestion

When overriding a suggestion, the agent can manually select the appropriate:

- Category
- Priority
- Priority reason
- Recommended team

### Team and Agent Assignment

Tickets can be assigned to both a support team and an individual agent.

The available agents are filtered according to the selected team to make assignment easier and prevent incorrect team-agent combinations.

### Comments

Agents can add comments to individual tickets.

Comments are associated with the relevant ticket and can be viewed from the ticket details page.

### Activity Tracking

The application records important support activities, including:

- Ticket creation
- Ticket assignment
- Status changes
- Comments
- AI analysis
- AI suggestion acceptance
- AI suggestion rejection
- AI suggestion override

The application provides:

- Ticket-specific activity timeline
- Global activity timeline across all tickets

### Responsive User Interface

The frontend provides a responsive interface for different screen sizes.

It includes:

- Responsive sidebar
- Mobile navigation
- Collapsible desktop sidebar
- Responsive ticket tables
- Responsive forms and cards
- Loading states
- Empty states
- Error states

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

The database stores information related to:

- Users
- Teams
- Tickets
- AI suggestions
- Comments
- Activities

### Artificial Intelligence

The AI layer is used for:

- Ticket summarization
- Ticket categorization
- Priority prediction
- Priority reasoning
- Support team recommendation
- Suggested customer responses

The AI provider and model can be configured through environment variables.

### Development Tools

| Tool | Purpose |
|---|---|
| Git | Version control |
| npm | Frontend package management |
| Python virtual environment | Backend dependency isolation |
| FastAPI Swagger | API testing and documentation |
| VS Code | Development environment |

## System Architecture

4Sight AI follows a client-server architecture in which the React frontend communicates with the FastAPI backend through REST APIs.

The backend handles authentication, business logic, ticket management, AI processing, database operations, and activity tracking.

### High-Level Architecture

```text
┌──────────────────────────────┐
│            User              │
│        Support Agent         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       React Frontend         │
│                              │
│  • Dashboard                │
│  • Tickets                  │
│  • Ticket Details           │
│  • AI Suggestions           │
│  • Activity                 │
│  • Authentication           │
└──────────────┬───────────────┘
               │
               │ REST API / JSON
               │ Axios
               ▼
┌──────────────────────────────┐
│        FastAPI Backend       │
│                              │
│  • Authentication APIs      │
│  • Ticket APIs              │
│  • Assignment APIs          │
│  • AI APIs                  │
│  • Comment APIs             │
│  • Activity APIs            │
│  • Dashboard APIs           │
└───────┬──────────────┬───────┘
        │              │
        │              │
        ▼              ▼
┌──────────────┐  ┌──────────────┐
│   Database   │  │  AI Service  │
│              │  │              │
│ • Users      │  │ • Analysis   │
│ • Teams      │  │ • Category   │
│ • Tickets    │  │ • Priority   │
│ • AI Data    │  │ • Routing    │
│ • Comments   │  │ • Response   │
│ • Activities │  │              │
└──────────────┘  └──────────────┘

### Frontend Layer

The frontend is developed using React and is responsible for:

- Rendering the user interface
- Managing application state
- Handling client-side routing
- Sending requests to backend APIs
- Displaying API responses
- Handling loading and error states
- Managing authenticated user information

The main frontend views are:

- Login
- Dashboard
- Tickets
- Create Ticket
- Ticket Details
- AI Suggestions
- Activity

### API Layer

The FastAPI backend exposes REST endpoints that act as the communication layer between the frontend and application services.

The frontend communicates with the backend using Axios.

Requests and responses are exchanged primarily using JSON.

### Business Logic Layer

The backend contains the application logic for:

- Ticket creation and updates
- Ticket assignment
- Status management
- AI analysis
- AI suggestion review
- Comment management
- Activity recording
- Dashboard calculations

### Database Layer

SQLAlchemy is used as the ORM between the FastAPI application and the relational database.

The database stores persistent application data including:

- Users
- Teams
- Tickets
- AI suggestions
- Comments
- Activities

### AI Layer

The AI layer analyzes ticket information and generates recommendations.

The AI workflow produces:

- Summary
- Category
- Priority
- Priority reason
- Recommended team
- Suggested response

AI suggestions are stored in the database and can subsequently be reviewed by support agents.

### Authentication Flow

Authentication uses JWT tokens.

The basic authentication flow is:

```text
User
  │
  ▼
Login
  │
  ▼
POST /auth/login
  │
  ▼
FastAPI
  │
  ▼
Validate Credentials
  │
  ▼
Generate JWT
  │
  ▼
Frontend
  │
  ▼
Store Access Token
  │
  ▼
Authenticated API Requests

### AI Review Flow

AI recommendations follow a human-in-the-loop workflow:

```text
Ticket
  │
  ▼
AI Analysis
  │
  ▼
AI Suggestion
  │
  ▼
Pending Review
  │
  ├──────────────┬──────────────┐
  ▼              ▼              ▼
Accept         Reject        Override
  │              │              │
  ▼              ▼              ▼
Accepted       Rejected      Overridden

## Setup Steps

Follow the steps below to set up 4Sight AI locally.

### Prerequisites

Make sure the following software is installed:

- Python 3.x
- Node.js
- npm
- Git
- A supported relational database

Verify the installations:

```bash
python --version
node --version
npm --version
git --version

### 1\. Clone the Repository

Clone the project repository:

git clone

Navigate into the project directory:

cd 4sight-ai

### 2\. Set Up the Backend

Navigate to the backend directory:

cd backend

Create a Python virtual environment:

python -m venv venv

Activate the virtual environment.

**Windows:**

venv\\Scripts\\activate

**macOS / Linux:**

source venv/bin/activate

Install the backend dependencies:

pip install -r requirements.txt

### 3\. Configure the Backend

Create a .env file inside the backend directory.

Configure the required database, authentication, and AI environment variables.

Refer to the **Environment Variables** section for the required configuration.

### 4\. Set Up the Database

Create the application database and configure the database connection.

Refer to the **Database Setup** section for detailed instructions.

### 5\. Set Up the Frontend

Open a new terminal and navigate to the frontend directory:

cd frontend

Install the frontend dependencies:

npm install

### 6\. Configure the Frontend

Create a .env file inside the frontend directory and configure the backend API URL.

Example:

VITE\_API\_BASE\_URL=[http://localhost:8000](http://localhost:8000)

### 7\. Start the Backend

From the backend directory, start the FastAPI development server:

uvicorn app.main:app --reload

The backend will be available at:

[http://localhost:8000](http://localhost:8000)

### 8\. Start the Frontend

From the frontend directory, start the Vite development server:

npm run dev

The frontend will normally be available at:

[http://localhost:5173](http://localhost:5173)

### 9\. Verify the Application

Open the frontend in a browser:

[http://localhost:5173](http://localhost:5173)

Verify that:

*   The login page loads successfully.
    
*   Users can log in.
    
*   The dashboard loads.
    
*   Tickets can be viewed and created.
    
*   Ticket details can be opened.
    
*   AI suggestions can be reviewed.
    
*   Activities can be viewed.
    

The backend API documentation can be accessed at:

[http://localhost:8000/docs](http://localhost:8000/docs)

## Database Setup

The 4Sight AI application uses SQLAlchemy to manage communication between the FastAPI backend and the relational database.

### 1. Create the Database

Create a database for the application using your configured relational database system.

Example database name:

4sight_ai

### 2. Configure the Database Connection

Create or update the `.env` file inside the `backend` directory.

Add the database connection string:

DATABASE_URL=your_database_connection_string

Replace the value with the connection string for your local or hosted database.

### 3. Database Models

The application uses SQLAlchemy models for the following entities:

- User
- Team
- Ticket
- AI Suggestion
- Comment
- Activity

These models define the structure and relationships of the application's database tables.

### 4. Initialize the Database

Make sure the database server is running and the `DATABASE_URL` is correctly configured.

Start the backend application:

uvicorn app.main:app --reload

The application will connect to the configured database and initialize the required database structure according to the project's database configuration.

### 5. Initial Data

The application requires initial data for proper operation.

This may include:

- Users
- Support teams
- User-team relationships
- Sample or existing tickets

The users and teams should be configured before testing ticket assignment and AI team recommendations.

### 6. Verify Database Connectivity

After starting the backend, open the FastAPI documentation:

http://localhost:8000/docs

Use the available API endpoints to verify that the application can successfully read and write database records.

For example:

- Login and authentication
- Creating a ticket
- Retrieving tickets
- Retrieving teams
- Retrieving users
- Creating comments
- Retrieving activities

### 7. Database Relationships

The main database relationships are:

Team → Users

Team → Tickets

User → Tickets

User → Comments

User → Activities

Ticket → AI Suggestions

Ticket → Comments

Ticket → Activities

### 8. Production Database Considerations

For production deployment:

- Use a secure database server.
- Use strong database credentials.
- Store database credentials in environment variables.
- Do not commit database credentials to Git.
- Restrict database access to authorized services.
- Enable regular database backups.
- Use database migrations for schema changes.

## Environment Variables

4Sight AI uses environment variables to store configuration values such as database credentials, authentication settings, AI configuration, and frontend API settings.

Environment variables should be configured separately for the backend and frontend.

### Backend Environment Variables

Create a `.env` file inside the `backend` directory.

The backend environment file should contain the following configuration:

DATABASE_URL=your_database_connection_string

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

AI_PROVIDER=your_ai_provider

AI_MODEL=your_ai_model

AI_API_KEY=your_ai_api_key

FRONTEND_URL=http://localhost:5173

### Backend Variable Description

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

### Frontend Environment Variables

Create a `.env` file inside the `frontend` directory.

Configure the backend API URL:

VITE_API_BASE_URL=http://localhost:8000

### Frontend Variable Description

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the FastAPI backend |

### Example Backend Configuration

DATABASE_URL=your_database_connection_string

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

AI_PROVIDER=your_ai_provider

AI_MODEL=your_ai_model

AI_API_KEY=your_ai_api_key

FRONTEND_URL=http://localhost:5173

### Example Frontend Configuration

VITE_API_BASE_URL=http://localhost:8000

### Security Notes

- Do not commit `.env` files to the Git repository.
- Do not expose the AI API key in frontend code.
- Do not hard-code database credentials.
- Use a strong and unique JWT secret key.
- Use separate environment variables for development and production.
- Replace development configuration with production values before deployment.

Add the following to `.gitignore` if not already present:

.env
.env.*

###  Seed Initial Data

After creating the database, initialize the required teams and users.

The project includes a seed script that creates the initial application data.

###  Create the Seed Script

Inside the `backend` directory, create a file named:

`seed.py`

The structure should be:

backend/
├── app/
├── seed.py
├── requirements.txt
└── .env

###  Seed Data

The seed script creates:

- Support teams
- Initial users
- User-team relationships

The following support teams are required by the application:

- Platform Engineering
- Application Engineering
- Security
- DevOps
- Database Team
- Billing Team
- Customer Support
- Product Team

###  Run the Seed Script

First activate the backend virtual environment.

Windows:

venv\Scripts\activate

macOS / Linux:

source venv/bin/activate

Make sure the database is running and the `DATABASE_URL` in `.env` is correct.

From the `backend` directory, run:

python seed.py

If the script completes successfully, the initial teams and users will be available in the database.

###  Verify Seeded Data

Start the FastAPI backend:

uvicorn app.main:app --reload

Open the API documentation:

http://localhost:8000/docs

Verify the seeded data using:

GET /teams

and:

GET /users

You should see the initial teams and users.

###  Seed Data Dependencies

The recommended initialization order is:

Database
   │
   ▼
Teams
   │
   ▼
Users
   │
   ▼
User-Team Relationships
   │
   ▼
Sample Tickets
   │
   ▼
AI Suggestions

Users should be associated with valid team IDs.

This is important because ticket assignment and AI recommendation override functionality use team IDs.

###  Example Seeded Data

Example team:

Team:

- ID: 3
- Name: Security

Example user:

User:

- ID: 5
- Name: Rahul
- Email: rahul@4sightai.demo
- Role: agent
- Team ID: 3

This allows the application to display:

Assigned Team: Security

Assignee: Rahul

###  Running the Seed Script Again

The seed script should check whether records already exist before inserting them.

Therefore, running:

python seed.py

multiple times should not create duplicate teams or users.

###  Important

Do not store real user passwords or production credentials inside the seed script.

Seed data is intended for local development, testing, and demonstration purposes.

For production environments, users and teams should be created using a secure administrative process.

## AI Model Configuration

4Sight AI uses an AI service to analyze customer support tickets and generate recommendations for support agents.

### AI Capabilities

The AI analysis generates the following information:

- Ticket summary
- Ticket category
- Ticket priority
- Priority reason
- Recommended support team
- Suggested customer response

### AI Configuration

AI configuration is managed through backend environment variables.

Add the following variables to the `backend/.env` file:

AI_PROVIDER=your_ai_provider

AI_MODEL=your_ai_model

AI_API_KEY=your_ai_api_key

### AI Provider

`AI_PROVIDER` identifies the AI service being used by the application.

Example:

AI_PROVIDER=OpenAI

The value should match the provider configured in the backend AI service.

### AI Model

`AI_MODEL` specifies the model used for ticket analysis.

Example:

AI_MODEL=your_model_name

The model name should correspond to a model supported by the configured AI provider.

### AI API Key

`AI_API_KEY` contains the authentication key required to communicate with the AI provider.

Example:

AI_API_KEY=your_api_key

The API key must be kept private and should never be committed to the Git repository.

### Example Configuration

A complete AI configuration can look like:

AI_PROVIDER=your_ai_provider

AI_MODEL=your_ai_model

AI_API_KEY=your_ai_api_key

Replace the placeholder values with the credentials and model configuration used by the project.

### AI Analysis Workflow

When an agent requests AI analysis for a ticket:

```text
Ticket
  │
  ▼
Analyze Request
  │
  ▼
Backend AI Service
  │
  ▼
Configured AI Provider
  │
  ▼
AI Model
  │
  ▼
AI Analysis
  │
  ├── Summary
  ├── Category
  ├── Priority
  ├── Priority Reason
  ├── Recommended Team
  └── Suggested Response
  │
  ▼
AI Suggestion
  │
  ▼
Database

## How to Run the Application

Follow the steps below to run the complete 4Sight AI application locally.

### 1. Start the Database

Make sure the configured relational database is running.

Verify that the database connection configured in:

`backend/.env`

is correct.

### 2. Start the Backend

Open a terminal and navigate to the backend directory:

cd backend

Activate the Python virtual environment.

Windows:

venv\Scripts\activate

macOS / Linux:

source venv/bin/activate

Start the FastAPI development server:

uvicorn app.main:app --reload

The backend will be available at:

http://localhost:8000

### 3. Verify the Backend

Open the FastAPI Swagger documentation:

http://localhost:8000/docs

The API documentation can be used to verify that the backend is running correctly.

### 4. Start the Frontend

Open a second terminal and navigate to the frontend directory:

cd frontend

Install dependencies if they have not already been installed:

npm install

Start the Vite development server:

npm run dev

The frontend will normally be available at:

http://localhost:5173

### 5. Open the Application

Open the following URL in a browser:

http://localhost:5173

The application will display the login page.

### 6. Login

Use a valid user account that exists in the application database.

After successful authentication, the user is redirected to the dashboard.

### 7. Verify the Main Features

After logging in, verify the following application features:

- Dashboard loads correctly.
- Ticket list loads correctly.
- Tickets can be searched and filtered.
- New tickets can be created.
- Ticket details can be viewed.
- Tickets can be edited.
- Tickets can be assigned to teams and agents.
- Ticket status can be updated.
- Tickets can be analyzed using AI.
- AI suggestions can be accepted, rejected, or overridden.
- Comments can be added to tickets.
- Ticket-specific activities are displayed.
- Global AI suggestions are displayed.
- Global activities are displayed.

### 8. Running Backend and Frontend Together

The complete local development setup requires two running processes.

Backend:

uvicorn app.main:app --reload

Frontend:

npm run dev

The frontend communicates with the backend using the configured API URL.

### Application URLs

Frontend:

http://localhost:5173

Backend:

http://localhost:8000

FastAPI Swagger Documentation:

http://localhost:8000/docs

FastAPI ReDoc Documentation:

http://localhost:8000/redoc

### Stopping the Application

To stop either development server, press:

Ctrl + C

in the corresponding terminal.

### Recommended Startup Order

For a fresh local setup, start the services in this order:

1. Start the database.
2. Activate the backend virtual environment.
3. Start the FastAPI backend.
4. Start the frontend development server.
5. Open the frontend application.
6. Log in and verify the application workflow.

## How to Run Tests

4Sight AI can be tested at both the backend API level and the frontend application level.

### Backend Tests

The backend uses Python-based testing tools.

First, navigate to the backend directory:

cd backend

Activate the virtual environment.

Windows:

venv\Scripts\activate

macOS / Linux:

source venv/bin/activate

Run the backend test suite:

pytest

For more detailed output:

pytest -v

### Testing the FastAPI APIs

FastAPI provides interactive API documentation that can be used for manual API testing.

Start the backend:

uvicorn app.main:app --reload

Open:

http://localhost:8000/docs

The Swagger interface can be used to test endpoints such as:

- Authentication
- Ticket creation
- Ticket retrieval
- Ticket updates
- Ticket assignment
- Ticket status updates
- AI analysis
- AI suggestion review
- AI suggestion rejection
- Comments
- Activities
- Teams
- Users
- Dashboard

### Frontend Tests

Navigate to the frontend directory:

cd frontend

Install dependencies if required:

npm install

Run the frontend test command configured in `package.json`:

npm test

If a test script is not configured, the frontend can be verified using the development server:

npm run dev

Then open:

http://localhost:5173

### Manual Frontend Verification

The following workflows should be manually verified:

#### Authentication

- Login with a valid user.
- Verify that the user is redirected to the dashboard.
- Verify that the logged-in user's name appears in the topbar.
- Verify that logout works.
- Verify that protected pages cannot be accessed without authentication.

#### Dashboard

- Verify dashboard summary values.
- Verify recent tickets.
- Verify team performance.
- Verify that dashboard data is loaded from the backend APIs.

#### Tickets

- Create a ticket.
- Search for a ticket.
- Filter tickets.
- Open ticket details.
- Edit ticket details.
- Assign a team.
- Assign an agent.
- Update ticket status.

#### AI Suggestions

- Analyze a ticket.
- Verify that the AI suggestion is created.
- Verify the category.
- Verify the priority.
- Verify the recommended team.
- Verify the suggested response.
- Accept an AI suggestion.
- Reject an AI suggestion.
- Override an AI suggestion.

#### Comments

- Add a comment to a ticket.
- Verify that the comment appears in the ticket details page.

#### Activities

- Verify ticket-specific activities.
- Verify global activities.
- Verify that activities are displayed in newest-first order.
- Verify Today and Yesterday grouping.

### API Error Testing

The application should also be checked for common API errors, including:

- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 405 Method Not Allowed
- 422 Unprocessable Content
- 500 Internal Server Error

The frontend should display appropriate loading, error, and empty states when API requests fail or return no data.

### Test Completion Checklist

Before considering the application ready for submission, verify:

- Login works.
- Logout works.
- Protected routes work.
- Dashboard loads correctly.
- Tickets load correctly.
- Ticket creation works.
- Ticket editing works.
- Assignment works.
- Status updates work.
- AI analysis works.
- AI suggestion review works.
- Comments work.
- Ticket activities work.
- Global activities work.
- No unexpected console errors are present.
- No unexpected API errors are present.

## Design Decisions

The design of 4Sight AI focuses on simplicity, maintainability, clear separation of responsibilities, and human oversight of AI-generated recommendations.

### 1. React for the Frontend

React was selected for building the frontend because it provides a component-based architecture and makes it easier to create reusable UI components.

React is used for:

- Dashboard
- Ticket management
- Ticket details
- AI suggestions
- Activity timeline
- Authentication
- Application layout

### 2. FastAPI for the Backend

FastAPI was selected as the backend framework because it provides:

- High-performance REST APIs
- Automatic API documentation
- Request validation
- Response validation
- Python-based AI integration
- Clean API structure

FastAPI also provides interactive Swagger documentation through `/docs`, which simplifies API testing during development.

### 3. REST API Communication

The frontend and backend communicate through REST APIs.

The frontend uses Axios to send HTTP requests to the FastAPI backend.

This separation allows the frontend and backend to be developed and maintained independently.

### 4. SQLAlchemy ORM

SQLAlchemy is used as the database ORM.

This allows the backend to work with database records through Python models instead of writing raw SQL for every database operation.

SQLAlchemy is used for entities such as:

- Users
- Teams
- Tickets
- AI Suggestions
- Comments
- Activities

### 5. Pydantic Validation

Pydantic schemas are used to validate API requests and structure API responses.

For example, ticket and AI-related requests are validated before being processed by the backend.

This helps prevent invalid data from entering the application.

### 6. JWT Authentication

JWT-based authentication is used to protect application routes and backend APIs.

After successful login, the backend returns an access token that is used for authenticated requests.

This provides a simple stateless authentication mechanism suitable for the application's REST API architecture.

### 7. Protected Frontend Routes

Application pages that require authentication are placed behind a protected route.

Unauthenticated users are prevented from accessing protected application pages and are redirected to the login flow.

### 8. Human-in-the-Loop AI

AI recommendations are intentionally treated as suggestions rather than final decisions.

The support agent can:

- Accept the AI recommendation
- Reject the AI recommendation
- Override the AI recommendation

This design reduces the risk of blindly applying incorrect AI-generated recommendations.

### 9. Separate AI Suggestions from Tickets

AI recommendations are stored in a separate `ai_suggestions` table instead of directly replacing ticket information.

This provides:

- Traceability
- Review status
- AI model information
- Historical recommendations
- Human review

The original ticket data can therefore be distinguished from AI-generated information.

### 10. Team and Agent Assignment

Tickets store both the assigned team and assigned agent.

The agent selection is based on the selected team.

This provides a clear relationship:

Team → Agent → Ticket

It also prevents agents from unrelated teams from being unnecessarily displayed during assignment.

### 11. Activity Tracking

Important ticket operations generate activity records.

This provides an audit-style timeline of actions such as:

- Ticket creation
- Assignment
- Status changes
- Comments
- AI suggestion review

Both ticket-specific and global activity views are provided.

### 12. Separate Dashboard APIs

Dashboard information is divided into separate backend endpoints:

- `/dashboard/summary`
- `/dashboard/recent-tickets`
- `/dashboard/team-performance`

This keeps the dashboard data modular and allows individual sections to be loaded independently.

### 13. Reusable API Layer

Frontend API requests are organized into separate API modules.

For example:

- `auth.js` handles authentication
- `tickets.js` handles ticket-related operations
- `dashboard.js` handles dashboard operations
- `axios.js` provides shared Axios configuration

This avoids duplicating API request logic across multiple React components.

### 14. Responsive UI

Tailwind CSS is used to create a responsive interface.

The application supports:

- Desktop layouts
- Mobile navigation
- Responsive tables
- Responsive forms
- Responsive cards
- Mobile sidebar behavior

### 15. Simple and Maintainable UI

The application uses a clean support-dashboard design rather than introducing unnecessary UI complexity.

Reusable components such as the sidebar, topbar, layouts, buttons, cards, tables, and status indicators help maintain visual consistency across the application.

### 16. Environment-Based Configuration

Sensitive and environment-specific configuration is stored in environment variables.

This includes:

- Database connection
- JWT secret
- AI provider
- AI model
- AI API key
- Frontend API URL

This prevents sensitive configuration from being hard-coded into the application.

### 17. Modular Architecture

The project separates responsibilities between:

- Frontend components
- Frontend API modules
- Backend routes
- Backend schemas
- Database models
- AI services

This makes the application easier to debug, extend, and maintain.

## Known Limitations

The current version of 4Sight AI provides the core ticket management and AI-assisted support workflow. The following limitations remain in the current implementation.

### 1. AI Dependency

AI ticket analysis depends on the availability of the configured AI provider.

If the AI provider is unavailable, the API key is invalid, the configured model is unavailable, or the provider reaches its usage limit, AI analysis may fail.

### 2. AI Accuracy

AI-generated recommendations may not always be correct.

This applies to:

- Ticket category
- Priority
- Priority reason
- Recommended team
- Suggested customer response

For this reason, AI recommendations require human review before being finalized.

### 3. No Real-Time Notifications

The notification icon in the topbar is currently a user-interface element and does not provide a complete real-time notification system.

The current implementation does not include:

- WebSocket notifications
- Push notifications
- Persistent notification history
- Real-time assignment alerts

### 4. No Real-Time Data Synchronization

The application primarily retrieves updated information through API requests.

If multiple agents modify the same ticket at the same time, changes may not appear immediately on another user's screen without refreshing or making another API request.

### 5. Attachment Handling

Tickets currently support an attachment URL field.

A complete production-ready file management system would require:

- Direct file uploads
- File type validation
- File size validation
- Secure file storage
- Access control
- Virus scanning
- Secure download URLs

### 6. Limited Role-Based Permissions

The application supports authenticated users and user roles, but a production system could provide more granular permission management.

For example:

- Admin permissions
- Manager permissions
- Agent permissions
- Read-only permissions

Individual API operations should also enforce authorization rules based on the user's role.

### 7. Basic Search

The current ticket search functionality provides basic ticket searching.

A more advanced implementation could support:

- Full-text search
- Customer-based search
- Team-based search
- Agent-based search
- Date-range search
- Combined advanced filters

### 8. Pagination Limitations

Ticket pagination is implemented using page and limit parameters.

For very large datasets, the application could be further optimized using:

- Cursor-based pagination
- Database indexing
- Query optimization
- Caching

### 9. No Advanced SLA Management

The current application does not provide a complete Service Level Agreement (SLA) management system.

Future implementations could include:

- SLA timers
- Response deadlines
- Resolution deadlines
- SLA breach notifications
- Priority-based SLA rules

### 10. Limited Analytics

The dashboard currently provides core ticket and team metrics.

More advanced analytics could include:

- Average resolution time
- Average first-response time
- Agent performance
- Team workload trends
- Ticket volume trends
- SLA compliance
- AI suggestion acceptance rate
- AI recommendation accuracy

### 11. AI Feedback Loop

The current system stores AI suggestions and their review status, but it does not automatically use agent feedback to retrain or fine-tune the AI model.

A future version could analyze accepted, rejected, and overridden suggestions to improve AI recommendations.

### 12. External Integrations

The current application does not provide direct integrations with external customer support platforms or communication systems.

Future integrations could include:

- Email
- Slack
- Microsoft Teams
- CRM platforms
- Customer support platforms
- Calendar systems

### 13. Production Scalability

The current implementation is primarily designed for development, demonstration, and technical assessment purposes.

A production deployment may require additional infrastructure such as:

- Load balancing
- Caching
- Background workers
- Queue management
- Database replication
- Centralized logging
- Monitoring
- Automated backups

### 14. Error Monitoring

The application provides frontend and backend error handling, but a production deployment could benefit from centralized error monitoring and logging.

Examples include:

- Application logs
- API request logs
- AI provider error logs
- Database error logs
- Centralized monitoring

### 15. Security Hardening

Additional security measures should be implemented before production deployment, including:

- HTTPS
- Strong password policies
- Rate limiting
- CORS restrictions
- Secure cookie configuration where applicable
- API authorization checks
- Secret rotation
- Database access restrictions
- Audit logging

### Summary

These limitations do not prevent the current application from demonstrating its primary functionality.

The current implementation focuses on:

- Ticket management
- Team and agent assignment
- AI-assisted ticket analysis
- Human review of AI suggestions
- Comments
- Activity tracking
- Dashboard monitoring

The listed limitations represent potential improvements for a future production-ready version of 4Sight AI.

## Author

**Manvitha Pola**

B.Tech in Artificial Intelligence and Machine Learning

4Sight AI — AI-Powered Customer Support Platform

---

## License

This project was developed as a technical assessment/project.

The source code is intended for evaluation and demonstration purposes.

© 2026 Manvitha Pola. All rights reserved.