from pydantic import BaseModel


class MonitoringDetailResponse(BaseModel):

    monitoring_id: int
    sensor_id: int
    sensor_nombre: str
    sensor_tipo: str
    tipo_lectura: str
    valor_umbral: float
    estado_monitoreo: str
    valor_actual: int
    supera_umbral: bool