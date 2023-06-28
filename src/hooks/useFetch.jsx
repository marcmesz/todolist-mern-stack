import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        setLoading(true)

        const fetchData = async () => {
            try {
                const response = await fetch(url, { signal })
                const data = await response.json()
                setData(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }
    }, [url])

    return { data, loading, error }
}

export default useFetch