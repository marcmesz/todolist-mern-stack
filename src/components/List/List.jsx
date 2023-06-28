import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import "./List.scss";
import { Trash } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

const List = (props) => {

    const handleChange = (e) => {
        const todoId = e.target.id
        fetch(`http://localhost:3001/updatetodos/${todoId}`,
            { method: "POST", body: JSON.stringify(todoId) })
            .then(() => props.fetchData())
            .catch(e => console.error(e))
    }

    const handleDelete = (todoId) => {
        fetch(`http://localhost:3001/deletetodo/${todoId}`,
            { method: "POST", body: JSON.stringify(todoId) })
            .then(() => props.fetchData())
            .catch(e => console.error(e))
    }

    return (
        <ListGroup>
            {props.loading && <div className="card p-3 text-center">⌛Loading...</div>}
            {props.error && <div className="card p-2 text-center">❌Connection error. Server is not running!<br /><code>node server/server.js</code></div>}
            {props.todos && props.todos.length > 0 ? props.todos.map(todo => {
                return (
                    <ListGroup.Item key={todo._id} className="d-flex justify-content-between align-items-center">
                        <Form.Check
                            className={todo.completed && "completed"}
                            type="checkbox"
                            label={todo.todo}
                            id={todo._id}
                            checked={todo.completed}
                            onChange={(e) => handleChange(e)}
                        />
                        <Button variant="danger" size="sm" onClick={() => handleDelete(todo._id)}><Trash size={15} /></Button>
                    </ListGroup.Item>
                )
            }) : !props.error && !props.loading && <h5 className="card p-3 text-center">🥳You have nothing to do.🥳</h5>}
        </ListGroup>
    );
}

export default List;