import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import tile from "./assets/tile.png";
import TodoList from "./components/TodoList";
import { Todo } from "./types/TodoTypes";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const fetchTodo = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/todos`);
            // console.log("response-->", response.data);
            setTodoList(response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        fetchTodo();
    }, []);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "content") {
            setContent(value);
        }
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTodo = {
            id: v4(),
            title,
            content,
            isDone: false,
        };

        try {
            await axios.post(`http://localhost:4000/todos`, newTodo);
            fetchTodo();
            setTitle("");
            setContent("");
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <OuterContainer>
            <InnterContainer>
                <Header className="header">
                    <p>Todo List</p>
                    <p>React Project by Hyeomin</p>
                </Header>
                <FormContainer className="input" onSubmit={onSubmitHandler}>
                    <InputContainer>
                        <label>제목</label>
                        <input
                            name="title"
                            value={title}
                            onChange={onChangeHandler}
                            placeholder="제목을 입력하세요"
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>내용</label>
                        <input
                            name="content"
                            value={content}
                            onChange={onChangeHandler}
                            placeholder="내용을 입력하세요"
                        />
                    </InputContainer>
                    <button type="submit">추가하기</button>
                </FormContainer>
                <TodoList
                    todoList={todoList}
                    fetchTodo={fetchTodo}
                    isDone={false}
                />
                <TodoList
                    todoList={todoList}
                    fetchTodo={fetchTodo}
                    isDone={true}
                />
            </InnterContainer>
        </OuterContainer>
    );
}

export default App;

const OuterContainer = styled.div`
    background-image: url(${tile});
    background-size: 15%;

    display: flex;
    justify-content: center;

    padding: 30px;
`;

const InnterContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    max-width: 1200px;
    min-width: 800px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;

    padding: 10px 20px;
    border-radius: 10px;

    background-color: pink;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 14px;
    width: 400px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;

    & button {
        color: black;
        background-color: pink;
        border-color: transparent;
        padding: 5px;
        border-radius: 5px;

        &:hover {
            cursor: pointer;
            color: gray;
        }
    }
`;

const InputContainer = styled.div`
    display: flex;

    & label {
        width: 40px;
    }

    & input {
        flex: 1;
    }
`;
