from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_validate():
    return {'status': 'ok', 'component': 'validate'}
