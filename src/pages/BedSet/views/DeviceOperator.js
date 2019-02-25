import React, { Component } from 'react'
import { connect } from 'react-redux'
// import __ from 'lodash'
import { Modal, Tabs } from 'antd'
import BindDevice from './BindDevice'
import RelieveDevice from './RelieveDevice'
import './index.less'
const TabPane = Tabs.TabPane
const mapDispatchToProps = (dispatch, props) => {
    return {
        closeDeviceModal(){
            dispatch({
                type: 'close_device_modal'
            })
            this.child.onResetFeilds()
        },
    }
}
export default connect(null, mapDispatchToProps) (class DeviceOperator extends Component{
    onRef = (ref) => {
        this.child = ref
    }
    render(){
        const {
            props:{
                bedSet:{
                    deviceModal,
                },
                closeDeviceModal,
            }
        } = this
        return(
            <div>
                <Modal
                    title="设备管理"
                    visible={deviceModal}
                    onCancel={closeDeviceModal.bind(this)}
                    maskClosable={false}
                    className="modalForm"
                    footer={null}
                    >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="绑定设备" key="1">
                            <BindDevice onRef={this.onRef} {...this.props} />
                        </TabPane>
                        <TabPane tab="解除设备" key="2">
                            <RelieveDevice onRef={this.onRef} {...this.props} />
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
})