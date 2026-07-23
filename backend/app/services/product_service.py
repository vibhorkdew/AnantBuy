from sqlalchemy.orm import Session

from app.models.product import Product


def create_product(
        db: Session,
        product: Product
):

    db.add(product)

    db.commit()

    db.refresh(product)

    return product


def get_all_products(
        db: Session
):

    return db.query(Product).all()


def get_product_by_id(
        db: Session,
        product_id: int
):

    return (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )


def update_product(
        db: Session,
        product_id: int,
        product_data
):

    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        return None

    product.name = product_data.name
    product.description = product_data.description
    product.price = product_data.price
    product.stock = product_data.stock
    product.category = product_data.category
    product.brand = product_data.brand
    product.image_url = product_data.image_url
    product.rating = product_data.rating

    db.commit()
    db.refresh(product)

    return product


def delete_product(
        db: Session,
        product_id: int
):

    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        return None

    db.delete(product)
    db.commit()

    return True
def search_products(
        db: Session,
        name: str
):

    return (
        db.query(Product)
        .filter(Product.name.ilike(f"%{name}%"))
        .all()
    )