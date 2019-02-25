import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Table } from 'antd'
import moment from 'moment'
import _ from 'lodash'
class TableShow extends Component {
    componentDidMount() {
        this.props.getTableShowInfoInit()
    }
    columnsMaker = () => {
        return [{
                title: '床号',
                dataIndex: 'sickbed.sn'
            }, {
                title: '姓名',
                dataIndex: 'patient.name'
            }, {
                title: '性别',
                dataIndex: 'patient.gender'
            }, {
                title: '年龄',
                dataIndex: 'patient.age'
            }, {
                title: '入院时间',
                dataIndex: 'hospitalStay',
                sorter: true,
                defaultSortOrder: 'descend',
                // sortOrder: sorter.columnKey === 'hospitalStay' && sorter.order,
                render(text, record, index) {
                    return (
                        <span>{record.hospitalStay ? record.hospitalStay : '--'}</span>
                    )
                }
            }, {
                title: '出院时间',
                dataIndex: 'dischargeTime',
                sorter: true,
                render(text, record, index) {
                    return (
                        <span>{record.dischargeTime ? record.dischargeTime : '--'}</span>
                    )
                }
            }, {
                title: '住院时长',
                dataIndex: 'msg',
                render(text, record, index) {
                    return (
                        <span>{record.dischargeTime ? (<span>{moment(record.dischargeTime).diff(moment(record.hospitalStay), 'days') + 1} 天</span>) : (<span style={{ color: '#128875' }}>住院中</span>)}</span>
                    )
                }
            }]
    }
    render() {
        const {
            props:{
                admissionHospital: {
                    dataTable,
                    pagination,
                    loading
                },
                onTableChange,
            },
            columnsMaker
        } = this
        return (
            <React.Fragment>
                <div className="admissionHospital">
                    <div className="dataTable">
                        <Table
                            className="tableShowCard"
                            columns={columnsMaker.call(this)}
                            dataSource={dataTable}
                            rowKey="id"
                            onChange={onTableChange.bind(this)}
                            pagination={{
                                ...pagination,
                                pageSizeOptions: ['1', '10', '20', '30', '40'],
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
        getTableShowInfoInit() {
            dispatch({
                type: 'get_table_info_services',
                payload:{
                    sortCloumn: 'hospitalStay',
                    sortType: 'desc'
                }
            })
        },
        onTableChange({ current, pageSize }, filters, sorter) {
            console.log(sorter)
            if (!_.isEmpty(sorter)) {
                const sortInfo = {
                    columnKey: sorter.columnKey,
                    field: sorter.field,
                    order: sorter.order
                }
                dispatch({
                    type: 'modify_sort_table',
                    payload: sortInfo
                })
                dispatch({
                    type: 'get_table_info_services',
                    payload: {
                        current,
                        pageSize,
                        sortCloumn: sorter.columnKey,
                        sortType: sorter.order === 'ascend' ? 'asc' : 'desc'
                    }
                })
            }else{
                dispatch({
                    type: 'get_table_info_services',
                    payload: {
                        current,
                        pageSize,
                        sortCloumn: 'hospitalStay',
                        sortType: 'desc'
                    }
                })
            }
        }
    }
}
export default connect(null, mapDispatchToProps)(TableShow)

