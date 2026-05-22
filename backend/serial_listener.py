import serial
import requests
import time

# =====================================================
# CONFIGURACION
# =====================================================

SERIAL_PORT = 'COM5'

BAUD_RATE = 9600

API_URL = 'http://127.0.0.1:8000/api/datos/'

DISPOSITIVO_ID = 1

# =====================================================

arduino = serial.Serial(
    SERIAL_PORT,
    BAUD_RATE,
    timeout=1
)

time.sleep(2)

print("===================================")
print(" AulaSmart Serial Listener")
print("===================================")

# =====================================================

while True:

    try:

        linea = (
            arduino
            .readline()
            .decode('utf-8')
            .strip()
        )

        if linea:

            print("\nDatos recibidos:")
            print(linea)

            datos = linea.split(",")

            if len(datos) == 4:

                temperatura = float(datos[0])
                humedad     = float(datos[1])
                luz         = float(datos[2])
                sonido      = float(datos[3])

                sensores = [

                    {
                        "tipo_sensor": "temperatura",
                        "valor": temperatura,
                        "unidad": "°C"
                    },

                    {
                        "tipo_sensor": "humedad",
                        "valor": humedad,
                        "unidad": "%"
                    },

                    {
                        "tipo_sensor": "luz",
                        "valor": luz,
                        "unidad": "lux"
                    },

                    {
                        "tipo_sensor": "sonido",
                        "valor": sonido,
                        "unidad": "dB"
                    },
                ]

                # =========================================
                # ENVIAR CADA SENSOR
                # =========================================

                for sensor in sensores:

                    payload = {

                        "dispositivo_id": DISPOSITIVO_ID,

                        "tipo_sensor":
                            sensor["tipo_sensor"],

                        "valor":
                            sensor["valor"],

                        "unidad":
                            sensor["unidad"]
                    }

                    response = requests.post(
                        API_URL,
                        json=payload
                    )

                    print(
                        f"✓ {sensor['tipo_sensor']} enviada:",
                        response.status_code
                    )

    except Exception as e:

        print("ERROR:", e)

        time.sleep(2)