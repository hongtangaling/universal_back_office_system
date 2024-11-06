import React from "react";
import { Tag } from "antd";
import { Space } from "antd";
import { useSelector,useDispatch } from "react-redux";
import {closeTab} from "../store/reducer/tap"

const CommonTag = ()=>{
    const tabList = useSelector(state => state.tab.tabList)
    //当前选中的数据
    const currentMenu = useSelector(state => state.tab.currentMenu)
    //关闭标签
    const dispatch = useDispatch()

    const handleClose =(tag)=>{
        console.log(tabList);
        dispatch(closeTab({tag}))
    }
    const handleChange =(tag)=>{

    }
    console.log(tabList);
        
    //tag的显示
    const setTag = (flag,item,index)=>{
        return (
            flag?
            <Tag color="#55acee" closeIcon onClose={()=>{handleClose(item,index)}}>{item.label}</Tag>
            :
            <Tag onClick={()=>{handleChange(item)}} key={item.name}>{item.label}</Tag>
        )
    }
    return (
        <Space style={{marginTop:'10px',marginLeft:'10px'}} size={[0,8]} wrap>
            {
                currentMenu.name && tabList.map((item,index)=>setTag(item.path===currentMenu.path,item,index))
            }
        </Space>
    )
    
}
export default CommonTag