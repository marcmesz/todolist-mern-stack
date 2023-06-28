import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import "./List.scss";
import { useEffect, useState } from 'react';

const List = props => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const todoId = e.target.id
        fetch(`http://localhost:3001/updatetodos/${todoId}`, { method: "POST", body: JSON.stringify(todoId) })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    useEffect(() => {
        fetch("http://localhost:3001/todos")
            .then(res => res.json())
            .then(data => {
                setTodos(data)
                setLoading(false)
            })
            .catch(e => {
                if (e) {
                    setLoading(false)
                    setError(true)
                }
            })
    }, [todos])

    return (
        <ListGroup>
            {loading && <div className="card p-3 text-center">⌛Loading...</div>}
            {error && <div className="card p-2 text-center">❌Connection error. Server is not running!<br /><code>node server/server.js</code></div>}
            {todos && todos.length > 0 && todos.map(todo => {
                return (
                    <ListGroup.Item key={todo._id}>
                        <Form.Check
                            className={todo.completed && "completed"}
                            type="checkbox"
                            label={todo.todo}
                            id={todo._id}
                            checked={todo.completed}
                            onChange={(e) => handleChange(e)}
                        />
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    );
}

export default List;