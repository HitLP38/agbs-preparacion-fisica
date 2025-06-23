from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "AGBS Preparación Física API"
    API_V1_STR: str = "/api/v1"

    # Database settings
    POSTGRES_SERVER: Optional[str] = "localhost"
    POSTGRES_USER: Optional[str] = "postgres"
    POSTGRES_PASSWORD: Optional[str] = "password"
    POSTGRES_DB: Optional[str] = "agbs_db"
    POSTGRES_PORT: Optional[str] = "5432"

    SQLALCHEMY_DATABASE_URI: Optional[str] = None

    # Clerk settings (replace with your actual keys from Clerk dashboard)
    CLERK_FRONTEND_API: Optional[str] = "clerk.xxxx.lcl.dev" # Example, get from Clerk
    CLERK_API_KEY: Optional[str] = "SK_test_xxxxxxx" # Example, get from Clerk (Secret Key)
    CLERK_JWT_ISSUER: Optional[str] = "https://clerk.xxxx.lcl.dev" # Example, get from Clerk, e.g. https://clerk.your-domain.com or https://your-project-name.clerk.accounts.dev

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'
        case_sensitive = True

settings = Settings()

# Construct DATABASE_URI if not set directly
if not settings.SQLALCHEMY_DATABASE_URI and \
   settings.POSTGRES_USER and \
   settings.POSTGRES_PASSWORD and \
   settings.POSTGRES_SERVER and \
   settings.POSTGRES_DB and \
   settings.POSTGRES_PORT:
    settings.SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@"
        f"{settings.POSTGRES_SERVER}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
    )
elif not settings.SQLALCHEMY_DATABASE_URI:
    # Fallback or warning if essential DB components are missing and URI is not set
    print("Warning: SQLALCHEMY_DATABASE_URI is not set and not all PostgreSQL components are defined.")
    # You might want to raise an error here or provide a default SQLite for local dev
    # settings.SQLALCHEMY_DATABASE_URI = "sqlite:///./test.db" # Example fallback for local dev without Postgres

# Note: For production, ensure .env is properly configured and secured.
# You will need to create a .env file in the backend directory with your actual database credentials and Clerk keys.
# Example .env file:
# POSTGRES_USER=myuser
# POSTGRES_PASSWORD=mypassword
# POSTGRES_SERVER=localhost
# POSTGRES_DB=mydb
# POSTGRES_PORT=5432
# CLERK_API_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# CLERK_FRONTEND_API=clerk.yourdomain.com
# CLERK_JWT_ISSUER=https://clerk.yourdomain.com
