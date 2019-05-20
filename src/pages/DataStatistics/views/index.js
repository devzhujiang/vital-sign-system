import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import FormSearch from './FormSearch'
import TabsTable from './TabsTable'
class DataStatistics extends Component {
    componentDidMount(){
        this.props.getDataStaticsData()
    }
    render() {
        const { 
            dataStatistics:{
                deptTongjiInfo,
            },
         } = this.props
        return (
            <React.Fragment>
                <div className="dataStatistics">
                    <FormSearch />
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
                    </div>
                    <TabsTable />
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
        getDataStaticsData(){
            dispatch({
                type: 'get_data_statics_data'
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataStatistics)

