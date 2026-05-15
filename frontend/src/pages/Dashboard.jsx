import { useEffect, useState } from 'react'
import api from '../api/axios'

function Dashboard() {

    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const obtenerDatos = async () => {
            try {

                const response = await api.get('dashboard/')

                console.log(response.data)

                setDatos(response.data)

            } catch (err) {

                console.error(err)
                setError('Error conectando con el backend')

            } finally {
                setLoading(false)
            }
        }

        obtenerDatos()

    }, [])

    if (loading) {
        return <h2>Cargando dashboard...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <div>
            <h1>Dashboard AulaSmart</h1>

            <pre>
                {JSON.stringify(datos, null, 2)}
            </pre>
        </div>
    )
}

export default Dashboard