import React from 'react';
import { Space, Table, Tag } from 'antd';
import "./index.scss"
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from "mobx-react-lite"

const columns = [
  {
    title: '姓名',
    width: 100,
    dataIndex: 'username',
    key: 'username',
    fixed: 'left',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '手机号',
    dataIndex: 'user_phone',
    key: 'aduser_phonedress',
    width: 150,
    fixed: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    width: 300,
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    width: 300,
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150,
    render: (_, record) => (
      <Space size="middle">
        <a>编辑 {record.name}</a>
        <a>删除</a>
      </Space>
    ),
  },
];

function User() {
  const { userStore } = useStore()

  useEffect(() => {
    userStore.getAllUserInfo()
  }, [])

  return (<div>
    <Table
      columns={columns}
      dataSource={userStore.userInfoList}
      scroll={{
        x: 1000,
        y: 300,
      }}
      /></div>)
}

export default observer(User)