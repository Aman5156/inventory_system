from typing import Dict

from sqlalchemy.orm import Session

from backend.app.models.customer import Customer
from backend.app.models.order import Order
from backend.app.models.order_item import OrderItem
from backend.app.models.product import Product




class InsufficientStockError(Exception):
    def __init__(self, sku: str, available: int, requested: int):
        self.sku = sku
        self.available = available
        self.requested = requested
        super().__init__(f"Insufficient stock for {sku}. Available={available}, Requested={requested}")


def create_order_with_validation(
    db: Session,
    *,
    customer_email: str,
    items: list[dict],
) -> Order:
    """Atomically validate stock, then reduce stock and create order.

    items: [{sku, quantity}]
    """

    # SQLAlchemy transaction: begin() will commit/rollback on exit
    customer = db.query(Customer).filter(Customer.email == customer_email).one_or_none()
    if customer is None:
        raise ValueError("Customer not found")

    # Lock products to prevent race conditions while reducing stock
    skus = [i["sku"] for i in items]
    quantities_by_sku: Dict[str, int] = {i["sku"]: i["quantity"] for i in items}

    products = (
        db.query(Product)
        .filter(Product.sku.in_(skus))
        .with_for_update()
        .all()
    )
    products_by_sku = {p.sku: p for p in products}

    missing = [sku for sku in skus if sku not in products_by_sku]
    if missing:
        raise ValueError(f"Products not found: {', '.join(missing)}")

    # Validate stock
    for sku, qty in quantities_by_sku.items():
        p = products_by_sku[sku]
        if p.stock < qty:
            raise InsufficientStockError(sku=sku, available=p.stock, requested=qty)

    # Reduce stock
    for sku, qty in quantities_by_sku.items():
        p = products_by_sku[sku]
        p.stock -= qty

    order = Order(customer_id=customer.id)
    db.add(order)
    db.flush()  # assign order.id

    for sku, qty in quantities_by_sku.items():
        p = products_by_sku[sku]
        order_item = OrderItem(order_id=order.id, product_id=p.id, quantity=qty)
        order.items.append(order_item)

    db.flush()
    db.refresh(order)
    return order

