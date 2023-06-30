import { useEffect, useState } from "react"

const useFetch = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const server = process.env.REACT_APP_SERVER

    const fetchData = () => {
        fetch(`${server}/todo`)
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
        //eslint-disable-next-line
    }, [])

    return { todos, loading, error, fetchData }
}

export default useFetch