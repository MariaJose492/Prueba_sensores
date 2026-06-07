from fastapi import APIRouter
from fastapi import Depends
from typing import Optional
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.monitoring_schema import (MonitoringCreate,MonitoringResponse)
from app.services.monitoring_service import MonitoringService
from app.schemas.monitoring_schema import MonitoringUpdate


router = APIRouter(prefix="/monitorings", tags=["Monitorings"])

# POST /monitorings
@router.post("", response_model=MonitoringResponse, status_code=201)
def create_monitoring(monitoring: MonitoringCreate, db: Session = Depends(get_db)):

    return MonitoringService.create_monitoring(monitoring, db)

# UPDATE /monitorings/{monitoring_id}
@router.patch("/{monitoring_id}", response_model=MonitoringResponse)
def update_monitoring(monitoring_id: int, monitoring_data: MonitoringUpdate, db: Session = Depends(get_db)):

    return MonitoringService.update_monitoring(monitoring_id, monitoring_data, db)

# GET /monitorings?status=activo|pausado
@router.get("", response_model=list[MonitoringResponse])
def get_monitorings(status: Optional[str] = None, db: Session = Depends(get_db)):

    return MonitoringService.get_monitorings(status, db)