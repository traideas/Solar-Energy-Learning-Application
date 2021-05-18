import axios from 'axios'

const register = (first_name, last_name, username, email, password, institute_name) => {
    return (
        axios.post('http://127.0.0.1:8000/teacher/', {
            user: {
                first_name,
                last_name,
                username,
                email,
                password
            },
            institute_name
        })
    )
}

const login = (username, password) => {
    return (
        axios.post('http://127.0.0.1:8000/api/auth/', {
            username,
            password
        })
        .then(({ data }) => {
            localStorage.setItem("userToken", JSON.stringify(data.token));
            localStorage.setItem("userTypeStudent", JSON.stringify(data.is_student));
            localStorage.setItem("userTypeTeacher", JSON.stringify(data.is_teacher));
            localStorage.setItem("userTypeAdmin", JSON.stringify(data.is_admin));
            localStorage.setItem("userId", JSON.stringify(data.user_id));
        })
    )
}

const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userTypeStudent");
    localStorage.removeItem("userTypeTeacher");
    localStorage.removeItem("userId");
};

const isLogedin = () => {
    return JSON.parse(localStorage.getItem("userToken"));
};

const isStudent = () => {
    return JSON.parse(localStorage.getItem("userTypeStudent"));
};

const isTeacher = () => {
    return JSON.parse(localStorage.getItem("userTypeTeacher"));
};

const isAdmin = () => {
    return JSON.parse(localStorage.getItem("userTypeAdmin"));
};

const getUserId = () => {
    return JSON.parse(localStorage.getItem("userId"))
}


export default {
    register,
    login,
    logout,
    isLogedin,
    isStudent,
    isTeacher,
    getUserId,
    isAdmin
}