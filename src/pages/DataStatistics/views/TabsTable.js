import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Tabs } from 'antd'
import NewEnterHosTable from './NewEnterHosTable'
import LeaveHosTable from './LeaveHosTable'
const TabPane = Tabs.TabPane
class TabsTable extends Component {
    render() {
        const { 
            onTabsChange,
            onTableChange
         } = this.props
        return (
            <React.Fragment>
                <div className="dataStatisticShowTable">
                <Tabs defaultActiveKey="1" onChange={onTabsChange.bind(this)}>
                    <TabPane tab="新入院" key="1">
                        <NewEnterHosTable onTabsChange={onTabsChange} onTableChange={onTableChange} />    
                    </TabPane>
                    <TabPane tab="出院人数" key="0">
                        <LeaveHosTable onTabsChange={onTabsChange} onTableChange={onTableChange} />    
                    </TabPane>
                    <TabPane tab="预警次数" key="3">开发中</TabPane>
                </Tabs>
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
        onTabsChange(key){
            dispatch({
                type: 'set_tabs_key',
                payload: key
            })
            dispatch({
                type: 'loading_data_statics',
                payload: true
            })
            dispatch({
                type: 'search_data_statics_services'
            })
        },
        onTableChange({ current }){
            dispatch({
                type: 'loading_data_statics',
                payload: true
            })
            dispatch({
                type: 'search_data_statics_services',
                payload:{
                    current,
                }
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabsTable)

