import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Table, Button } from 'antd'
class DataStatistics extends Component {
    componentDidMount(){
        this.props.getWarningMessage()
        this.props.getDataStaticsData()
    }
    render() {
        const columns = [{
            title: '床号',
            dataIndex: 'sickInfo'
        },{
            title: '病人姓名',
            dataIndex: 'patientName'
        },{
            title: '预警时间',
            dataIndex: 'processTime',
            render(text, record, index){
                return(
                    <span>{record.processTime ? record.processTime : '暂无预警时间'}</span>
                )
            }
        },{
            title: '预警状态',
            dataIndex: 'msg'
        },{
            title: '操作',
            dataIndex: 'operator',
            render(text, record, index) {
                return(
                    <div><Button type="primary">查看详情</Button></div>
                )
            }
        }]
        const { 
            dataStatistics:{
                dataTable, 
                deptTongjiInfo,
                pagination,
                loading
            },
            onTableChange
         } = this.props
        return (
            <React.Fragment>
                <div className="dataStatistics">
                    <div className="column-title titleStyle">数据统计</div>
                    <div className="bedsInfo">
                        <div className="content-item">
                            <p className="roomsCount">{deptTongjiInfo.bedCount}</p>
                            <p className="roomsName">总床位</p>
                        </div>      
                        <div className="content-item">
                            <p className="roomsCount">{deptTongjiInfo.bedInCount}</p>
                            <p className="roomsName">实际入住</p>
                        </div>
                        <div className="content-item">
                            <p className="roomsCount">{deptTongjiInfo.bedInCount}</p>
                            <p className="roomsName">新入院</p>
                        </div>         
                        <div className="content-item">
                            <p className="roomsCount">{deptTongjiInfo.outHos}</p>
                            <p className="roomsName">出院人数</p>
                        </div>    
                        <div className="content-item">
                            <p className="roomsCount">{deptTongjiInfo.roomCount}</p>
                            <p className="roomsName">预警次数</p>
                        </div>                             
                    </div>
                    <div className="dataTable">
                        <div className="column-title">预警数据</div>
                        <Table 
                            columns={columns} 
                            dataSource={dataTable} 
                            rowKey="id"
                            onChange={onTableChange.bind(this)}
                            pagination={{
                                ...pagination,
                                pageSizeOptions: ['1','10', '20', '30', '40'],
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: total => `共 ${total} 项`,
                            }}
                            loading={loading}
                            style={{ marginTop: 20 }}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataStatistics: state.dataStatistics
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getWarningMessage(){
            dispatch({
                type: 'get_warning_message_data'
            })
        },
        getDataStaticsData(){
            dispatch({
                type: 'get_data_statics_data'
            })
        },
    onTableChange({current, pageSize}){
            dispatch({
                type: 'get_warning_message_data',
                payload:{
                    current,
                    pageSize
                }
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataStatistics)

