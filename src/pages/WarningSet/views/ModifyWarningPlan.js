import React, { Component } from 'react';
import './index.less'
import {  Modal } from 'antd'
import WarningDetail from './WarningDetail'
import FormListCommon from './FormListCommon'
class ModifyWarningPlan extends Component {
    render() {
        const {
            warningSet:{
                options:{
                    modifyModal,
                    isShowModifyForm
                }
            },
            openCloseModifyWaringModal
        } = this.props
        return (
            <React.Fragment>
                <div className="admissionHospital">
                    <Modal
                        title="常规预警"
                        visible={modifyModal}
                        footer={null}
                        onCancel={openCloseModifyWaringModal.bind(this, { flag: false })}
                        className="modifyModal"
                    >
                        <div>
                            {
                                isShowModifyForm ? (
                                    <FormListCommon {...this.props} />
                                ) : (
                                    <WarningDetail {...this.props} />
                                )
                            }
                        </div>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}
export default ModifyWarningPlan

