import json

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User
from app.schemas.user_schema import UserLogin, UserRegister
from app.security.auth_handler import hash_password, verify_password
from app.security.jwt_handler import create_access_token
from app.services.user_services import create_user, get_user_by_email
from app.utils.logger import logger

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        logger.warning(json.dumps({
            "event": "USER_REGISTER",
            "email": user.email,
            "status": "FAILED",
            "reason": "Email already exists"
        }))
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role="ADMIN"
    )

    create_user(db, new_user)

    log = {
        "event": "USER_REGISTER",
        "username": user.name,
        "email": user.email,
        "status": "SUCCESS"
    }

    print(json.dumps(log), flush=True)
    logger.info(json.dumps(log))

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(
    request: Request,
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = get_user_by_email(db, user.email)

    if not db_user:
        log = {
            "event": "LOGIN_FAILED",
            "email": user.email,
            "reason": "User not found"
        }
        print(json.dumps(log), flush=True)
        logger.warning(json.dumps(log))

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(user.password, db_user.password):
        log = {
            "event": "LOGIN_FAILED",
            "email": user.email,
            "reason": "Wrong password"
        }
        print(json.dumps(log), flush=True)
        logger.warning(json.dumps(log))

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token({
        "user_id": db_user.id,
        "sub": db_user.email,
        "role": db_user.role
    })

    log = {
        "event": "USER_LOGIN",
        "username": db_user.name,
        "email": db_user.email,
        "role": db_user.role,
        "status": "SUCCESS",
        "ip": request.client.host
    }

    print(json.dumps(log), flush=True)
    logger.info(json.dumps(log))

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }