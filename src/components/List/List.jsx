import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import useFetch from "../../hooks/useFetch"
import "./List.scss";

const List = () => {
    const { data: todos } = useFetch('http://localhost:3001/todos')

    console.log(todos)

    const handleChange = (e) => {
    }

    return (
        <ListGroup>
            {todos && todos.length > 0 ? todos.map(todo => {
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
            }) : <div className="card p-4 text-center">Todo list is empty.</div>}
        </ListGroup>
    );
}

export default List;