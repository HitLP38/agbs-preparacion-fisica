from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Base schemas (common attributes)
class ExerciseRecordBase(BaseModel):
    exercise_name: str
    score: Optional[float] = None
    raw_value: Optional[str] = None

# Schema for creation (attributes needed when creating)
class ExerciseRecordCreate(ExerciseRecordBase):
    pass

# Schema for updating (all fields optional for PATCH)
class ExerciseRecordUpdate(ExerciseRecordBase):
    exercise_name: Optional[str] = None

# Schema for reading from DB (includes id and timestamps)
class ExerciseRecordInDBBase(ExerciseRecordBase):
    id: int
    simulation_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True # Changed from from_attributes for Pydantic v2+ compatibility

# Schema for API response (what the client receives)
class ExerciseRecordRead(ExerciseRecordInDBBase):
    pass


# --- Simulation Schemas ---
class SimulationBase(BaseModel):
    total_score: Optional[float] = None
    date: Optional[datetime] = None # Will default to now in model

class SimulationCreate(SimulationBase):
    user_id: str # clerk_user_id
    exercise_records: List[ExerciseRecordCreate] = []

class SimulationUpdate(SimulationBase):
    total_score: Optional[float] = None
    exercise_records: Optional[List[ExerciseRecordUpdate]] = None # Allow updating records

class SimulationInDBBase(SimulationBase):
    id: int
    user_id: str # clerk_user_id
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class SimulationRead(SimulationInDBBase):
    exercise_records: List[ExerciseRecordRead] = []


# --- User Schemas ---
class UserBase(BaseModel):
    clerk_user_id: str
    grade: Optional[str] = None
    gender: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel): # Separate update schema if fields differ significantly
    grade: Optional[str] = None
    gender: Optional[str] = None

class UserInDBBase(UserBase):
    id: int # Internal DB id
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class UserRead(UserInDBBase):
    simulations: List[SimulationRead] = [] # Include simulations when reading a user

# For cases where you only want user info without simulations for SimulationRead
class UserReadMinimal(UserInDBBase):
    pass

# Update SimulationRead to use UserReadMinimal to avoid circular dependencies if UserRead includes full simulations
class SimulationReadWithUserMinimal(SimulationInDBBase):
    user: UserReadMinimal # Representing the user associated with the simulation
    exercise_records: List[ExerciseRecordRead] = []

# Re-define UserRead to use SimulationRead (without user details in simulation to avoid deep nesting)
class SimulationReadForUser(SimulationInDBBase): # Simulation data without user details for UserRead
    exercise_records: List[ExerciseRecordRead] = []

class UserReadWithSimulations(UserInDBBase):
    simulations: List[SimulationReadForUser] = []

# Choose the appropriate Read schemas based on nesting needs to avoid excessive data or circular issues.
# For now, the initial UserRead and SimulationRead provide a common starting point.
