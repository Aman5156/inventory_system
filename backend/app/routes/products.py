from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate


router = APIRouter(prefix="/products", tags=["products"])


@router.post("", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    existing = db.query(Product).filter(Product.sku == payload.sku).one_or_none()
    if existing:
        raise HTTPException(status_code=409, detail="SKU already exists")

    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.get("", response_model=List[ProductOut])
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).order_by(Product.id.desc()).all()


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.patch("/{product_id}", response_model=ProductOut)
def update_product(product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    data = payload.model_dump(exclude_unset=True)
    if "sku" in data and data["sku"] != product.sku:
        other = db.query(Product).filter(Product.sku == data["sku"]).one_or_none()
        if other:
            raise HTTPException(status_code=409, detail="SKU already exists")

    for k, v in data.items():
        setattr(product, k, v)

    db.commit()
    db.refresh(product)
    return product


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return None

