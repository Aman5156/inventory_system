from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from backend.app.models.base import Base


class OrderItem(Base):

    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False, index=True)
    quantity = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")

