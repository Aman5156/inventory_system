from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderOut
from app.services.inventory_service import InsufficientStockError, create_order_with_validation


router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderOut, status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    try:
        with db.begin():
            order = create_order_with_validation(
                db,
                customer_email=payload.customer_email,
                items=[{"sku": it.sku, "quantity": it.quantity} for it in payload.items],
            )

        # Build output with product details
        # Ensure items/product relationships are loaded
        items_out = []
        # query join for stable output
        rows = (
            db.query(Product.sku, Product.name, OrderItem.quantity)
            .join(OrderItem, OrderItem.product_id == Product.id)
            .filter(OrderItem.order_id == order.id)
            .all()
        )
        for sku, name, qty in rows:
            items_out.append({"sku": sku, "name": name, "quantity": qty})

        return {
            "id": order.id,
            "customer_email": payload.customer_email,
            "created_at": order.created_at,
            "items": items_out,
        }

    except InsufficientStockError as e:
        raise HTTPException(
            status_code=409,
            detail={"error": "insufficient_stock", "sku": e.sku, "available": e.available, "requested": e.requested},
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    customer_email = order.customer.email
    rows = (
        db.query(Product.sku, Product.name, OrderItem.quantity)
        .join(OrderItem, OrderItem.product_id == Product.id)
        .filter(OrderItem.order_id == order.id)
        .all()
    )
    items_out = [{"sku": sku, "name": name, "quantity": qty} for sku, name, qty in rows]

    return {
        "id": order.id,
        "customer_email": customer_email,
        "created_at": order.created_at,
        "items": items_out,
    }

