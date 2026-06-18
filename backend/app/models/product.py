from sqlalchemy import Column, Integer, String, UniqueConstraint

from app.models.base import Base


class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String(64), nullable=False, unique=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(String(1000), nullable=True)
    stock = Column(Integer, nullable=False, default=0)

    __table_args__ = (
        UniqueConstraint("sku", name="uq_products_sku"),
    )

