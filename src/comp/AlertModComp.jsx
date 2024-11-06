import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useEffect } from 'react';
import { addUser,getUser,editUser } from '../api';

const AlertModComp = ({isModalOpen, closeModal, userData,flag,updateUserFromChild}) => {
   const [userInfor,setUserInfor] = useState({})
   const userData_this = userData   //暂存数据
   let flag_sub = false    //true为数据已经提交，false数据未提交
   useEffect(()=>{
       setUserInfor(userData)
   },[userData])

const ok =()=>{
  if(flag==2){
    //新增加
    addUser(userInfor).then(()=>{
      getUser().then(res=>{
        updateUserFromChild(res.data.list)
      })
      setUserInfor({})
      flag_sub = true
      closeModal()
    })
  }else{
    editUser(userInfor).then(()=>{
      getUser().then(res=>{
        updateUserFromChild(res.data.list)
      })
      flag_sub = true
      closeModal()
    })
  }
}
const handleInputChange =(e)=>{
  const { name, value } = e.target; // 获取输入框的 name 属性和输入的值
  setUserInfor((prevInputValue) => ({
    ...prevInputValue, // 保持之前对象的属性不变
    [name]: value,     // 更新特定的属性
  }));
}
const handleClose = ()=>{  
  if(!flag_sub) setUserInfor(userData_this)
}

   
  return (
    <>
        <Modal title={flag==1?"用户修改":'新增用户'} afterClose={handleClose} open={isModalOpen} onOk={ok} onCancel={closeModal}>
            {flag==1&&<p style={{display:'flex'}}><div style={{width:'100px'}}>用户编号：</div><Input style={{width:'200px'}} disabled={flag===1} value={userInfor.id} /></p>}
            <p style={{display:'flex'}}><div style={{width:'100px'}}>用户名：</div><Input name='name' style={{width:'200px'}} onChange={handleInputChange} placeholder="请输入用户名" value={userInfor.name} /></p>
            <p style={{display:'flex'}}><div style={{width:'100px'}}>年龄：</div><Input name='age' style={{width:'200px'}} onChange={handleInputChange} placeholder="情输入年龄" value={userInfor.age} /></p>
            <p style={{display:'flex'}}><div style={{width:'100px'}}>性别：</div><Input name='sex' style={{width:'200px'}} onChange={handleInputChange} placeholder="请输入用户性别" value={userInfor.sex} /></p>
            <p style={{display:'flex'}}><div style={{width:'100px'}}>住址：</div><Input name='addr' style={{width:'200px'}} onChange={handleInputChange} placeholder="请输入住址" value={userInfor.addr} /></p>
            <p style={{display:'flex'}}><div style={{width:'100px'}}>生日：</div><Input name='birth' style={{width:'200px'}} onChange={handleInputChange} placeholder="请输入生日" value={userInfor.birth} /></p>
        </Modal>
    </>
   );
};

export default AlertModComp;