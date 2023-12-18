import styled from "styled-components";
import { TodoListProps } from "../types/TodoTypes";

function TodoList({ todoList, setTodoList, isDone }: TodoListProps) {
    const onDeleteHandler = (id: string) => {
        const confirmation = window.confirm("삭제하시겠습니까?");
        if (confirmation) {
            const newList = todoList.filter((item) => {
                return item.id !== id;
            });
            setTodoList(newList);
        } else return;
    };

    const onUpdateStatusHandler = (id: string) => {
        const updatedList = todoList.map((item) => {
            if (item.id === id) {
                return { ...item, isDone: !item.isDone };
            } else return item;
        });
        setTodoList(updatedList);
    };

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
