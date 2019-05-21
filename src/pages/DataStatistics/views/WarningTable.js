import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Table } from 'antd'

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
}]
class WarningTable extends Component {
    render() {
        const {
            dataStatistics: {
                warningTable: {
                    data,
                    current,
                    pageSize,
                    total
                },
                loading
            },
            onTableChange
        } = this.props
        return (
            <React.Fragment>
                <Table 
                    rowKey="id"
                    className="tableStyle" 
                    columns={columns} 
                    dataSource={data} 
                    loading={loading}
                    pagination={{
                        current,
                        pageSize,
                        total,
                        showQuickJumper: true,
                        showTotal: total => `共 ${total} 项`,
                    }}
                    onChange={onTableChange.bind(this)}
                />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataStatistics: state.dataStatistics
    }
}
export default connect(mapStateToProps)(WarningTable)

