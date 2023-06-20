import axios from "axios";

const host = "http://localhost/TodoAppBackEnd/";

export const usersApi = axios.create(
    {
        baseURL: host + "users"
    }
);

export const todosApi = axios.create(
    {
        baseURL: host + "todos"
    }
);