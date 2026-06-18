import os
from dataclasses import dataclass


def _get_env(name: str, default: str | None = None) -> str:
    """Read environment variables.

    Note: python-dotenv can load values from a .env file into os.environ.
    """
    val = os.getenv(name)
    return val if val is not None and val != "" else (default if default is not None else "")


@dataclass(frozen=True)
class Settings:
    # Postgres connection
    postgres_user: str = _get_env("POSTGRES_USER", "inventory_uii4_user")
    postgres_password: str = _get_env("POSTGRES_PASSWORD", "RAaw4Rq6HfA5vl9xUUaVL46S089wcTbD")
    postgres_host: str = _get_env("POSTGRES_HOST", "localhost")
    postgres_port: str = _get_env("POSTGRES_PORT", "5432")
    postgres_db: str = _get_env("POSTGRES_DB", "inventory_uii4")

    # CORS
    cors_allow_origin: str = _get_env("CORS_ALLOW_ORIGIN", "*")


settings = Settings()

