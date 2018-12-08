import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Button, Row } from 'antd'
import './index.less'
import FormList from './FormList.js'
import { Link } from 'react-router-dom'
import __ from 'lodash'
import qs from 'qs'
class WarningSet extends Component {
    state = {
        formListShow: false,
    }
    componentDidMount(){
        this.props.getWarningInfoServices()
    }
    render() {
        const {
            plans
         } = this.props.warningSet
        return (
            <React.Fragment>
                <p className="column-title">预警方案</p>
                <Row style={{ marginTop: 10}}>
                    {
                        plans.length === 0 ? '暂无预警方案' :
                        (
                            __.map(plans, (item, index) =>{
                                return(
                                    <Link key={index} to={{
                                        pathname: '/warningDetails',
                                        search: qs.stringify({
                                            id: item.id
                                        })
                                    }}>
                                        <Card.Grid className="card_grid">
                                            {/* <p className="scheme_name">{item.name}</p> */}
                                            <p className="scheme_type">{item.name}</p>
                                        </Card.Grid>
                                    </Link>
                                )
                            })
                        )
                    }
                </Row>
                <Row className="add_scheme">
                    <Button onClick={() =>{this.props.setFormListShow({flag: true})}} disabled={this.props.warningSet.options.formListShow ? true : false} icon="plus" type="primary">添加方案</Button>
                    {
                        this.props.warningSet.options.formListShow ? 
                        <Button onClick={() =>{this.props.setFormListShow({flag: false})}} style={{ marginLeft: 10 }} icon="minus" type="default">取消添加</Button> : ''
                    }
                </Row>
                <Row>
                    {
                        this.props.warningSet.options.formListShow ? 
                        <FormList /> : ''
                    }
                    
                </Row>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        warningSet: state.warningSet
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getWarningInfoServices(){
            dispatch({
                type: 'get_warning_info_services'
            })
        },
        setFormListShow(flag){
            console.log(flag)
            dispatch({
                type: 'set_form_list_show_hide',
                payload: flag
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WarningSet)

