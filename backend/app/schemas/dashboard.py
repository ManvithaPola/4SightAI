from pydantic import BaseModel
from datetime import datetime


class DashboardSummaryResponse(BaseModel):

    total_tickets: int

    open_tickets: int

    assigned_tickets: int

    in_progress_tickets: int

    waiting_for_customer_tickets: int

    resolved_tickets: int

    closed_tickets: int

    critical_tickets: int
    
class RecentTicketResponse(BaseModel):

    id: int
    customer_name: str
    subject: str
    category: str | None
    priority: str | None
    status: str
    created_at: datetime 
    
class TeamPerformanceResponse(BaseModel):

    team_id: int
    team_name: str

    total_tickets: int
    open_tickets: int
    assigned_tickets: int
    in_progress_tickets: int
    waiting_for_customer_tickets: int
    resolved_tickets: int
    closed_tickets: int