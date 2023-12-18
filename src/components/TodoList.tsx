import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../redux/config/configStore";
import { deleteTodo, updateTodo } from "../redux/modules/todoSlice";
import { Todo } from "../types/TodoTypes";

function TodoList({ isDone }: { isDone: boolean }) {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const fetchTodo = async () => {
        const response = await axios.get(`http://localhost:4000/todos`);
        console.log("response-->", response.data);
        setTodoList(response.data);
    };

    useEffect(() => {
        fetchTodo();
    }, []);

    const dispatch: AppDispatch = useDispatch();

    const onDeleteHandler = (id: string) => {
        const confirmation = window.confirm("삭제하시겠습니까?");
        if (confirmation) {
            dispatch(deleteTodo(id));
        } else return;
    };

    const onUpdateStatusHandler = (id: string) => {
        dispatch(updateTodo(id));
    };

    if (!todoList) {
        return <div>로딩 중입니다...</div>;
    }

    return (
        <CardContainer className="card-container">
            <h2>{isDone ? "Done" : "In Progress"}</h2>
            {todoList.map((item) => {
                return (
                    <CardWrapper className="single-card-wrapper" key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <ButtonContainer>
                            <button
                                onClick={() => onUpdateStatusHandler(item.id)}
                            >
                                {item.isDone ? "취소" : "완료"}
                            </button>
                            <button onClick={() => onDeleteHandler(item.id)}>
                                삭제
                            </button>
                        </ButtonContainer>
                    </CardWrapper>
                );
            })}
        </CardContainer>
    );
}

export default TodoList;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    & h2 {
        font-size: 20px;
        font-weight: 700;
    }
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;

    width: 300px;
    height: 140px;
    padding: 20px;
    border-radius: 10px;

    background-color: pink;

    & h3 {
        font-weight: 700;
    }

    & p {
        flex: 1;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
    & button {
        flex: 1;
        padding: 5px;
        border-radius: 5px;
        border-color: transparent;
    }
`;
