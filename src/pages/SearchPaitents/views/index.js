import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Card, Row, Col } from 'antd'
import idCard from 'idcard'
import { Link } from 'react-router-dom'
class SearchPaitents extends Component {
    render() {
        const{
            main:{
                sickPeopleInfoMain
            }
        } = this.props
        return (
            <React.Fragment>
                <p className="column-title">病人信息</p>
                {
                    sickPeopleInfoMain.length === 0 ? (<p style={{ textAlign: 'center', width: '100%'}}>暂无此病人信息</p>) :
                    sickPeopleInfoMain.map((item) =>{
                        return(
                            <Card
                                title={`${item.name} | ${item.bedSn}`}
                                style={{ width: '100%', marginTop: 20 }}
                                className="leavePatints"
                                extra={<Link to={`/visualCharts?id=${item.id}&planId=${item.planId}`}><span style={{ color: '#00B958'}}>查看详情</span></Link>}
                                key={item.id}
                            >
                                <Row>
                                    <Col span={12}>性别：{item.gender === 1 ? '男' : '女'}</Col>
                                    <Col span={12}>住院号：{item.hospitalNumber}</Col>
                                </Row>
                                <Row style={{ marginTop: 10}}>
                                    <Col span={12}>年龄：{
                                        idCard.info(item.idNumber).valid ? idCard.info(item.idNumber).age : '暂无年龄信息'
                                    }</Col>
                                    <Col span={12}>病床号：{item.bedSn}</Col>
                                </Row>
                                <Row style={{ marginTop: 10}}>
                                    <Col span={12}>电话：{item.phone}</Col>
                                    <Col span={12}>入院时间：{item.hospitalStay}</Col>
                                </Row>
                            </Card>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        searchPaitents: state.searchPaitents,
        main: state.main
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        searchPaitent(query){
            dispatch({
                type: 'test_search',
                payload: query.search
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPaitents)

