import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'
import {observer} from "mobx-react-lite"

const { Option } = Select
const { RangePicker } = DatePicker


function Article() {
    // 用hooks管理数据
    // const [channelList, setchannelList] = useState([])

    // useEffect(() => {
    //     const getUserName = async () => {
    //         const res = await http.get("/api/v1/admin/user/list")
    //         setchannelList(res.data)
    //     }
    //     getUserName()
    // }, [])

    const { channelStore } = useStore()

    const onFinish = (values) => {
        // 获取表单数据
        console.log(values)
        const { channel_id, date, status } = values
        // 数据处理
        const _params = {}
        if (status !== -1) {
            _params.status = status
        }
        if (channel_id) {
            _params.channel_id = channel_id
        }
        if (date) {
            _params.begin_pubdate = date[0].format("YYYY-MM-DD")
            _params.end_pubdate = date[1].format("YYYY-MM-DD")
        }

        // 修改params数据 引起接口的重新发送
        setParams({
            ...params,
            ..._params
        })
    }

    // 获取列表数据
    const [result, setList] = useState({
        list: [],
        count: 0
    })

    // 参数管理
    const [params, setParams] = useState({
        page: 1,
        pageSize: 10
    })

    useEffect(() => {
        const loadList = async () => {
            const res = await http.get("/api/v1/admin/user/list", { params })
            setList({
                list: res.data,
                count: res.total
            })
        }
        loadList()
    }, [params])

    // del
    const delUser = async (data) => {
        console.log(data)
        // 调接口
        const params = {}
        params.user_id = data.id
        await http.delete("/api/v1/admin/user/delete", { params })
        // 刷新一下列表
        setParams({
            ...params,
            page: 1
        })
    }

    const navigate = useNavigate()
    const goPublish = (data) => {
        console.log(data)
        navigate(`/publish?id=${data.id}`)
    }

    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '用户',
            dataIndex: 'username',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color="green">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'create_time'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => goPublish(data)}
                        />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => delUser(data)}
                        />
                    </Space>
                )
            }
        }
    ]

    const pageChange = (page) => {
        setParams({
            ...params,
            page
        })
    }

    return (
        <div>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form
                    onFinish={onFinish}
                    initialValues={{ status: -1 }}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            {channelStore.channelList.map(item => <Option key={item.id} value={item.id}>{item.username}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`根据筛选条件共查询到 ${result.count} 条结果：`}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={result.list}
                    pagination={{
                        pageSize: params.pageSize,
                        current: params.page,
                        total: result.count,
                        onChange: pageChange
                    }}
                />
            </Card>
        </div>
    )
}

export default observer(Article)