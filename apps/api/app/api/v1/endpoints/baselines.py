from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_baselines():
    return {'status': 'ok', 'component': 'baselines'}
