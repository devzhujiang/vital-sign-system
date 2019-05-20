import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Table, Button, Badge } from 'antd'
// import __ from 'lodash'
class DataStatistics extends Component {
    componentDidMount(){
        this.props.getWarningMessage()
        this.props.getDataStaticsData()
    }
    onSelectChange = (selectedRowKeys) => {
        // let ids = []
        // __.forEach(selectedRows,(item) => {
        //     ids.push(item.id)
        // })
        this.props.setSelectRowKeys(selectedRowKeys)
    }
    render() {
        const { 
            dataStatistics:{
                dataTable, 
                deptTongjiInfo,
                pagination,
                loading,
                selectedRowKeys,
                isUsefull
            },
            onTableChange,
            batchProcessMessage
         } = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        const columns = [{
            title: '床号',
            dataIndex: 'sickInfo',
            render(text, record, index){
                return(
                    <span>{record.sickInfo ? record.sickInfo : '--'}</span>
                )
            }
        },{
            title: '病人姓名',
            dataIndex: 'patient.name'
        },{
            title: '预警时间',
            dataIndex: 'processTime',
            render(text, record, index){
                return(
                    record.status === 0 ? (
                        <span>{record.gmtCreated ? record.gmtCreated : '暂无预警时间'}</span>
                    ):(
                        <span>{record.processTime ? record.processTime : '暂无处理时间'}</span>
                    )
                    
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
                    <div>
                        {
                            record.status === 0 ? (
                                <Button onClick={batchProcessMessage.bind(this, record.id)} type="primary">处理</Button>
                            ):(
                                <span style={{ color: '#333'}}><Badge status="success" text="已处理" /></span>
                            )
                        }
                    </div>
                )
            }
        }]
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
                            <p className="roomsCount">{deptTongjiInfo.inHos}</p>
                            <p className="roomsName">新入院</p>
                        </div>         
                        <div className="content-item">
                            <p className="roomsCount">{deptTongjiInfo.outHos}</p>
                            <p className="roomsName">出院人数</p>
                        </div>    
                        {/* <div className="content-item">
                            <p className="roomsCount">{deptTongjiInfo.roomCount}</p>
                            <p className="roomsName">预警次数</p>
                        </div>                              */}
                    </div>
                    <div className="dataTable">
                        <div className="column-title">
                            <span className="columnLeft">预警数据</span>
                            <Button onClick={batchProcessMessage.bind(this, 'batch')} disabled={isUsefull} type="primary" className="columnRight">批量处理</Button>
                        </div>
                        <Table 
                            columns={columns} 
                            rowSelection={rowSelection}
                            dataSource={dataTable} 
                            rowKey="id"
                            onChange={onTableChange.bind(this)}
                            pagination={{
                                ...pagination,
                                pageSizeOptions: ['10', '20', '30', '40'],
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
        batchProcessMessage(id){
            console.log(id)
            dispatch({
                type: 'batch_process_message_services',
                payload:{
                    id
                }
            })
        },
        setSelectRowKeys(params){
            console.log(params)
            if(params.length > 0){
                dispatch({
                    type: 'set_btn_usefull',
                    payload: false
                })
            }else{
                dispatch({
                    type: 'set_btn_usefull',
                    payload: true
                })
            }
            dispatch({
                type: 'set_select_row_keys',
                payload:{
                    selectRowKeys: params
                }
            })
        },
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
                type: 'set_select_row_keys',
                payload:{
                    selectRowKeys: []
                }
            })
            dispatch({
                type: 'set_btn_usefull',
                payload: true
            })
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

