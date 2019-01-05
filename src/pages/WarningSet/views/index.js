import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Row, Icon } from 'antd'
import './index.less'
import __ from 'lodash'
import AddWarningPlan from './AddWarningPlan'
import ModifyWarningPlan from './ModifyWarningPlan'
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
         console.log('aaaaaaa')
        return (
            <React.Fragment>
                <p className="column-title">预警方案</p>
                <Row style={{ marginTop: 10}}>
                    {
                        plans.length === 0 ? '' :
                        (
                            __.map(plans, (item, index) =>{
                                return(
                                    <Card.Grid onClick={() =>{this.props.openCloseModifyWaringModal({flag: true, id: item.id})}} key={index} className="card_grid">
                                        <p className="scheme_type">{item.name}</p>
                                    </Card.Grid>
                                )
                            })
                        )
                    }
                    <Card.Grid onClick={() =>{this.props.openCloseAddWaringModal({flag: true})}} className="card_grid" style={{ textAlign: 'center'}}>
                        <p className="addWaringItem"><Icon style={{ fontSize: 20}} type="plus"/>添加预警方案</p>
                    </Card.Grid>
                </Row>
                <Row>
                    <AddWarningPlan {...this.props} />
                    <ModifyWarningPlan {...this.props} />
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
        },
        openCloseAddWaringModal(flag){
            dispatch({
                type: 'open_add_warning_modal',
                payload: flag
            })
        },
        openCloseModifyWaringModal(flag){
            if(flag.flag){
                dispatch({
                    type: 'get_warning_details_by_id_services',
                    payload: {
                        itemId: flag.id
                    }
                })
            }else{
                dispatch({
                    type: 'clean_warning_details_by_id_services'
                })
                dispatch({
                    type: 'clean_loading_warning_true'
                })
                dispatch({
                    type: 'hide_modify_form'
                })
            }
            dispatch({
                type: 'open_modify_warning_modal',
                payload: flag
            })
        },
        showModifyForm(){
            dispatch({
                type: 'show_modify_form'
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WarningSet)

