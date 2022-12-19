import { makeAutoObservable } from "mobx"
import { http } from "@/utils"

class ChannelStore {
    channelList = []
    constructor() {
        makeAutoObservable(this)
    }
    getUserName = async () => {
        const res = await http.get("/api/v1/admin/user/list")
        this.channelList = res.data
    }
}

export default ChannelStore