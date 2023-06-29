import { useEffect, useState } from "react"

const useFetch = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = () => {
        fetch("http://localhost:3001/todos")
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setTodos(data)
            })
            .catch(e => {
                if (e) {
                    setLoading(false)
                    setError(true)
                }
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { todos, loading, error, fetchData }
}

export default useFetch