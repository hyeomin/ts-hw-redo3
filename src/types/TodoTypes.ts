export type Todo = {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
};

export interface TodoState {
    todoList: Todo[];
}
