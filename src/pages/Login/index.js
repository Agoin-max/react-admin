import { Card, Form, Input, Checkbox, Button, Message, message } from "antd"
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from "@/store"
import { useNavigate } from "react-router-dom"

function Login() {
    const { loginStore } = useStore()
    const navigate = useNavigate()
    async function onFinish(values) {
        console.log('Success:', values);
        // values:放置的是所有表单项中用户输入的内容
        const { username, password } = values
        // 登录
        try {
            await loginStore.login({
                username: username,
                password: password
            })
            // 跳转
            navigate("/", { replace: true })
            // 提示用户
            message.success("登录成功")
        } catch (e) {
            message.error(e.reponse?.data?.message || "登录失败")
        }
    };
    const onFinishFailed = (errorInfo) => {
        // 一般不用
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login