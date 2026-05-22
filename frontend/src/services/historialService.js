import api from "../api/axios";

export const getHistorial = async () => {

  try {

    const response =
      await api.get("/historial/");

    return response.data;

  } catch (error) {

    console.error(
      "Error obteniendo historial:",
      error
    );

    throw error;
  }
};