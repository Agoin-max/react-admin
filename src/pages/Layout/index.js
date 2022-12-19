import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
import {observer} from "mobx-react-lite"

const { Header, Sider } = Layout

const GeekLayout = () => {
    // 高亮
    const { pathname } = useLocation()
    const { userStore, loginStore, channelStore } = useStore()

    useEffect(() => {
        userStore.getUserInfo()
        channelStore.getUserName()
    }, [userStore, channelStore])

    // 确定退出
    const navigate = useNavigate()
    const onConfirm = () =>{
        // 退出登录 删除Token 跳回到登录
        loginStore.loginOut()
        navigate("/login")
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{userStore.userInfo.username}</span>
                    <span className="user-logout">
                        <Popconfirm 
                        onConfirm={onConfirm}
                        title="是否确认退出？" okText="退出" cancelText="取消">
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={[pathname]}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item icon={<EditOutlined />} key="/">
                            <Link to="/">西部牛仔总部</Link>
                        </Menu.Item>
                        <Menu.Item icon={<EditOutlined />} key="/user">
                            <Link to="/user">用户</Link>
                        </Menu.Item>
                        <Menu.Item icon={<EditOutlined />} key="/role">
                            <Link to="/role">角色</Link>
                        </Menu.Item>
                        <Menu.Item icon={<EditOutlined />} key="/permissions">
                            <Link to="/permissions">权限</Link>
                        </Menu.Item>
                        <Menu.Item icon={<EditOutlined />} key="/publish">
                            <Link to="/publish">短信服务</Link>
                        </Menu.Item>
                        <Menu.Item icon={<EditOutlined />} key="/article">
                            <Link to="/article">文章</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    {/* 二级路由出口 */}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default observer(GeekLayout)