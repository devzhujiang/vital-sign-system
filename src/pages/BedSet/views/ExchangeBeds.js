import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Row, notification } from 'antd'
class ExchangeBeds extends Component {
    render() {
        return (
            <React.Fragment>
                <p className="column-title mt20">换床管理</p>
                <Row className="mt20 exchangeBg">
                    <div className="paitentAreaTitle">病人换床</div>
                    <div className="paitentFormList">
                        
                    </div>
                </Row>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        bedSet: state.bedSet
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
       
        onConfirmBtn(){
            if(this.props.bedSet.firstCascaderData.length < 2 || this.props.bedSet.secondCascaderData.length < 2){
                notification.error({
                    message: '请完善更换信息，病房号病床号必须同时选择'
                })
            }else{
                const values = {}
                values.sourceId = this.props.bedSet.firstCascaderData[1]
                values.targetId = this.props.bedSet.secondCascaderData[1]
                dispatch({
                    type: 'exchange_sick_bed',
                    payload: values
                })
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExchangeBeds)

