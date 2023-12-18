import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "../../types/TodoTypes";

const initialState: TodoState = {
    todoList: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todoList = state.todoList.filter((item) => {
                return item.id !== action.payload;
            });
        },
        updateTodo: (state, action) => {
            state.todoList = state.todoList.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, isDone: !item.isDone };
                } else return item;
            });
        },
    },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
