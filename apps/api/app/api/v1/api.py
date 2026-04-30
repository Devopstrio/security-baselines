from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, baselines, validate, violations, remediate, policy, audit, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(baselines.router, prefix="/baselines", tags=["baselines"])
api_router.include_router(validate.router, prefix="/validate", tags=["validate"])
api_router.include_router(violations.router, prefix="/violations", tags=["violations"])
api_router.include_router(remediate.router, prefix="/remediate", tags=["remediate"])
api_router.include_router(policy.router, prefix="/policy", tags=["policy"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
