import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Button, notification } from 'antd'
import EnterHospital from './EnterHospital.js'
import LeaveHospital from './LeaveHospital.js'
class AdmissionHospital extends Component {
    componentDidMount(){
        this.props.getWaringPlansList()
    }
    render() {
        const { 
            enterHospital,
            
         } = this.props
        return (
            <React.Fragment>
                <div className="admissionHospital">
                    <div className="bedsInfo">
                        <div className="content-item">
                            <p className="roomsCount">10</p>
                            <p className="roomsName">病房数</p>
                        </div>      
                        <div className="content-item">
                            <p className="roomsCount">10</p>
                            <p className="roomsName">总床位</p>
                        </div>
                        <div className="content-item">
                            <p className="roomsCount">10</p>
                            <p className="roomsName">入住床位</p>
                        </div>         
                        <div className="content-item">
                            <p className="roomsCount">10</p>
                            <p className="roomsName">剩余床位</p>
                        </div>                             
                    </div>
                    <div className="cont_wrap">
                        <Button onClick={enterHospital.bind(this,{ enterHospital: true})} style={{ marginRight: 10 }} type="primary">入院登记</Button>
                        <Button onClick={enterHospital.bind(this,{ leaveHospital: true})}type="primary">出院登记</Button>
                        <EnterHospital {...this.props} />
                        <LeaveHospital {...this.props} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        admissionHospital: state.admissionHospital
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        sickPeopleLeave(){
            dispatch({
                type: 'sick_people_leave_services'
            })
        },
        searchSickPeople(e){
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if(!err){
                    console.log(values)
                    dispatch({
                        type: 'sick_people_leave_hospital',
                        payload:{
                            sick: values
                        }
                    })
                }
            })
        },
        getWaringPlansList(){
            dispatch({
                type: 'get_waring_plans_list'
            })
        },
        onSubmitForm(e){
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if(!err){
                    console.log(values)
                    //校验身份证号
                    if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(values.idNumber))){ 
                        notification.warning({
                            message: '请输入正确的身份证号'
                        }) 
                        return false; 
                    } 
                    //校验手机号
                    if(!(/^1[34578]\d{9}$/.test(values.phone))){ 
                        notification.warning({
                            message: '请输入正确的手机号'
                        }) 
                        return false; 
                    } 
                    //房号床号
                    if(values.room_bed_id.length < 2){ 
                        notification.warning({
                            message: '请选择房号床号'
                        }) 
                        return false; 
                    } 
                    //校验结束，派发任务
                    dispatch({
                        type: 'enter_hospital_services',
                        payload: values
                    })
                }
            })
        },
        enterHospital(flag){
            dispatch({
                type: 'enter_hospital_modal',
                payload: {
                    flag
                }
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdmissionHospital)

