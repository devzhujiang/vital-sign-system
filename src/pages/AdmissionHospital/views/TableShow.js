import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Table } from 'antd'
import moment from 'moment'
class TableShow extends Component {
    componentDidMount(){
        this.props.getTableShowInfoInit()
    }
    render() {
        const columns = [{
            title: '床号',
            dataIndex: 'sickbed.sn'
        },{
            title: '姓名',
            dataIndex: 'patient.name'
        },{
            title: '性别',
            dataIndex: 'patient.gender'
        },{
            title: '年龄',
            dataIndex: 'patient.age'
        },{
            title: '入院时间',
            dataIndex: 'hospitalStay',
            render(text, record, index){
                return(
                    <span>{record.hospitalStay ? record.hospitalStay : '--'}</span>
                )
            }
        },{
            title: '出院时间',
            dataIndex: 'dischargeTime',
            render(text, record, index){
                return(
                    <span>{record.dischargeTime ? record.dischargeTime : '--'}</span>
                )
            }
        },{
            title: '住院时长',
            dataIndex: 'msg',
            render(text, record, index){
                return(
                    <span>{record.dischargeTime ? (<span>{moment(record.dischargeTime).diff(moment(record.hospitalStay), 'days') + 1} 天</span>) : (<span style={{ color: '#128875'}}>住院中</span>)}</span>
                )
            }
        }]
        const { 
            admissionHospital:{
                dataTable, 
                pagination,
                loading
            },
            onTableChange
         } = this.props
        return (
            <React.Fragment>
                <div className="admissionHospital">
                    <div className="dataTable">
                        <Table 
                            className="tableShowCard"
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
const mapDispatchToProps = (dispatch, props) => {
    return {
        getTableShowInfoInit(){
            dispatch({
                type: 'get_table_info_services'
            })
        },
        onTableChange({current, pageSize}){
            dispatch({
                type: 'get_table_info_services',
                payload:{
                    current,
                    pageSize
                }
            })
        }
    }
}
export default connect(null, mapDispatchToProps)(TableShow)

