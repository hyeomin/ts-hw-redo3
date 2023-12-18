export type Todo = {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
};

export type TodoListProps = {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    isDone: boolean;
};
