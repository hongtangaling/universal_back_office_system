import { createSlice } from "@reduxjs/toolkit";

//创建redux
const tabSlice =  createSlice({

//状态初始化
    name:"tab",
    initialState:{
        isCollapse:false,
        tabList:[
            {
                path:'/',
                name:'homeContent',
                label:'首页'
            }
        ],
        currentMenu:{
            path:'/',
            name:'homeContent',
            label:'首页'
        }
    },
    //状态修改
    reducers:{
        CollapseMenu: state =>{
            state.isCollapse = !state.isCollapse;
        },
        selectMenuList:(state,{payload:val}) =>{        //解构出payload之后起别名为val
            console.log('val.name',val.name);
            if(val.name !== 'homeContent'){
                state.currentMenu = val
                //如果已经存在的tag就不需要添加
            //    const res = state.tabList.findIndex(item=>{         //数据源便利，与传入的数据进行比较，有相同的数据就不添加
            //         item.name === val.name
            //     })

                let res = state.tabList.findIndex(item=>item.name===val.name)
                
                if(res === -1) {console.log('不存在');state.tabList.push(val);}
                if(res === 1) console.log('存在');

                // {
                //     state.tabList.push(val)
                // }

            } else if(val.name === 'homeContent'&&state.tabList.length===1){
                state.currentMenu={
                    path:'/',
                    name:'homeContent',
                    label:'首页'
                }                
            }else if(val.name === 'homeContent'&&state.tabList.length===0){
                state.tabList=[
                    {
                        path:'/',
                        name:'homeContent',
                        label:'首页'
                    }
                ]
                state.currentMenu={
                    path:'/',
                    name:'homeContent',
                    label:'首页'
                }
            }else{
                state.currentMenu={
                    path:'/',
                    name:'homeContent',
                    label:'首页'
                }
            }
        },
        closeTab:(state,{payload:val})=>{
            const res = state.tabList.findIndex(item=>{         //数据源便利，与传入的数据进行比较，有相同的数据就不添加
                item.name === val.name
            })
            state.tabList.splice(res,1);
            
            if(res===0){
                state.currentMenu=state.tabList[0]
                console.log(state.currentMenu);
                
            }
            // else if(res===state.tabList.length-1){
            //     state.currentMenu=state.tabList[state.tabList.length-1]
            // }else{
            //     state.currentMenu=state.tabList[res]
            // }
        }

    }
})

export const { CollapseMenu,selectMenuList,closeTab } = tabSlice.actions
export default tabSlice.reducer