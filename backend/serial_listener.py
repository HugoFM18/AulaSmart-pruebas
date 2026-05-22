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

# Backend local Django
API_URL = 'http://127.0.0.1:8000/api/datos/'

# ID del dispositivo en Django Admin
DISPOSITIVO_ID = 1

# Tiempo entre reintentos si ocurre error
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

        # =============================================
        # LEER LINEA SERIAL
        # =============================================

        linea = (
            arduino
            .readline()
            .decode('utf-8')
            .strip()
        )

        # Ignorar líneas vacías
        if not linea:
            continue

        print("\n===================================")
        print("Datos recibidos:")
        print(linea)

        # =============================================
        # FORMATO ESPERADO:
        # temperatura,humedad,luz,sonido
        # =============================================

        partes = linea.split(",")

        # Validar cantidad
        if len(partes) != 4:

            print("⚠ Formato inválido")
            print("Se esperaban 4 valores")

            continue

        # =============================================
        # CONVERTIR DATOS
        # =============================================

        temperatura = float(partes[0])
        humedad     = float(partes[1])
        luz         = float(partes[2])
        sonido      = float(partes[3])

        # =============================================
        # VALIDACIONES BASICAS
        # =============================================

        # Evitar datos basura del DHT
        if temperatura == 0 and humedad == 0:

            print("⚠ Datos inválidos DHT")

            continue

        # =============================================
        # MOSTRAR DATOS
        # =============================================

        print(f"Temperatura: {temperatura} °C")
        print(f"Humedad:     {humedad} %")
        print(f"Luz:         {luz}")
        print(f"Sonido:      {sonido}")

        # =============================================
        # LISTA DE SENSORES
        # =============================================

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

        # =============================================
        # ENVIAR A DJANGO
        # =============================================

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