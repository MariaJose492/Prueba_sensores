from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db

from app.schemas.sensor_schema import SensorResponse
from app.services.sensor_service import SensorService
from app.schemas.zone_schema import ZoneResponse

router = APIRouter(prefix="/sensors", tags=["Sensors"])

# GET /sensors
@router.get("", response_model=list[SensorResponse])
def get_sensors(db: Session = Depends(get_db)):

    return SensorService.get_all_sensors(db)


# GET /sensors/{sensor_id}/zones
@router.get("/{sensor_id}/zones", response_model=list[ZoneResponse])
def get_sensor_zones(sensor_id: int, db: Session = Depends(get_db)):

    return SensorService.get_zones_by_sensor(sensor_id, db)