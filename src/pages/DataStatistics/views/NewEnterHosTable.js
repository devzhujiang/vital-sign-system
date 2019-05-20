import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Table } from 'antd'

const columns = [{
    title: '床位',
    dataIndex: 'sickbed.sn',
}, {
    title: '姓名',
    dataIndex: 'patient.name',
}, {
    title: '性别',
    dataIndex: 'patient.gender',
    render(text) {
        return (
            <span>{text === 1 ? '男' : '女'} 岁</span>
        )
    }
}, {
    title: '年龄',
    dataIndex: 'patient.age',
}, {
    title: '入院时间',
    dataIndex: 'gmtCreated',
}];
class NewEnterHosTable extends Component {
    componentDidMount(){
        this.props.onTabsChange('1')
    }
    render() {
        const {
            dataStatistics: {
                newEnterHosTable: {
                    data,
                    current,
                    pageSize,
                    total
                },
                loading
            },
            onTableChange
        } = this.props
        console.log(this.props.dataStatistics.newEnterHosTable)
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
export default connect(mapStateToProps)(NewEnterHosTable)

