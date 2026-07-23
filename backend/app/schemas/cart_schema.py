from pydantic import BaseModel
from app.schemas.product_schema import ProductResponse


class CartCreate(BaseModel):
    product_id: int
    quantity: int


class CartUpdate(BaseModel):
    quantity: int


class CartResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int
    product: ProductResponse

    class Config:
        from_attributes = True