from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.customers import router as customers_router
from app.routes.orders import router as orders_router
from app.routes.products import router as products_router

from app.database import engine

# Import all models so SQLAlchemy knows about them
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order
from app.models.order_item import OrderItem

# Import Base
from app.models import Base

app = FastAPI(title="Inventory & Orders API")

# Create tables
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router)
app.include_router(customers_router)
app.include_router(orders_router)