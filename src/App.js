import './App.scss';
import AddTodo from './components/AddTodo/AddTodo';
import Header from './components/Header/Header';
import List from './components/List/List';

const App = () => {
  return (
    <div className="App">
      <Header />
      <List />
      <AddTodo />
    </div>
  );
}

export default App;
