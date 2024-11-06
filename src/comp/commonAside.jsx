import React from "react";
import { Button, Layout, Menu, theme } from 'antd';
import * as Icon from '@ant-design/icons';
const { Sider } = Layout;
import MenuConfig from "../config/index"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { selectMenuList } from '../store/reducer/tap'

//动态获取icon
const iconToElement = (name)=>React.createElement(Icon[name])

//处理菜单中的数据
const items = MenuConfig.map(icon=>{
    //没有子菜单
    const child = {
        key: icon.path,
        icon: iconToElement(icon.icon),
        label: icon.label
    }
    
    //存在子菜单的情况
    if(icon.children){
        child.children = icon.children.map(item=>{
            return {
                key: item.path,
                label: item.label,
                icon: iconToElement(item.icon),
            }
        })
    }
    return child
})


const CommonAside = ({isCollapse})=>{    
    const navigate = useNavigate()   
    const dispatch = useDispatch()

    //添加数据到store中
    const setTabList = (val)=>{
        dispatch(selectMenuList(val))
    }
    const selectMenu = (e)=>{
        navigate('/home'+e.key)
        let data ;
        MenuConfig.forEach(item=>{
            //找到当前的数据
            if(item.path === e.keyPath[e.keyPath.length-1]){
                data = item
                //如果有二级菜单
                if(e.keyPath.length>1){
                    data = item.children.find(child=>{
                        return child.path==e.key
                    })
                }
            }
        })
        setTabList({
            path: data.path,
            name: data.name,
            label: data.label

        })
    }

    return (
        <Sider trigger={null} collapsible collapsed = {isCollapse}>
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
        <h3 hidden={isCollapse} style={{color:'white',}}>通用后台管理系统</h3>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectMenu={selectMenu}
          defaultSelectedKeys={['/'+String(useLocation().pathname).split('/')[2]]}
          items={items}
          onClick={selectMenu}
        />
      </Sider>
    )
}
export default CommonAside