import API_BASE_URL from "../constants/path";

export const signUp = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.status === 201) {
      return {
        status: 201,
        message: "회원가입이 완료되었습니다. 로그인 해주세요.",
      };
    }
    if (response.status === 400) {
      return {
        status: 400,
        message: "이미 존재하는 이메일입니다.",
      };
    }
    throw new Error("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
  } catch (err) {
    return {
      err: err,
      message: "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      return {
        status: 200,
        message: "환영합니다!",
      };
    }
    if (response.status === 401) {
      return {
        status: 401,
        message: "이메일 또는 비밀번호가 일치하지 않습니다.",
      };
    }
    throw new Error("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
  } catch (err) {
    return {
      err: err,
      message: "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
};
