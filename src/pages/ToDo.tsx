import React, { useEffect, useState } from "react";
import styled from "styled-components";
import API_BASE_URL from "../constants/path";
import todoItemType from "../types/todoItem";

const Todo = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoItems, setTodoItems] = useState<todoItemType[]>([]);

  const getTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 400) {
        alert("내용을 입력해주세요.");
      }
      if (response.status === 200) {
        setTodoItems(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 20) {
      alert("최대 20자까지 입력할 수 있습니다.");
    }
    setTodoInput(e.target.value);
  };

  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          todo: todoInput,
        }),
      });
      const data = await response.json();
      if (response.status === 400) {
        alert("내용을 입력해주세요.");
      }
      if (response.status === 201) {
        setTodoItems((prev) => [...prev, data]);
        setTodoInput("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 204) {
        setTodoItems(todoItems.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Title>To Do List</Title>
      <TodoContainer>
        <TodoForm onSubmit={createTodo}>
          <input
            data-testid="new-todo-input"
            onChange={handleTodoInput}
            value={todoInput}
            maxLength={20}
          />
          <button data-testid="new-todo-add-button" type="submit">
            추가
          </button>
        </TodoForm>
        <TodoList>
          {todoItems
            .map((item) => (
              <li key={item.id}>
                <label>
                  <input type="checkbox" defaultChecked={item.isCompleted} />
                  <span>{item.todo}</span>
                </label>
                <div>
                  <button data-testid="modify-button">수정</button>
                  <button
                    data-testid="delete-button"
                    onClick={() => deleteTodo(item.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))
            .reverse()}
        </TodoList>
      </TodoContainer>
    </>
  );
};

export default Todo;

const Title = styled.h1`
  text-align: center;
`;

const TodoContainer = styled.div`
  width: 400px;
  margin: auto;
`;

const TodoForm = styled.form`
  display: flex;

  input {
    font-size: 20px;
    font-weight: 500;
    border: 2px solid #36f;
    border-radius: 5px;
    padding: 8px;
    margin-right: 10px;
    flex: 1;
  }

  button {
    font-size: 20px;
    font-weight: 600;
    width: 70px;
    cursor: pointer;
    color: #ffffff;
    border: 1px solid #36f;
    border-radius: 5px;
    background-color: #36f;
  }
`;

const TodoList = styled.ul`
  font-size: 20px;
  padding: 0;
  list-style: none;

  li {
    margin: 4px 0;
    display: flex;
    justify-content: space-between;
  }

  label {
    display: flex;
    align-items: center;
    flex: 1;
    cursor: pointer;

    input {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  span {
    margin: 0 10px;
  }
  button {
    font-size: 20px;
    margin: 0 4px;
    cursor: pointer;
  }
`;
