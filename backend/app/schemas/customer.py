from typing import Optional

from pydantic import BaseModel, Field


class CustomerBase(BaseModel):
    email: str = Field(..., min_length=3, max_length=255)
    name: Optional[str] = Field(None, max_length=200)


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    email: Optional[str] = Field(None, min_length=3, max_length=255)
    name: Optional[str] = Field(None, max_length=200)


class CustomerOut(CustomerBase):
    id: int

    class Config:
        from_attributes = True

