from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.monitoring import Monitoring
from app.models.sensor import Sensor
from app.models.zone import Zone

class MonitoringService:

    # GET /monitorings?status=activo|pausado
    @staticmethod
    def get_monitorings(status: str | None,db: Session):

        query = db.query(Monitoring)

        if status:

            estados_validos = ["activo", "pausado"]

            if status not in estados_validos:
                raise HTTPException(
                    status_code=400,
                    detail="El parámetro status debe ser 'activo' o 'pausado'"
                )

            query = query.filter(
                Monitoring.estado_monitoreo == status
            )

        return query.all()
    

    # CREATE /monitorings
    @staticmethod
    def create_monitoring(data, db: Session):

        sensor = (db.query(Sensor).filter(Sensor.id == data.sensor_id).first())

        if not sensor:
            raise HTTPException(
                status_code=404,
                detail=f"Sensor con id {data.sensor_id} no encontrado"
            )

        zone = (db.query(Zone).filter(Zone.id == data.zona_id).first())

        if not zone:
            raise HTTPException(
                status_code=404,
                detail=f"Zona con id {data.zona_id} no encontrada"
            )

        existing_monitoring = (db.query(Monitoring)
            .filter(
                Monitoring.sensor_id == data.sensor_id,
                Monitoring.zona_id == data.zona_id
            )
            .first()
        )

        if existing_monitoring:
            raise HTTPException(
                status_code=400,
                detail=f"El sensor {data.sensor_id} ya se encuentra asignado a la zona {data.zona_id}"
            )

        if data.tipo_lectura != sensor.tipo:
            raise HTTPException(
                status_code=400,
                detail=f"El tipo de lectura '{data.tipo_lectura}' no coincide con el tipo del sensor '{sensor.tipo}'"
            )

        monitoring = Monitoring(
            sensor_id=data.sensor_id,
            zona_id=data.zona_id,
            fecha_instalacion=data.fecha_instalacion,
            tipo_lectura=data.tipo_lectura,
            valor_umbral=data.valor_umbral,
            estado_monitoreo="activo"
        )

        db.add(monitoring)
        db.commit()
        db.refresh(monitoring)

        return monitoring
    

    # UPDATE /monitorings/{monitoring_id}
    @staticmethod
    def update_monitoring(monitoring_id: int,data,db: Session):

        monitoring = (
            db.query(Monitoring)
            .filter(Monitoring.id == monitoring_id)
            .first()
        )

        if not monitoring:
            raise HTTPException(
                status_code=404,
                detail=f"Monitoreo con id {monitoring_id} no encontrado"
            )

        if data.valor_umbral is not None:

            if data.valor_umbral <= 0:
                raise HTTPException(
                    status_code=400,
                    detail="El valor umbral debe ser mayor que cero"
                )

            monitoring.valor_umbral = data.valor_umbral

        if data.estado_monitoreo is not None:

            estados_validos = ["activo", "pausado"]

            if data.estado_monitoreo not in estados_validos:
                raise HTTPException(
                    status_code=400,
                    detail="El estado_monitoreo debe ser 'activo' o 'pausado'"
                )

            monitoring.estado_monitoreo = data.estado_monitoreo

        db.commit()
        db.refresh(monitoring)

        return monitoring