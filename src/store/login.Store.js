// lgoin module

import { getToken, http, setToken, removeToken } from "@/utils"
import { makeAutoObservable } from "mobx"
class LoginStore {
    token = getToken() || ""
    constructor() {
        makeAutoObservable(this)
    }
    // 登录
    login = async ({ username, password }) => {
        const res = await http.post("http://127.0.0.1:8000/api/v1/admin/user/login", {
            username,
            password
        })
        // 存入token
        this.token = res.data.token
        // 存入localstorage
        setToken(this.token)
    }

    // 退出
    loginOut = () => {
        this.token = ""
        removeToken()
    }
}

export default LoginStore