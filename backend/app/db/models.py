from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base # Replaced by custom Base
from sqlalchemy.sql import func
from .base_class import Base # Import Base from base_class.py

# Base = declarative_base() # No longer needed

class User(Base):
    # __tablename__ = "users" # Handled by Base now if using that convention

    id = Column(Integer, primary_key=True, index=True, autoincrement=True) # Explicit PK
    clerk_user_id = Column(String, unique=True, index=True, nullable=False)
    grade = Column(String, nullable=True)
    gender = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    simulations = relationship("Simulation", back_populates="user")

class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.clerk_user_id"), nullable=False) # Changed to link via clerk_user_id for consistency
    date = Column(DateTime(timezone=True), server_default=func.now())
    total_score = Column(Float, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="simulations")
    exercise_records = relationship("ExerciseRecord", back_populates="simulation", cascade="all, delete-orphan")

class ExerciseRecord(Base):
    __tablename__ = "exercise_records"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    simulation_id = Column(Integer, ForeignKey("simulations.id"), nullable=False)
    exercise_name = Column(String, nullable=False)
    score = Column(Float, nullable=True)
    raw_value = Column(String, nullable=True) # E.g., "10 reps", "2:30 min"

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    simulation = relationship("Simulation", back_populates="exercise_records")

# Example of how to create tables (usually in main.py or a db setup script)
# from sqlalchemy import create_engine
# DATABASE_URL = "postgresql://user:password@host:port/database"
# engine = create_engine(DATABASE_URL)
# Base.metadata.create_all(bind=engine)
