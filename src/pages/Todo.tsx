import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import todoItemType from "../types/todoItem";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../apis/todo";

const Todo = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoItems, setTodoItems] = useState<todoItemType[]>([]);
  const [modifyingItem, setModifyingItem] = useState(-1);
  const [modifyInput, setModifyInput] = useState("");

  const user = localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const result = await getTodos();
      if (result.status === 200) {
        setTodoItems(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 10) {
      alert("최대 10자까지 입력할 수 있습니다.");
    }
    setTodoInput(e.target.value);
  };

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createTodo(todoInput);
      if (result.status === 201) {
        setTodoItems((prev) => [...prev, result.data]);
        setTodoInput("");
      }
      if (result.status === 400) {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleModifyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 10) {
      alert("최대 10자까지 입력할 수 있습니다.");
    }
    setModifyInput(e.target.value);
  };

  const handleUpdateValue = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    e.preventDefault();

    try {
      const result = await updateTodo(id, todo, isCompleted);
      if (result.status === 200) {
        setModifyInput("");
        setModifyingItem(-1);
      }
      if (result.status === 400) {
        alert("내용을 입력해주세요.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCheckbox = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    try {
      const result = await updateTodo(id, todo, isCompleted);
      if (result.status === 200) {
        fetchTodos();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const result = await deleteTodo(id);
      if (result.status === 204) {
        setTodoItems(todoItems.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [modifyingItem]);

  return (
    <>
      {!user && <Navigate to="/signin" replace={true} />}
      <Title>To Do List</Title>
      <TodoContainer>
        <TodoForm onSubmit={handleCreateTodo}>
          <input
            data-testid="new-todo-input"
            onChange={handleTodoInput}
            value={todoInput}
            maxLength={10}
          />
          <button data-testid="new-todo-add-button" type="submit">
            추가
          </button>
        </TodoForm>
        <TodoList>
          {todoItems.length === 0 && (
            <Empty>
              <BreakImage
                src={"/images/coffeebreak.png"}
                alt="breaktime"
                width="150px"
              />
              <EmptyMessage>아직 할 일이 없습니다!</EmptyMessage>
            </Empty>
          )}
          {todoItems
            .map((item) => (
              <li key={item.id}>
                {modifyingItem === item.id ? (
                  <ModifyForm
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateValue(
                        e,
                        item.id,
                        modifyInput,
                        item.isCompleted
                      )
                    }
                  >
                    <label>
                      <Checkbox
                        type="checkbox"
                        defaultChecked={item.isCompleted}
                        onChange={() =>
                          handleUpdateCheckbox(
                            item.id,
                            item.todo,
                            !item.isCompleted
                          )
                        }
                      />
                      <ModifyInput
                        data-testid="modify-input"
                        type="text"
                        maxLength={10}
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
                        onChange={() =>
                          handleUpdateCheckbox(
                            item.id,
                            item.todo,
                            !item.isCompleted
                          )
                        }
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
                            handleDeleteTodo(item.id);
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

const Empty = styled.div`
  box-sizing: border-box;
  margin: 100px 0;
`;

const BreakImage = styled.img`
  opacity: 0.1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const EmptyMessage = styled.p`
  color: lightgray;
  font-weight: 800;
  text-align: center;
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
