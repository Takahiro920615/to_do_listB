import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom'; 

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

  // const handleEdit = (id: number, value: string) => {
  //   // setTodosのコールバック関数
  //   setTodos((todos) => {
  //     const newTodos = todos.map((todo) => {
  //       if(todo.id === id) {
  //         // スプレッド演算子で新しい値をセットしてイミュータビリティを保たせるもとの値は更新されません。新しく作成するイメージです
  //         return {...todo, title: value};
  //       }
  //       return todo;
  //     });

  //     console.log('=== Original todos ===');
  //         todos.map((todo) => {
  //           console.log(`id: ${todo.id}, title: ${todo.title}`);
  //         });

  //     return newTodos;
  //   });
  // };

  // const handleEdit = (id: number, value: string) => {
  //   setTodos((todos) => updateTodo(todos, id, 'title', value));
  // };

  // const handleCheck = (id: number, completed_flg: boolean) => {
  //   setTodos((todos) => {
  //     const newTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         return {...todo, completed_flg};
  //       }
  //       return todo;
  //     });
  //     return newTodos;
  //   });
  // }
  // const handleCheck = (id: number, completed_flg: boolean) => {
  //   setTodos((todos) => updateTodo(todos, id, 'completed_flg', completed_flg));
  // };


  // const handleRemove = (id: number, delete_flg: boolean) => {
  //   setTodos((todos) => {
  //     const newTodos = todos.map((todo) => {
  //       if(todo.id === id) {
  //         return { ...todo, delete_flg};
  //       }
  //       return todo;
  //     });
  //     return newTodos;
  //   });
  // };
  // const handleRemove = (id: number, delete_flg: boolean) => {
  //   setTodos((todos) => updateTodo(todos, id, 'delete_flg', delete_flg));
  // };


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
  
  // const updateTodo = <T extends keyof Todo>(todos: Todo[], id: number, key: T, value: Todo[T]): Todo[] => {
  //   return todos.map((todo) => {
  //     if(todo.id===id) {
  //       return {...todo, [key]: value};
  //     }
  //     return todo;
  //   });
  // };

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
      <ul>
        {getFilteredTodos().map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed_flg}
                onChange={() => handleTodo(todo.id, 'completed_flg', !todo.completed_flg)}
              />
              <input
                type="text"
                disabled={todo.completed_flg || todo.delete_flg}
                value={todo.title}
                onChange={(e) => handleTodo(todo.id, 'title', e.target.value)}
              />
              <button onClick={() => handleTodo(todo.id, 'delete_flg', !todo.delete_flg)}>
                {todo.delete_flg? '復元' : '削除'}
              </button>
            </li>
        ))}
      </ul> 
    </div>
  )};

export default Todos;