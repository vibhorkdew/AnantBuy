import requests
import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            ".."
        )
    )
)

from app.database.database import SessionLocal
from app.models.product import Product


db = SessionLocal()
if db.query(Product).count() > 0:
    print("Products already exist.")
    exit()

response = requests.get(
    "https://dummyjson.com/products?limit=100"
)

products = response.json()["products"]

for item in products:

    exists = (
        db.query(Product)
        .filter(Product.name == item["title"])
        .first()
    )

    if exists:
        continue

    product = Product(
        name=item["title"],
        description=item["description"],
        category=item["category"],
        brand=item.get("brand", "Unknown"),
        image_url=item["thumbnail"],
        rating=item["rating"],
        price=item["price"],
        stock=item["stock"]
    )

    db.add(product)

db.commit()

print("Products Imported Successfully")
