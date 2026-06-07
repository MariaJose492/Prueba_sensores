from pydantic import BaseModel
from datetime import date


class MonitoringCreate(BaseModel):
    sensor_id: int
    zona_id: int
    fecha_instalacion: date
    tipo_lectura: str
    valor_umbral: float


class MonitoringUpdate(BaseModel):
    valor_umbral: float | None = None
    estado_monitoreo: str | None = None
    

class MonitoringResponse(BaseModel):
    id: int
    sensor_id: int
    zona_id: int
    fecha_instalacion: date
    tipo_lectura: str
    valor_umbral: float
    estado_monitoreo: str

    class Config:
        from_attributes = True