from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

from app.models import (
    Activity,
    AISuggestion,
    Comment,
    Team,
    Ticket,
    User,
)

from app.routes.auth import router as auth_router
from app.routes.ticket import router as ticket_router
from app.routes.comments import router as comments_router
from app.routes import dashboard
from app.routes.team import router as team_router
from app.routes.users import router as users_router
# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="4Sight AI Support Ticket System",
    description="AI-assisted support ticket triage and assignment system",
    version="1.0.0",
)


# --------------------------------------------------
# CORS Configuration
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# API Routers
# --------------------------------------------------

app.include_router(auth_router)

app.include_router(ticket_router)

app.include_router(comments_router)

app.include_router(dashboard.router)

app.include_router(team_router)

app.include_router(users_router)

# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }