from app.models.cart import Cart
from sqlalchemy.orm import joinedload
from fastapi import HTTPException


def add_to_cart(
    db,
    user_id,
    product_id,
    quantity
):

    existing_item = (
        db.query(Cart)
        .filter(
            Cart.user_id == user_id,
            Cart.product_id == product_id
        )
        .first()
    )


    if existing_item:

        existing_item.quantity += quantity

        db.commit()
        db.refresh(existing_item)

        return existing_item


    cart_item = Cart(
        user_id=user_id,
        product_id=product_id,
        quantity=quantity
    )

    db.add(cart_item)

    db.commit()

    db.refresh(cart_item)

    return cart_item


def get_cart(
    db,
    user_id
):
    return (
        db.query(Cart)
        .options(joinedload(Cart.product))
        .filter(Cart.user_id == user_id)
        .all()
    )


def delete_cart_item(
    db,
    user_id,
    cart_id
):

    cart_item = (
        db.query(Cart)
        .filter(
            Cart.id == cart_id,
            Cart.user_id == user_id
        )
        .first()
    )

    if not cart_item:

        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db.delete(cart_item)

    db.commit()

    return {
        "message": "Cart item removed"
    }




def update_cart_quantity(
    db,
    user_id,
    cart_id,
    quantity
):

    cart_item = (
        db.query(Cart)
        .filter(
            Cart.id == cart_id,
            Cart.user_id == user_id
        )
        .first()
    )

    if not cart_item:

        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    if quantity <= 0:

        db.delete(cart_item)

        db.commit()

        return {
            "message": "Item removed"
        }

    cart_item.quantity = quantity

    db.commit()

    db.refresh(cart_item)

    return cart_item