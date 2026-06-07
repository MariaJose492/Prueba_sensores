from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy import func

from app.models.sensor import Sensor
from app.models.monitoring import Monitoring
from app.models.zone import Zone


class ZoneService:

    # GET ALL ZONES
    @staticmethod
    def get_all_zones(db: Session):

        zones = (

            db.query(

                Zone.id,
                Zone.nombre,
                Zone.descripcion,
                Zone.ubicacion,
                Zone.estado_operativo,

                func.count(Monitoring.id).label("sensores_activos")
            )

            .outerjoin(
                Monitoring,
                (Monitoring.zona_id == Zone.id) &
                (Monitoring.estado_monitoreo == "activo")
            )

            .group_by(Zone.id)

            .all()
        )

        return zones


    # GET ZONES BY SENSOR ID
    @staticmethod
    def get_zone_by_id(zone_id: int, db: Session):
        return (db.query(Zone).filter(Zone.id == zone_id).first())


    # GET SENSORS BY ZONE ID
    @staticmethod
    def get_sensors_by_zone(zone_id: int, db: Session):

        zone = ZoneService.get_zone_by_id(zone_id, db)

        if not zone:
            raise HTTPException(
                status_code=404,
                detail=f"Zona con id {zone_id} no encontrada"
            )

        return (
            db.query(Sensor)
            .join(Monitoring)
            .filter(
                Monitoring.zona_id == zone_id,
                Monitoring.estado_monitoreo == "activo"
            )
            .distinct()
            .all()
        )