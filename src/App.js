import './App.scss';
import AddTodo from './components/AddTodo/AddTodo';
import Header from './components/Header/Header';
import List from './components/List/List';
import useFetch from './hooks/useFetch';

const App = () => {
  const { todos, loading, error, fetchData } = useFetch()
  return (
    <div className="App">
      <Header />
      <List todos={todos} loading={loading} error={error} fetchData={fetchData} />
      <AddTodo error={error} fetchData={fetchData} />
    </div>
  );
}

export default App;
