import React, { useState } from 'react';

type Todo = {
  title: string;
  readonly id: number;
  completed_flg: boolean;
  delete_flg: boolean;
};

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [nextId, setNextId] = useState(1);
  
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

  const handleEdit = (id: number, value: string) => {
    // setTodosのコールバック関数
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if(todo.id === id) {
          // スプレッド演算子で新しい値をセットしてイミュータビリティを保たせるもとの値は更新されません。新しく作成するイメージです
          return {...todo, title: value};
        }
        return todo;
      });

      console.log('=== Original todos ===');
          todos.map((todo) => {
            console.log(`id: ${todo.id}, title: ${todo.title}`);
          });

      return newTodos;
    });
  };

  const handleCheck = (id: number, completed_flg: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, completed_flg};
        }
        return todo;
      });
      return newTodos;
    });
  }

  const handleRemove = (id: number, delete_flg: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if(todo.id === id) {
          return { ...todo, delete_flg};
        }
        return todo;
      });
      return newTodos;
    });
  };
  

  return (
    <div>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="タスクを入力してください"
        />
        <button className="insert-btn" type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return ( 
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed_flg}
              onChange={() => handleCheck(todo.id, !todo.completed_flg)}
            />
            <input
              type="text"
              value={todo.title}
              disabled={todo.completed_flg}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
            <button onClick={() => handleRemove(todo.id, !todo.delete_flg)}>
              {todo.delete_flg? '復元' : '削除'}
            </button>
          </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;