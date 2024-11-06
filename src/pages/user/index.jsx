import React from "react";
import { Button, Divider, Flex, Radio, Input } from 'antd';
import { Space, Table, Tag } from 'antd';
import { useEffect } from "react";
const { Column, ColumnGroup } = Table;
import { getUser,deleteUser } from '../../api';
import { useState } from "react";
import AlertModComp from '../../comp/AlertModComp'; // 导入子组件


const User = ()=>{
    const [userInforList,setUserInforList] = useState([])
    const [searchData,setSearchData] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false); // 控制弹框的状态
    const [userDetail, setUserDetai] = useState({}); // 用户数据
    const [flag, setFlag] = useState(1); // 标识符



    useEffect(()=>{
        getUser().then((res)=>{
            setUserInforList(res.data.list)
        })
    },[])

    const search_Key = (res)=>{
        setSearchData(res.target.value)
    }
    const submit = ()=>{
        
        getUser({name:searchData}).then((res)=>{
            setUserInforList(res.data.list)
        })
    }

    const openModal = (record={},flag) => {
        setIsModalOpen(true); // 打开弹框
        if(record) setUserDetai(record)
        setFlag(flag)
        
    };

    const closeModal = () => {
        setIsModalOpen(false); // 关闭弹框
    };

    //子组件中的回调函数
    const updateUserFromChild = (newUserList)=>{
        setUserInforList(newUserList)
    }
    const delUser = (id)=>{
        deleteUser({id}).then(()=>{
            getUser().then((res)=>{
                setUserInforList(res.data.list)
            })
        })
    }
    const keyup = (e) => {
        if(e.keyCode === 13){
            submit() 
        }
    }
    
    return (
        <div>
            <div style={{display:"flex",justifyContent:'space-between',padding:'0'}}>
                <Button type="primary" onClick={()=>{openModal({},2)}} size={16}>
                +新增
                </Button>
                <div>
                    <Input onKeyUp={keyup} onChange={search_Key} style={{width:'200px'}} placeholder="Outlined" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={submit} type="primary" size={16}>
                        搜索
                    </Button>
                </div>
            </div>
            <Table size="small" dataSource={userInforList}>
                <Column title="姓名" dataIndex="name" key="name" />
                <Column title="年龄" dataIndex="age" key="age" />
                <Column title="性别" key="sex" render={(_, record)=>(
                    <div>{record.sex==1?'男':'女'}</div>
                )} />
                <Column title="出生日期" dataIndex="birth" key="birth" />
                <Column title="地址" dataIndex="addr" key="addr" />
                <Column
                title="操作"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <Button size="small" style={{fontSize:'12px'}} onClick={() => openModal(record,1)}>编辑</Button>
                        <Button size="small" onClick={()=>{delUser(record.id)}} type="primary" style={{fontSize:'12px'}} danger>删除</Button>
                    </Space>
                )}
                />
            </Table>
            {userDetail&&<AlertModComp updateUserFromChild={updateUserFromChild} flag={flag} userData={userDetail} isModalOpen={isModalOpen} closeModal={closeModal} />}
        </div>
    )
}
export default User