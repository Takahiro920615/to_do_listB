import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom'; 
import DateDisplay from '../date'


type Todo = {
  title: string;
  readonly id: number;
  completed_flg: boolean;
  delete_flg: boolean;
};

type Filter = 'all'|'completed'|'unchecked'|'delete';

const Todos: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [nextId, setNextId] = useState(1);
  const [filter, setFilter] = useState<Filter>('all')
  
  const handleSubmit = () => {
    // 空ののタスクが追加されることを防ぎます
    if(!text) return;
    
    // Todoに新しいタスクを追加する定数、
    const newTodos: Todo = {
      title: text,
      id: nextId,
      completed_flg: false,
      delete_flg: false,
    };
    
    // 現在のTodos配列(prevTodos)を取得して新しいタスクを頭に追加している
    setTodos((prevTodos) => [newTodos, ...prevTodos]);
    setNextId(nextId+1);

    setText('');
  };

  


  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
      // 完了済み **かつ** 削除されていないタスクを返す
        return todos.filter((todo) => todo.completed_flg && !todo.delete_flg);
      case 'unchecked':
      // 未完了 **かつ** 削除されていないタスクを返す
        return todos.filter((todo) => !todo.completed_flg && !todo.delete_flg);
      case 'delete':
      // 削除されたタスクを返す
        return todos.filter((todo) => todo.delete_flg);
      default:
      // 削除されていないすべてのタスクを返す
        return todos.filter((todo) => !todo.delete_flg);
    }
  }

  const isFormDisabled = filter === 'completed' || filter === 'delete';

  const handleEmpty = () => {
    // !todos.delete_flgはfalse
    setTodos((todos) => todos.filter((todo) => !todo.delete_flg));
  };
  

const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
) => {
  setTodos((todos) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        return {...todo, [key]:value};
      }else {
        return todo;
      }
    });
    return newTodos;
  });
};


useEffect(() => {
  localforage.getItem('todo-20240622').then((values) => {
    if(values) {
      setTodos(values as Todo[]);
    }
  });
}, []);

useEffect(()=> {
  localforage.setItem('todo-20240622', todos);
}, [todos]);




  return (    
    <div className = "todo-container">
      <DateDisplay />
      <button
        className="back-button"
        onClick={() => navigate('/')}
        title="Topページに戻る"
      >
        ← 戻る
      </button>
    
      <select defaultValue="all" onChange={(e) => handleFilterChange(e.target.value as Filter)}
        >
        <option value = "all">全てのタスク</option>
        <option value="completed">完了したタスク</option>
        <option value ="unchecked">現在のタスク</option>
        <option value = "delete">ゴミ箱</option>
      </select>

      {filter === 'delete' ? (
        <button onClick= {handleEmpty}>
          ゴミ箱を空にする
        </button>
        ) : (
          filter !== 'completed' && (
            <form 
          onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        >
        <input
          type="text"
          value={text}
          // disabled={isFormDisabled}
          onChange={(e) => setText(e.target.value)}
          placeholder="タスクを入力してください"
        />
        <button className="insert-btn" type="submit">追加</button>
      </form>
          )
      )} 
      
      <div className = "details">
        <h1>詳細</h1>

        <ul>
        {getFilteredTodos().map((todo) => (
            <li key={todo.id}>
              {/* <input
                type="checkbox"
                checked={todo.completed_flg}
                onChange={() => handleTodo(todo.id, 'completed_flg', !todo.completed_flg)}
              /> */}
              <input
                type="text"
                disabled={todo.completed_flg || todo.delete_flg}
                value={todo.title}
                onChange={(e) => handleTodo(todo.id, 'title', e.target.value)}
              />
              <button className = "editbutton">編集</button>

              <button className = "deletebutton" onClick={() => handleTodo(todo.id, 'delete_flg', !todo.delete_flg)}>
                {todo.delete_flg? '復元' : '削除'}
              </button>
            </li>
        ))}
      </ul> 
      </div>
      
    </div>
  )};

export default Todos;