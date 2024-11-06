import React from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { useState } from "react";
import { Button, Layout, Menu, theme } from 'antd';
import { Avatar } from "antd";
import {  Dropdown, Space } from 'antd';

const { Header, Sider, Content } = Layout;
//调用全局总线中的修改函数修改总线中的变量
import {useDispatch} from 'react-redux'
import {CollapseMenu} from '../store/reducer/tap'

const HeaderComment = (param)=>{
    let [collapsed,setCollapsed] = useState(true);
    const dispatch = useDispatch()

    return (
        <Header style={{display:"flex",justifyContent:'space-between',alignItems:'center',}}>
        <Button
          type="text"
          icon={ <MenuFoldOutlined />}
          onClick={() => {
            dispatch(CollapseMenu())
          }}
          style={{
            fontSize: '16px',
            color: 'black',
            background:'#fff',
          }}
        />
        <Dropdown menu={{ items }} placement="bottom">
        <Avatar size={40} src={<img src="https://tse4-mm.cn.bing.net/th/id/OIP-C._MolZc9ybWaQGJMZP3FrzgAAAA?rs=1&pid=ImgDetMain"/>}/>
      </Dropdown>
      </Header>
    )
}

const items = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="#">
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href="#">
          退出
        </a>
      ),
    }
  ];
export default HeaderComment