import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import todoItemType from "../types/todoItem";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../apis/todo";
import * as S from "../styles/Todo.styled";

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
      <S.Title>To Do List</S.Title>
      <S.TodoContainer>
        <S.TodoForm onSubmit={handleCreateTodo}>
          <input
            data-testid="new-todo-input"
            onChange={handleTodoInput}
            value={todoInput}
            maxLength={10}
          />
          <button data-testid="new-todo-add-button" type="submit">
            추가
          </button>
        </S.TodoForm>
        <S.TodoList>
          {todoItems.length === 0 && (
            <S.Empty>
              <S.BreakImage
                src={"/images/coffeebreak.png"}
                alt="breaktime"
                width="150px"
              />
              <S.EmptyMessage>아직 할 일이 없습니다!</S.EmptyMessage>
            </S.Empty>
          )}
          {todoItems
            .map((item) => (
              <li key={item.id}>
                {modifyingItem === item.id ? (
                  <S.ModifyForm
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
                      <S.Checkbox
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
                      <S.ModifyInput
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
                      <S.SubmitButton type="submit" data-testid="submit-button">
                        제출
                      </S.SubmitButton>
                      <S.CancelButton
                        data-testid="cancel-button"
                        onClick={() => {
                          setModifyingItem(-1);
                        }}
                      >
                        취소
                      </S.CancelButton>
                    </div>
                  </S.ModifyForm>
                ) : (
                  <S.TodoItem className={String(item.isCompleted)}>
                    <label>
                      <S.Checkbox
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
                      <S.ModifyButton
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
                      </S.ModifyButton>
                      <S.DeleteButton
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
                      </S.DeleteButton>
                    </div>
                  </S.TodoItem>
                )}
              </li>
            ))
            .reverse()}
        </S.TodoList>
      </S.TodoContainer>
    </>
  );
};

export default Todo;
