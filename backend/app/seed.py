from app.core.database import Base, SessionLocal, engine
from app.core.security import hash_password
from app.models.user import User
from app.models.team import Team


def seed_database():

    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        # ---------------------------------
        # Teams
        # ---------------------------------

        teams_data = [
            ("Platform Engineering", "Platform and infrastructure support"),
            ("Application Engineering", "Application-level technical support"),
            ("Security", "Security and access issues"),
            ("DevOps", "Deployment and infrastructure operations"),
            ("Database Team", "Database and data issues"),
            ("Billing Team", "Billing and payment support"),
            ("Customer Support", "General customer support"),
            ("Product Team", "Product and feature requests"),
        ]

        teams = {}

        for name, description in teams_data:
            team = db.query(Team).filter(Team.name == name).first()

            if not team:
                team = Team(name=name, description=description, is_active=True)

                db.add(team)
                db.flush()

            teams[name] = team.id

        # ---------------------------------
        # Users
        # ---------------------------------

        users_data = [
            {
                "name": "Manvitha",
                "email": "manvitha@4sightai.demo",
                "password": "password123",
                "team": "Platform Engineering",
            },
            {
                "name": "Priya",
                "email": "priya@4sightai.demo",
                "password": "password123",
                "team": "Platform Engineering",
            },
            {
                "name": "Rahul",
                "email": "rahul@4sightai.demo",
                "password": "password123",
                "team": "Application Engineering",
            },
            {
                "name": "Karthik",
                "email": "karthik@4sightai.demo",
                "password": "password123",
                "team": "Application Engineering",
            },
            {
                "name": "Ananya",
                "email": "ananya@4sightai.demo",
                "password": "password123",
                "team": "Security",
            },
            {
                "name": "Sneha",
                "email": "sneha@4sightai.demo",
                "password": "password123",
                "team": "Security",
            },
            {
                "name": "Arjun",
                "email": "arjun@4sightai.demo",
                "password": "password123",
                "team": "DevOps",
            },
            {
                "name": "Vikram",
                "email": "vikram@4sightai.demo",
                "password": "password123",
                "team": "DevOps",
            },
            {
                "name": "Neha",
                "email": "neha@4sightai.demo",
                "password": "password123",
                "team": "Database Team",
            },
            {
                "name": "Aditya",
                "email": "aditya@4sightai.demo",
                "password": "password123",
                "team": "Database Team",
            },
            {
                "name": "Meera",
                "email": "meera@4sightai.demo",
                "password": "password123",
                "team": "Billing Team",
            },
            {
                "name": "Rohan",
                "email": "rohan@4sightai.demo",
                "password": "password123",
                "team": "Billing Team",
            },
            {
                "name": "Pooja",
                "email": "pooja@4sightai.demo",
                "password": "password123",
                "team": "Customer Support",
            },
            {
                "name": "Suresh",
                "email": "suresh@4sightai.demo",
                "password": "password123",
                "team": "Customer Support",
            },
            {
                "name": "Divya",
                "email": "divya@4sightai.demo",
                "password": "password123",
                "team": "Product Team",
            },
            {
                "name": "Nikhil",
                "email": "nikhil@4sightai.demo",
                "password": "password123",
                "team": "Product Team",
            },
        ]
        for user_data in users_data:
            existing_user = (
                db.query(User).filter(User.email == user_data["email"]).first()
            )

            if not existing_user:
                user = User(
                    name=user_data["name"],
                    email=user_data["email"],
                    password_hash=hash_password(user_data["password"]),
                    role="agent",
                    team_id=teams[user_data["team"]],
                    is_active=True,
                )

                db.add(user)

        db.commit()

        print("Database seeded successfully.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
