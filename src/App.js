import './App.scss';
import AddTodo from './components/AddTodo/AddTodo';
import Header from './components/Header/Header';
import List from './components/List/List';
import { useEffect, useState } from 'react';

const App = () => {
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

  return (
    <div className="App">
      <Header />
      <List
        todos={todos}
        setTodos={setTodos}
        fetchData={fetchData}
        error={error}
        loading={loading}
        setLoading={setLoading}
      />
      <AddTodo
        todos={todos}
        setTodos={setTodos}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
