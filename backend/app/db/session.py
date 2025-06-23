from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from typing import Generator

from app.core.config import settings

# Ensure SQLALCHEMY_DATABASE_URI is available
if settings.SQLALCHEMY_DATABASE_URI is None:
    raise ValueError("SQLALCHEMY_DATABASE_URI is not configured. Please check your .env file or environment variables.")

engine = create_engine(settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db() -> Generator:
    """
    Dependency to get a database session.
    Ensures the session is closed after the request.
    """
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
