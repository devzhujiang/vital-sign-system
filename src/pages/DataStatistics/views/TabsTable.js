import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Tabs } from 'antd'
import NewEnterHosTable from './NewEnterHosTable'
import LeaveHosTable from './LeaveHosTable'
import WarningTable from './WarningTable'
const TabPane = Tabs.TabPane
class TabsTable extends Component {
    render() {
        const { 
            onTabsChange,
            onTableChange,
            onExportData
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
                        <TabPane tab="预警次数" key="2">
                            <WarningTable onTabsChange={onTabsChange} onTableChange={onTableChange} />  
                        </TabPane>
                    </Tabs>
                    <span onClick={onExportData.bind(this)} className="exportData">导出数据</span>
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
        },
        onExportData(){
            dispatch({
                type: 'export_data_services'
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabsTable)

