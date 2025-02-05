import React, { useState } from 'react';

type Todo = {
  title: string;
  readonly id: number;
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
      id: nextId
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
              type="text"
              value={todo.title}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
          </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;