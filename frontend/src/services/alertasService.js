import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api/alertas/"

export const getAlertas = async () => {

  try {

    const response = await axios.get(API_URL)

    return response.data.alertas

  } catch (error) {

    console.error(
      "Error obteniendo alertas:",
      error
    )

    throw error
  }
}
