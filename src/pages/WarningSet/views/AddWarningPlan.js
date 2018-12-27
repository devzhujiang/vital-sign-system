import React, { Component } from 'react';
import './index.less'
import {  Modal } from 'antd'
import FormList from './FormList'
class AddWarningPlan extends Component {
    render() {
        const {
            warningSet:{
                options:{
                    addModal
                }
            },
            openCloseAddWaringModal
        } = this.props
        return (
            <React.Fragment>
                <div className="admissionHospital">
                    <Modal
                        title="添加预警方案"
                        visible={addModal}
                        footer={null}
                        onCancel={openCloseAddWaringModal.bind(this, { flag: false })}
                        className="modifyModal"
                    >
                        <div>
                            <FormList {...this.props} />
                        </div>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}
export default AddWarningPlan

