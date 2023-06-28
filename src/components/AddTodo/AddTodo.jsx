import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddTodo = () => {
    return (
        <form method="post" action="http://localhost:3001/addtodo" className="d-flex mt-3 gap-3">
            <Form.Control type="text" id="add-todo" placeholder="Add todo item to list" />
            <Button type="submit" variant="primary" size="lg">Add</Button>
        </form>
    );
}

export default AddTodo;