from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AGBS Preparación Física API",
    description="API para gestionar simulaciones y datos de preparación física.",
    version="0.1.0"
)

# CORS Configuration
# Adjust origins as needed for your development and production environments
# For development, you might use "http://localhost:5173" (default Vite port) or "*" (less secure, for testing)
# For production, specify your exact frontend domain.
origins = [
    "http://localhost:5173",  # Default Vite dev server port
    "http://localhost:3000",  # Common React dev server port
    # Add your production frontend URL here when you deploy
    # e.g., "https://your-frontend-domain.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of origins that are allowed to make requests
    allow_credentials=True, # Allow cookies to be included in requests
    allow_methods=["*"],    # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],    # Allow all headers
)

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Preparación Física AGBS"}

# Aquí se importarán y agregarán los routers de la API más adelante
# from .api.endpoints import users, simulations
# app.include_router(users.router, prefix="/users", tags=["users"])
# app.include_router(simulations.router, prefix="/simulations", tags=["simulations"])

# --- Database Table Creation ---
# This is a simple way to create tables for development.
# For production, you should use a migration tool like Alembic.
# To run this, you could uncomment it and start the FastAPI server once,
# or create a separate script.
# from app.db.session import engine
# from app.db.base_class import Base # models inherit from Base now

# def create_db_and_tables():
#     print("Creating database tables...")
#     try:
#         Base.metadata.create_all(bind=engine)
#         print("Database tables created successfully.")
#     except Exception as e:
#         print(f"Error creating database tables: {e}")

# # You might call this function at startup, perhaps guarded by a flag or command-line argument.
# # For example, during the first run or in a specific "init-db" script.
# # create_db_and_tables() # Uncomment to run on startup (ensure DB is ready and .env is configured)
# # IMPORTANT: Only run this once or use migrations to manage schema changes. Repeated calls are harmless
# # if tables exist but it's not a production practice for schema management.
