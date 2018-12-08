import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Row, Col, Button, notification } from 'antd'
import DoubleSelectSpe from '../../../components/DoubleSelectSpe'
class ExchangeBeds extends Component {
    render() {
        return (
            <React.Fragment>
                <p className="column-title mt20">换床管理</p>
                <Row className="mt20">
                    <Col span={7}>
                        <DoubleSelectSpe
                            onChange={this.props.onChangeFirst}
                            size={'large'}
                            className={'selectStyle'}
                        />
                    </Col>
                    <Col className="speCenter" span={3}>更换到</Col>
                    <Col span={7}>
                        <DoubleSelectSpe
                            onChange={this.props.onChangeSecond}
                            size={'large'}
                            className={'selectStyle'}
                        />
                    </Col>
                    <Col className="speCenter" span={6}><Button onClick={this.props.onConfirmBtn.bind(this)} type="primary">确认更换</Button></Col>
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
        onChangeFirst(value){
            dispatch({
                type: 'first_sick_room_data',
                payload: value
            })
        },
        onChangeSecond(value){
            dispatch({
                type: 'second_sick_room_data',
                payload: value
            })
        },
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

