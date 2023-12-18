export type Todo = {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
};

export type TodoListProps = {
    todoList: Todo[];
    fetchTodo: () => Promise<void>;
    isDone: boolean;
};

export interface TodoState {
    todoList: Todo[];
}
