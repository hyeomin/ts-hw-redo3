import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Todo, TodoState, UpdatePayload } from "../../types/TodoTypes";

export const __fetchTodos = createAsyncThunk(
    "fetchTodos",
    async (paylaod, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:4000/todos`);
            console.log("요기는 떵크", response.data);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __addTodo = createAsyncThunk(
    "addTodo",
    async (newTodo: Omit<Todo, "id">, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/todos`,
                newTodo
            );
            const newTodoWithId = response.data;
            return thunkAPI.fulfillWithValue(newTodoWithId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __deleteTodo = createAsyncThunk(
    "deletTodo",
    async (id: string, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:4000/todos/${id}`);
            return thunkAPI.fulfillWithValue(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __updatedTodo = createAsyncThunk(
    "updateTodo",
    async ({ id, isDone }: UpdatePayload, thunkAPI) => {
        try {
            await axios.patch(`http://localhost:4000/todos/${id}`, {
                isDone: !isDone,
            });
            return thunkAPI.fulfillWithValue({ id, isDone });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState: TodoState = {
    todoList: [],
    isLoading: false,
    isError: false,
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
    extraReducers: (builder) => {
        builder
            .addCase(__fetchTodos.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(__fetchTodos.fulfilled, (state, action) => {
                state.todoList = action.payload;
            })
            .addCase(__fetchTodos.rejected, (state, action) => {
                state.isError = true;
            })
            .addCase(__addTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(__addTodo.fulfilled, (state, action) => {
                state.todoList.push(action.payload);
            })
            .addCase(__addTodo.rejected, (state, action) => {
                state.isError = true;
            })
            .addCase(__deleteTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(__deleteTodo.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter(
                    (item) => item.id !== action.payload
                );
            })
            .addCase(__deleteTodo.rejected, (state, action) => {
                state.isError = true;
            })
            .addCase(__updatedTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(__updatedTodo.fulfilled, (state, action) => {
                state.todoList = state.todoList.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, isDone: !item.isDone };
                    } else return item;
                });
            });
    },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
