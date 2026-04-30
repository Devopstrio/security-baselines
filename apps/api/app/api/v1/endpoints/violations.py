from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/')
def list_violations():
    return {'violations': [{'id': 'v-001', 'key': 'allowPrivilegeEscalation', 'expected': False, 'actual': True, 'severity': 'HIGH'}]}
@router.post('/resolve')
def resolve_violation(data: dict = Body(...)):
    return {'status': 'REMEDIATED', 'violation_id': 'v-001'}
