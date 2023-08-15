import API_BASE_URL from "../constants/path";

export const createTodo = async (todo: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: todo,
      }),
    });
    const data = await response.json();
    if (response.status === 201) {
      return { status: 201, data: data };
    }
    if (response.status === 400) {
      return { status: 400, message: "내용을 입력해주세요." };
    }
    throw new Error("오류가 발생했습니다.");
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};

export const getTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return { status: 200, data: data };
    }
    throw new Error("오류가 발생했습니다.");
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};

export const updateTodo = async (
  id: number,
  todo: string,
  isCompleted: boolean
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: todo, isCompleted: isCompleted }),
    });

    if (response.status === 200) {
      return { status: 200, message: "업데이트를 완료했습니다." };
    }
    if (response.status === 400) {
      return { status: 400, message: "내용을 입력해주세요." };
    }
    throw new Error("오류가 발생했습니다.");
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 204) {
      return { status: 204 };
    }
    throw new Error("오류가 발생했습니다.");
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};
