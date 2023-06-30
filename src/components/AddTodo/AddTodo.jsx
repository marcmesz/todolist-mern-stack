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
            fetch(`${server}/todo`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        todo: todo,
                        completed: false
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(() => {
                    inputRef.current.value = ""
                    props.fetchData()
                })
                .catch(e => console.error(e))
        }
    }

    const handleDeleteAll = () => {
        fetch(`${server}/todo`, { method: "DELETE" }).then(() => props.fetchData())
    }

    return (
        <>
            {!props.error &&
                <div className="d-flex flex-column">
                    <div className="d-flex mt-3 gap-3">
                        <Form.Control onKeyDown={(e) => handleKeyPress(e)} ref={inputRef} type="text" id="add-todo" placeholder="Add todo item to list" />
                        <Button onClick={handleCreate} variant="primary" size="lg">Add</Button>
                    </div>
                    {
                        props.todos.length > 0 &&
                        <div className="d-flex flex-column align-items-center mt-4">
                            <p className="text-white">or you can</p>
                            <Button onClick={handleDeleteAll} variant="danger" size="sm">Delete All Todos</Button>
                        </div>
                    }
                </div>
            }
        </>
    );
}

export default AddTodo;