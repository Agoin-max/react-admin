// 导入路由
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import { history } from "./utils/history";
// 导入页面组件
import GeekLayout from "@/pages/Layout"; // 导入别名配置
import Login from "@/pages/Login"
import { AuthComponent } from "@/components/AuthComponent"
import "./index"
import Publish from "./pages/Publish";
import User from "./pages/User";
import Home from "./pages/Home";
import Role from "./pages/Role";
import Permissions from "./pages/Permissions";
import Article from "./pages/Article";

// 配置路由规则
function App() {
  return (
    // 路由配置
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          {/* 创建路由path和组件对应关系 */}
          {/* Layout需要鉴权处理 */}
          <Route path="/" element={
            <AuthComponent>
              <GeekLayout />
            </AuthComponent>
          }>
            <Route index element={<Home />}></Route>
            <Route path="user" element={<User />}></Route>
            <Route path="role" element={<Role />}></Route>
            <Route path="permissions" element={<Permissions />}></Route>
            <Route path="publish" element={<Publish />}></Route>
            <Route path="article" element={<Article />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
