from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.sensor import Sensor
from app.models.monitoring import Monitoring
from app.models.zone import Zone
from app.routes.sensor_routes import router as sensor_router
from app.routes.zone_routes import router as zone_router
from app.routes.monitoring_routes import router as monitoring_router


app = FastAPI(
    title="Tecnimática API",
    description="API para el proyecto de Tecnimática",
    version="1.0.0"
)
@app.get("/")
def home():
    return {"message": "Bienvenido a la API de Tecnimática"}

app.include_router(sensor_router)
app.include_router(zone_router)
app.include_router(monitoring_router)



