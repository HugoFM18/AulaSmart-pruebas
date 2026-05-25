import serial
import requests
import time

# =====================================================
# AULASMART SERIAL LISTENER
# Arduino → Django → Supabase
# =====================================================

# =========================
# CONFIGURACION
# =========================

SERIAL_PORT = 'COM5'
BAUD_RATE = 9600

# Backend Render
API_URL = 'https://proyecto-iot-d7gb.onrender.com/api/datos/'

# ID del dispositivo en Django Admin
DISPOSITIVO_ID = 1

# Tiempo entre reintentos
RETRY_SECONDS = 3

# =====================================================

print("===================================")
print(" AulaSmart Serial Listener")
print("===================================")

# =====================================================
# CONEXION SERIAL
# =====================================================

try:

    arduino = serial.Serial(
        SERIAL_PORT,
        BAUD_RATE,
        timeout=2
    )

    time.sleep(2)

    print(f"✓ Arduino conectado en {SERIAL_PORT}")

except Exception as e:

    print("ERROR conectando Arduino:")
    print(e)

    exit()

# =====================================================
# LOOP PRINCIPAL
# =====================================================

while True:

    try:

        linea = (
            arduino
            .readline()
            .decode('utf-8')
            .strip()
        )

        if not linea:
            continue

        print("\n===================================")
        print("Datos recibidos:")
        print(linea)

        partes = linea.split(",")

        if len(partes) != 4:

            print("⚠ Formato inválido")
            print("Se esperaban 4 valores")

            continue

        # =====================================================
        # CONVERSIONES
        # =====================================================

        temperatura = float(partes[0])
        humedad     = float(partes[1])

        # Luz normalizada
        luz_raw = float(partes[2])

        luz = round(
            (luz_raw / 1023) * 300,
            1
        )

        # Sonido convertido a dB
        sonido_raw = float(partes[3])

        sonido = round(
            (sonido_raw / 1023) * 80,
            1
        )

        # =====================================================
        # VALIDACIONES
        # =====================================================

        if temperatura == 0 and humedad == 0:

            print("⚠ Datos inválidos DHT")

            continue

        # =====================================================
        # MOSTRAR DATOS
        # =====================================================

        print(f"Temperatura: {temperatura} °C")
        print(f"Humedad:     {humedad} %")
        print(f"Luz:         {luz} lx")
        print(f"Sonido:      {sonido} dB")

        # =====================================================
        # SENSORES
        # =====================================================

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
                "unidad": "lx"
            },

            {
                "tipo_sensor": "sonido",
                "valor": sonido,
                "unidad": "dB"
            },
        ]

        # =====================================================
        # ENVIAR A DJANGO
        # =====================================================

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

            try:

                response = requests.post(
                    API_URL,
                    json=payload,
                    timeout=5
                )

                if response.status_code == 201:

                    print(
                        f"✓ {sensor['tipo_sensor']} enviada correctamente"
                    )

                else:

                    print(
                        f"⚠ Error {sensor['tipo_sensor']}:",
                        response.status_code
                    )

                    print(response.text)

            except requests.exceptions.RequestException as e:

                print(
                    f"ERROR enviando {sensor['tipo_sensor']}:"
                )

                print(e)

        print("===================================")

    except KeyboardInterrupt:

        print("\nListener detenido manualmente")

        break

    except Exception as e:

        print("\nERROR GENERAL:")
        print(e)

        print(
            f"Reintentando en {RETRY_SECONDS} segundos..."
        )

        time.sleep(RETRY_SECONDS)

# =====================================================
# CERRAR SERIAL
# =====================================================

arduino.close()

print("Puerto serial cerrado")