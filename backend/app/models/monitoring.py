from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy import Numeric
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Monitoring(Base):
    __tablename__ = "monitorings"

    id = Column(Integer, primary_key=True, index=True)

    sensor_id = Column(
        Integer,
        ForeignKey("sensors.id"),
        nullable=False
    )

    zona_id = Column(
        Integer,
        ForeignKey("zones.id"),
        nullable=False
    )

    fecha_instalacion = Column(
        Date,
        nullable=False
    )

    tipo_lectura = Column(
        String(20),
        nullable=False
    )

    valor_umbral = Column(
        Numeric(10, 2),
        nullable=False
    )

    estado_monitoreo = Column(
        String(20),
        nullable=False
    )

    sensor = relationship(
        "Sensor",
        back_populates="monitorings"
    )

    zone = relationship(
        "Zone",
        back_populates="monitorings"
    )