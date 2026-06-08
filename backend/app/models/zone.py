from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.orm import relationship

from app.database import Base


class Zone(Base):
    __tablename__ = "zones"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text)
    ubicacion = Column(String(150), nullable=False)
    estado_operativo = Column(
        String(20),
        nullable=False
    )
    monitorings = relationship(
        "Monitoring",
        back_populates="zone"
    )