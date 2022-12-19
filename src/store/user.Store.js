import { makeAutoObservable } from "mobx"
import { http } from "@/utils"

class UserStore {
    userInfo = {}
    userInfoList = []
    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async () => {
        // 调用接口获取数据
        const res = await http.get("/api/v1/admin/user/info")
        this.userInfo = res.data
    }

    getAllUserInfo = async () => {
        const res = await http.get("/api/v1/admin/user/list")
        this.userInfoList = res.data
    }
}

export default UserStore