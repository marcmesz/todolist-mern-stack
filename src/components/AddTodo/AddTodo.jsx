import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';

const AddTodo = () => {
    const inputRef = useRef()

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleCreate()
        }
    }
    const handleCreate = () => {
        const todo = inputRef.current.value.trim()
        if (todo.length > 0) {
            fetch(`http://localhost:3001/addtodo/${encodeURI(todo)}`,
                { method: "POST", body: JSON.stringify(todo) })
                .then(() => inputRef.current.value = "")
                .catch(e => console.error(e))
        }

    }

    return (
        <div className="d-flex mt-3 gap-3">
            <Form.Control onKeyDown={(e) => handleKeyPress(e)} ref={inputRef} type="text" id="add-todo" placeholder="Add todo item to list" />
            <Button onClick={handleCreate} variant="primary" size="lg">Add</Button>
        </div>
    );
}

export default AddTodo;