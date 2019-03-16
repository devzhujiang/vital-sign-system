import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Card } from 'antd'
import './new.less'

const FormItem = Form.Item
class Login extends Component {
    componentWillMount() {
        sessionStorage.clear()
    }
    render() {
        const { props: {
            form: { getFieldDecorator },
           } } = this
        return (
            <div className="bodyWrap">
                <div className="body">
                    <div className="content">
                        <div className="login_introduction">
                            <p className="chinese">生命体征监测系统</p>
                            <p className="english">Vital Signs Detection System</p>
                        </div>
                        <div className="login_bottom_copyright">
                            <p className="company">上海泓邃信息科技有限公司</p>
                        </div>
                    </div>
                    <div className="nav">
                        <Card
                            title="登录"
                            headStyle={{ background: '#F4F4F5', padding: 0, textAlign: 'center'}}
                        >
                            <Form>
                                <FormItem 
                                    label="用户名"
                                    labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 12 }}
                                    colon={false}
                                >
                                    {getFieldDecorator('username', {
                                        rules: [{
                                            required: true,
                                            message: '用户名必须填写'
                                        }]
                                    })(
                                        <Input className='input-style' placeholder="请输入用户名" />
                                    )}
                                </FormItem>
                                <FormItem 
                                    label="密码"
                                    labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 12 }}
                                    colon={false}
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true,
                                            message: '密码必须填写'
                                        }],
                                    })(
                                        <Input className='input-style' type="password" placeholder="请输入密码" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button
                                        className='submit-btn'
                                        style={{
                                            width: '100%',
                                            height: 43,
                                            border: 'none',
                                            outline: 'none',
                                            marginTop: 30
                                        }}
                                        type="primary"
                                        htmlType="submit"
                                        onClick={this.props.onSubmitLogin.bind(this)}
                                    >
                                        立即登录
                                    </Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmitLogin(e) {
            e.preventDefault()
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: 'LOGIN_SERVICES',
                        payload: values
                    })
                }
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create({})(Login))
