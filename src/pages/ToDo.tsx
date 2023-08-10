import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import API_BASE_URL from "../constants/path";
import todoItemType from "../types/todoItem";

const Todo = () => {
  const user = localStorage.getItem("token");

  const [todoInput, setTodoInput] = useState("");
  const [todoItems, setTodoItems] = useState<todoItemType[]>([]);
  const [modifyingItem, setModifyingItem] = useState(-1);
  const [modifyInput, setModifyInput] = useState("");

  const getTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
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

  const handleModifyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 20) {
      alert("최대 20자까지 입력할 수 있습니다.");
    }
    setModifyInput(e.target.value);
  };

  const updateTodoValue = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    const targetItem = todoItems.find((item) => item.id === id);
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          todo: modifyInput,
          isCompleted: targetItem?.isCompleted,
        }),
      });
      if (response.status === 200) {
        setModifyInput("");
        setModifyingItem(-1);
      }
      if (response.status === 400) {
        alert("내용을 입력해주세요.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateCheckbox = async (id: number) => {
    const targetItem = todoItems.find((item) => item.id === id);
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          todo: targetItem?.todo,
          isCompleted: !targetItem?.isCompleted,
        }),
      });
      if (response.status === 200) {
        getTodos();
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
  }, [modifyingItem]);

  return (
    <>
      {!user && <Navigate to="/signin" replace={true} />}
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
                {modifyingItem === item.id ? (
                  <ModifyForm
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      updateTodoValue(e, item.id)
                    }
                  >
                    <label>
                      <Checkbox
                        type="checkbox"
                        defaultChecked={item.isCompleted}
                        onChange={() => updateCheckbox(item.id)}
                      />
                      <ModifyInput
                        data-testid="modify-input"
                        type="text"
                        maxLength={20}
                        width={"100%"}
                        defaultValue={item.todo}
                        name="modifyInput"
                        onChange={handleModifyInput}
                      />
                    </label>
                    <div>
                      <SubmitButton type="submit" data-testid="submit-button">
                        제출
                      </SubmitButton>
                      <CancelButton
                        data-testid="cancel-button"
                        onClick={() => {
                          setModifyingItem(-1);
                        }}
                      >
                        취소
                      </CancelButton>
                    </div>
                  </ModifyForm>
                ) : (
                  <TodoItem className={String(item.isCompleted)}>
                    <label>
                      <Checkbox
                        type="checkbox"
                        defaultChecked={item.isCompleted}
                        onChange={() => updateCheckbox(item.id)}
                      />
                      <span>{item.todo}</span>
                    </label>
                    <div>
                      <ModifyButton
                        data-testid="modify-button"
                        onClick={() => {
                          if (modifyingItem === -1) {
                            setModifyingItem(item.id);
                            setModifyInput(item.todo);
                          } else {
                            alert("todo 수정을 완료해주세요.");
                          }
                        }}
                      >
                        수정
                      </ModifyButton>
                      <DeleteButton
                        data-testid="delete-button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `'${item.todo}' 항목을 삭제하시겠습니까?`
                            )
                          ) {
                            deleteTodo(item.id);
                          }
                        }}
                      >
                        삭제
                      </DeleteButton>
                    </div>
                  </TodoItem>
                )}
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

  label {
    display: flex;
    align-items: center;
    flex: 1;
    cursor: pointer;
  }

  button {
    font-size: 18px;
    font-weight: 600;
    width: 50px;
    padding: 4px 8px;
    margin: 0 4px;
    cursor: pointer;
    border-radius: 100px;
    border: 1px solid;
  }
`;

const ModifyButton = styled.button`
  color: #36f;
  background-color: #ffffff;
  border-color: #36f;
`;

const DeleteButton = styled.button`
  color: gray;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const TodoItem = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    padding: 4px;
    margin: 0 10px;
    text-decoration: ${(props) =>
      props.className === "true" ? "line-through" : "none"};
  }
`;

const ModifyForm = styled.form`
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    flex: 1;
    cursor: pointer;
  }
`;
const SubmitButton = styled.button`
  color: #36f;
  background-color: #ffffff;
  border-color: #36f;
  font-size: 18px;
`;

const CancelButton = styled.button`
  color: gray;
`;

const ModifyInput = styled.input`
  font-size: 20px;
  color: #888888;
  flex: 1;
  padding: 4px;
  margin: 0 8px;
  cursor: revert;
`;
