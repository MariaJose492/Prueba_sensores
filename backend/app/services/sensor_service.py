from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.sensor import Sensor
from app.models.monitoring import Monitoring
from app.models.zone import Zone


class SensorService:

    # GET /sensors
    @staticmethod
    def get_all_sensors(db: Session):
        return db.query(Sensor).all()
    

    # GET /sensors/{sensor_id}/zones
    @staticmethod
    def get_zones_by_sensor(sensor_id: int, db: Session):

        sensor = (db.query(Sensor).filter(Sensor.id == sensor_id).first())

        if not sensor:
            raise HTTPException(
                status_code=404,
                detail=f"Sensor con id {sensor_id} no encontrado"
            )

        return (db.query(Zone).join(Monitoring).filter(Monitoring.sensor_id == sensor_id).all())