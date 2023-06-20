import { usersApi } from ".";

export const signUp = async (data) => {
    try {
        const formData = new FormData();
        formData.append("login", data.login);
        formData.append("password", data.password);
        formData.append("passwordRepeat", data.passwordRepeat);

        const res = await usersApi.post("/signup", formData, 
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        const { success, message } = res.data;
        return { success, message };
    }
    catch (err) {
        const { success, errorMessage } = err.response.data;
        return { success, errorMessage };
    }
}

export const signIn = async (data) => {
    try {
        const formData = new FormData();
        formData.append("login", data.login);
        formData.append("password", data.password);

        const res = await usersApi.post("/signin", formData, 
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        const { success, token } = res.data;
        return { success, token };
    }
    catch (err) {
        const { success, errorMessage } = err.response.data;
        return { success, errorMessage };
    }
}

export const fetchMe = async (token) => {
    try {
        const res = await usersApi.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success, userLogin } = res.data;
        return { success, userLogin };
    }
    catch (err) {
        const { success, errorMessage } = err.response.data;
        return { success, errorMessage };
    }
}