from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.zone_schema import ZoneResponse
from app.schemas.sensor_schema import SensorResponse
from app.services.zone_service import ZoneService


router = APIRouter(prefix="/zones", tags=["Zones"])

# GET /zones
@router.get("", response_model=list[ZoneResponse])
def get_zones(db: Session = Depends(get_db)):
    return ZoneService.get_all_zones(db)


# GET /zones/{zone_id}
@router.get("/{zone_id}/sensors", response_model=list[SensorResponse])
def get_zone_sensors(zone_id: int, db: Session = Depends(get_db)):
    return ZoneService.get_sensors_by_zone(zone_id, db)