import React, { Component } from 'react'
import { Card, Icon } from 'antd'
import './index.less'
import __ from 'lodash'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
 export default class TopLeftBanner extends Component{
    render(){
        const {
            main:{
                warningMqttMsg,
                indexCardInfo
            }
        } = this.props
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_922218_5j15b9gl989.js',
        })
        return(
            <React.Fragment>
                <Helmet>
                    <link href="//at.alicdn.com/t/font_922218_5j15b9gl989.css" />
                    <script src="//at.alicdn.com/t/font_922218_5j15b9gl989.js" />   
                </Helmet>
                <Link to={`/message?msgType=0`}>
                    <Card className="top-left-banner">
                        <div className="banner-title">预警</div>
                        <div className="banner-content">
                            <span className="icon-num">{__.filter(warningMqttMsg, ['focus', 1]).length}</span>
                            <IconFont type="icon-yujing-1" className="icon-img"/>
                            {/* <img className="icon-img" alt="icon" src={require('../../../images/new-icon/icon-index-1.png')} /> */}
                        </div>
                    </Card>
                </Link>
                <Link to={`/message?msgType=1`}>
                    <Card className="top-left-banner">
                        <div className="banner-title">提示</div>
                        <div className="banner-content">
                            <span className="icon-num">{__.filter(warningMqttMsg, ['focus', 0]).length}</span>
                            <IconFont type="icon-tishi1" className="icon-img"/>
                            {/* <img className="icon-img" alt="icon" src={require('../../../images/new-icon/icon-index-2.png')} /> */}
                        </div>
                    </Card>
                </Link>
                <Card className="top-left-banner">
                    <div className="banner-title">在床</div>
                    <div className="banner-content">
                        <span className="icon-num">{__.filter(indexCardInfo, ['device.is_on_bed', "1"]).length}</span>
                        <IconFont type="icon-zaichuang-1" className="icon-img"/>
                        {/* <img className="icon-img" alt="icon" src={require('../../../images/new-icon/icon-index-3.png')} /> */}
                    </div>
                </Card>
                <Card className="top-left-banner">
                    <div className="banner-title">离床</div>
                    <div className="banner-content">
                        <span className="icon-num">{__.filter(indexCardInfo, ['device.is_on_bed', "0"]).length}</span>
                        <IconFont type="icon-lichuang1" className="icon-img"/>
                        {/* <img className="icon-img" alt="icon" src={require('../../../images/new-icon/icon-index-4.png')} /> */}
                    </div>
                </Card>
            </React.Fragment>
        )
    }
}