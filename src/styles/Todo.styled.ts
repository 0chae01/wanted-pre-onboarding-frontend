import styled from "styled-components";

export const TodoContainer = styled.div`
  width: 480px;
  margin: 20px auto;
`;

export const Empty = styled.div`
  box-sizing: border-box;
  margin: 100px 0;
`;

export const BreakImage = styled.img`
  opacity: 0.1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const EmptyMessage = styled.p`
  color: lightgray;
  font-weight: 800;
  text-align: center;
`;

export const TodoForm = styled.form`
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

export const TodoList = styled.ul`
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

export const ModifyButton = styled.button`
  color: #36f;
  background-color: #ffffff;
  border-color: #36f;
`;

export const DeleteButton = styled.button`
  color: gray;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const TodoItem = styled.div`
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

export const ModifyForm = styled.form`
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
export const SubmitButton = styled.button`
  color: #36f;
  background-color: #ffffff;
  border-color: #36f;
  font-size: 18px;
`;

export const CancelButton = styled.button`
  color: gray;
`;

export const ModifyInput = styled.input`
  font-size: 20px;
  color: #888888;
  flex: 1;
  padding: 4px;
  margin: 0 8px;
  cursor: revert;
`;
