from fastapi import FastAPI

from app.database import engine
from sqlalchemy import text


app = FastAPI(
    title="Tecnimática API",
    description="API para el proyecto de Tecnimática",
    version="1.0.0"
)

@app.get("/")
def home():
    return {"message": "Bienvenido a la API de Tecnimática"}


# Prueba BD
# @app.get("/test-db")
# def test_db():

#     with engine.connect() as connection:

#         result = connection.execute(
#             text("SELECT * FROM monitorings")
#         )
#         sensores = []

#         for row in result:
#             sensores.append(dict(row._mapping))

#         return sensores