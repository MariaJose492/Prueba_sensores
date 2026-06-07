from pydantic import BaseModel


class ZoneResponse(BaseModel):
    id: int
    nombre: str
    descripcion: str | None
    ubicacion: str
    estado_operativo: str

    class Config:
        from_attributes = True