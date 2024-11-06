import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Col, Layout, Menu, theme, Row } from 'antd';

import CommonAside from '../../comp/commonAside';
import HeaderComment from '../../comp/commonHeader';
import { useSelector } from 'react-redux';
import { Outlet,useLocation } from 'react-router-dom'
import TagComp from '../../comp/TagComp';


const { Header, Sider, Content } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const currentPath = location.pathname;
  

  //获取全局总线中展开/收起的状态
   const isCollapse = useSelector(state=>state.tab.isCollapse)
  return (
    <Layout className='main-content'>
      <CommonAside isCollapse={isCollapse}/>
      <Layout>
        <HeaderComment isCollapse={isCollapse}/>
        <TagComp></TagComp>
        <Content
          style={{
            margin: '24px 16px',
            height: '100%',
            background: 'rgb(247,247,247)',
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;