from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_remediate():
    return {'status': 'ok', 'component': 'remediate'}
