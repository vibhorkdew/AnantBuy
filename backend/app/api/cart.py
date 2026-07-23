from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.security.oauth2 import get_current_user

from app.schemas.cart_schema import CartCreate, CartUpdate, CartResponse

from app.services.cart_service import (
    add_to_cart,
    get_cart,
    delete_cart_item,
    update_cart_quantity
)

router = APIRouter(
    prefix="/api/cart",
    tags=["Cart"]
)


@router.post("/")
def add_item(
    cart: CartCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return add_to_cart(
        db,
        current_user["user_id"],
        cart.product_id,
        cart.quantity
    )


@router.get("/", response_model=list[CartResponse])
def view_cart(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_cart(
        db,
        current_user["user_id"]
    )



@router.delete("/{cart_id}")
def remove_item(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return delete_cart_item(
        db,
        current_user["user_id"],
        cart_id
    )


@router.put("/{cart_id}")
def update_quantity(
    cart_id: int,
    cart: CartUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return update_cart_quantity(
        db,
        current_user["user_id"],
        cart_id,
        cart.quantity
    )