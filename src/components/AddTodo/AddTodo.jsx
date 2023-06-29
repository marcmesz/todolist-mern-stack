import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';

const AddTodo = (props) => {
    const server = process.env.REACT_APP_SERVER
    const inputRef = useRef()

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleCreate()
        }
    }
    const handleCreate = () => {
        const todo = inputRef.current.value.trim()
        if (todo.length > 0) {
            const newTodo = {
                todo: todo,
                completed: false
            }
            fetch(`${server}/addtodo`,
                {
                    method: "POST",
                    body: JSON.stringify(newTodo),
                    headers: {
                        "Content-Type": "application/json",
                        //'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then(() => {
                    inputRef.current.value = ""
                    props.fetchData()
                })
                .catch(e => console.error(e))
        }
    }

    return (
        <>
            {!props.error &&
                <div className="d-flex mt-3 gap-3">
                    <Form.Control onKeyDown={(e) => handleKeyPress(e)} ref={inputRef} type="text" id="add-todo" placeholder="Add todo item to list" />
                    <Button onClick={handleCreate} variant="primary" size="lg">Add</Button>
                </div>
            }
        </>
    );
}

export default AddTodo;