from pydantic import BaseModel
from datetime import date


class SensorResponse(BaseModel):
    id: int
    nombre: str
    tipo: str
    fabricante: str
    fecha_fabricacion: date

    class Config:
        from_attributes = True