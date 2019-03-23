import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Table, Button, Badge } from 'antd'
import qs from 'qs'
class Message extends Component {
    componentDidMount(){
        this.props.getMessageInfo()
    }
    render() {
        const { 
            message:{
                dataTable, 
                pagination,
                loading,
            },
            onTableChange,
            onBatchProcessMessage
        } = this.props
        const { msgType } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        const columns = [{
            title: '床位',
            dataIndex: 'sickInfo',
            render(text, record, index){
                return(
                    <span>{record.sickInfo ? record.sickInfo : '--'}</span>
                )
            }
        },{
            title: '姓名',
            dataIndex: 'patient.name'
        },{
            title: '性别',
            dataIndex: 'patient.gender',
            render(text, record, index){
                return(
                    <span>{text === 1 ? '男' : '女'}</span>
                )
            }
        },{
            title: '年龄',
            dataIndex: 'patient.age'
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
            title: '预警类型',
            dataIndex: 'msg'
        },{
            title: '预警处理',
            dataIndex: 'operator',
            render(text, record, index) {
                return(
                    <div>
                        {
                            record.status === 0 ? (
                                <Button onClick={onBatchProcessMessage.bind(this, record.id)} type="primary">处理</Button>
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
                    <div className="dataTable">
                        <div className="column-title">
                            <span className="columnLeft">{msgType === '0' ? '预警消息' : '提示消息'}</span>
                        </div>
                        <Table 
                            columns={columns} 
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
        message: state.message
    }
}
const mapDispatchToProps = (dispatch, props) => {
    const query = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    return {
        onBatchProcessMessage(id){
            dispatch({
                type: 'on_batch_process_message_services',
                payload:{
                    id,
                    ...query
                }
            })
        },
        getMessageInfo(){
            dispatch({
                type: 'get_message_type_data',
                payload: query
            })
        },
        onTableChange({current, pageSize}){
            dispatch({
                type: 'get_message_type_data',
                payload:{
                    current,
                    pageSize,
                    ...query
                }
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Message)

