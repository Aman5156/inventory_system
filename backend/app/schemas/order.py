from datetime import datetime
from typing import List

from pydantic import BaseModel, Field


class OrderItemCreate(BaseModel):
    sku: str = Field(..., min_length=1, max_length=64)
    quantity: int = Field(..., gt=0)


class OrderCreate(BaseModel):
    customer_email: str = Field(..., min_length=3, max_length=255)
    items: List[OrderItemCreate] = Field(..., min_items=1)


class OrderItemOut(BaseModel):
    sku: str
    name: str
    quantity: int


class OrderOut(BaseModel):
    id: int
    customer_email: str
    created_at: datetime
    items: List[OrderItemOut]

    class Config:
        from_attributes = True

