import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddTodo = () => {
    return (
        <div className="d-flex mt-3 gap-3">
            <Form.Control type="text" id="add-todo" placeholder="Add todo item to list" />
            <Button variant="primary" size="lg">Add</Button>
        </div>
    );
}

export default AddTodo;