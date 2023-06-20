import { todosApi } from ".";

export const getAll = async (filter, token) => {
    try {
        const res = await todosApi.get(`/getall/${filter}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success, todos } = res.data;
        return { success, todos };
    }
    catch (err) {
        const { success, errorMessage } = err.response.data;
        return { success, errorMessage };
    }
}

export const getCountLeft = async (token) => {
    try {
        const res = await todosApi.get("/left", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success, leftItems } = res.data;
        return { success, leftItems };
    }
    catch (err) {
        const { success, errorMessage } = err.response.data;
        return { success, errorMessage };
    }
}

export const add = async (data, token) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("done", data.status);

        const res = await todosApi.post("/add", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        const { success, message } = res.data;
        return { success, message };
    }
    catch (err) {
        const { success, errorMessage } = err.response.data;
        return { success, errorMessage };
    }
}

export const del = async (id, token) => {
    try {
        const res = await todosApi.delete(`/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success, message } = res.data;
        return { success, message };
    }
    catch (err) {
        const { success, errorMessage } = err.response.data;
        return { success, errorMessage };
    }
}

export const toggleDone = async (id, token) => {
    try {
        const res = await todosApi.patch(`/toggle_done/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success, message } = res.data;
        return { success, message };
    }
    catch (err) {
        const { success, errorMessage } = err.response.data;
        return { success, errorMessage };
    }
}

export const delCompleted = async (token) => {
    try {
        const res = await todosApi.delete("/delete_completed", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success, message } = res.data;
        return { success, message };
    }
    catch (err) {
        const { success, errorMessage } = err.response.data;
        return { success, errorMessage };
    }
}