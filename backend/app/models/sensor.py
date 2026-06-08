from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy.orm import relationship

from app.database import Base


class Sensor(Base):
    __tablename__ = "sensors"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    tipo = Column(String(20), nullable=False)
    fabricante = Column(String(100), nullable=False)
    fecha_fabricacion = Column(Date, nullable=False)
    estado = Column(String(20), nullable=False, default="activo")

    monitorings = relationship(
        "Monitoring",
        back_populates="sensor"
    )