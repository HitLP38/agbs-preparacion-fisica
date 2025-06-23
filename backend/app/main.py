from fastapi import FastAPI

app = FastAPI(
    title="AGBS Preparación Física API",
    description="API para gestionar simulaciones y datos de preparación física.",
    version="0.1.0"
)

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Preparación Física AGBS"}

# Aquí se importarán y agregarán los routers de la API más adelante
# from .api.endpoints import users, simulations
# app.include_router(users.router, prefix="/users", tags=["users"])
# app.include_router(simulations.router, prefix="/simulations", tags=["simulations"])

# Placeholder for DB creation (development only, consider Alembic for migrations)
# from .db.session import engine
# from .db import models
# models.Base.metadata.create_all(bind=engine)
