import React,{useState,useEffect} from 'react';
import { Button, Col, Layout, Menu, theme, Row } from 'antd';
import { Card,Avatar,Table } from 'antd';
import { getData } from '../../api';
import EchartIndex from '../../comp/echarts'

const Content = ()=>{

    let [goods,setGoods] = useState([])
    let [echartsData,setEchartsData] = useState({})
  
    //dom首次渲染完成
    useEffect(()=>{
      getData().then((data) =>{
          console.log(data.data.data);
          setGoods(data.data.data);        
          let orderData = data.data.data.orderData
          let userData = data.data.data.userData
          let videoData = data.data.data.videoData
  
          
          const xData = orderData.data
          const keyArr = Object.keys(orderData.data[0])
  
          const series = []
          keyArr.forEach(key=>{
            series.push({
              name:key,
              data:orderData.data.map(item=>item[key]),
              type:'line'
            })
          })
          
          setEchartsData({
            order:{
              xData:keyArr,
              series
            },
            user: {
              xData: userData.map(item => item.date),
              series: [
                {
                  name: '新增用户',
                  data: userData.map(item => item.new),
                  type: 'bar'
                },
                {
                    name: '活跃用户',
                    data: userData.map(item => item.active),
                    type: 'bar'
                }
              ]
            },
            video: {
              series: [
                {
                  data: videoData,
                  type: 'pie'
                }
              ]
            }
          })
        })
    },[])
  
  
  //表格组件初始化
  const columns = [
    {
      title: '品牌',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '今日购买',
      dataIndex: 'todayBuy',
      key: 'todayBuy',
    },
    {
      title: '本月购买',
      dataIndex: 'monthBuy',
      key: 'monthBuy',
    },
    {
      title: '总共购买',
      key: 'totalBuy',
      dataIndex: 'totalBuy'
    }
  ];


    return(
        <Row className='home'>
            <Col span={8} >
              <Card hoverable>
                <div style={{display:'flex',flexDirection:'column',gap:20}}>
                <div className='user'>
                    <Avatar size={100} src={<img src={'https://tse4-mm.cn.bing.net/th/id/OIP-C._MolZc9ybWaQGJMZP3FrzgAAAA?rs=1&pid=ImgDetMain'}/>}/>
                    <div className='userInfor'>
                      <div style={{fontSize:30}}>Admin</div>
                      <div style={{fontSize:12}}>超级管理员</div>
                    </div>
                </div>
                <div className='drive_line'></div>
                <div style={{ color: 'rgb(143,142,143)',display:'flex',flexDirection:'column',gap:5 }}>
                    <div style={{width:'70%',display:'flex',gap:50,fontSize:12}}><font>上次登陆时间：</font><font>2021-7-19</font></div>
                    <div style={{width:'70%',display:'flex',gap:50,fontSize:12}}><font>上次登录地点：</font><font>武汉</font></div>
                </div>
                </div>
              </Card>
              <Card hoverable style={{marginTop:20}}>
                <Table pagination={false} size='small' columns={columns} dataSource={goods.tableData} />
              </Card>

            </Col>
            <Col span={16}>
              <div style={{display:'flex',flexWrap:'wrap'}}>
                {
                  [1,2,3,4,5,6].map((item,index)=>{
                    return (
                        <div key={index} style={{display:'flex',justifyContent:'start',width:'250px',background:'rgb(255,255,255)',marginLeft:'5px',paddingTop:'10px',paddingBottom:'10px',paddingLeft:'20px',borderRadius:'5px',marginTop:'1px'}}>
                          <Avatar shape={'square'} size={70} src={<img src={'https://tse4-mm.cn.bing.net/th/id/OIP-C._MolZc9ybWaQGJMZP3FrzgAAAA?rs=1&pid=ImgDetMain'}/>}/>
                          <div style={{marginLeft:'10px',display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
                            <div style={{fontSize:'22px'}}>￥1234</div>
                            <div style={{fontSize:'10px',color:'rgb(177,176,174)'}}>今日支付订单</div>
                          </div>
                        </div>
                    )
                  })
                }
              </div>
                {echartsData.order&& <EchartIndex chartData={echartsData.order} style={{height:'230px'}}></EchartIndex>}
                <div style={{width:'800px',display:'flex'}}>
                  { echartsData.user && <EchartIndex chartData={echartsData.user} style={{ width: '50%', height: '200px' }} /> }
                  { echartsData.video && <EchartIndex chartData={echartsData.video} isAxisChart={false} style={{ width: '50%', height: '200px' }} /> }
                </div>

            </Col>
          </Row>
    )
}

export default Content