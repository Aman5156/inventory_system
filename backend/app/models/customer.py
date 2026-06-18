from sqlalchemy import Column, Integer, String, UniqueConstraint

from app.models.base import Base


class Customer(Base):

    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, unique=True, index=True)
    name = Column(String(200), nullable=True)

    __table_args__ = (
        UniqueConstraint("email", name="uq_customers_email"),
    )

