import React, { Component } from 'react'
import { Card } from 'antd'
import './index.less'
 export default class TopRightBanner extends Component{
    render(){
        const {
            homePage:{
                tongjiInfo
            }
        } = this.props
        return(
            <React.Fragment>
                <Card className="top-right-banner">
                    <div className="top-right-banner-details">
                        <div className="item-detail">
                            <p className="item-num w100">{tongjiInfo.bedCount}</p>
                            <p className="item-title w100">床位</p>
                            <span className="border-left"></span>
                        </div>
                        <div className="item-detail">
                            <p className="item-num w100">{tongjiInfo.bedInCount}</p>
                            <p className="item-title w100">入住</p>
                            <span className="border-left"></span>
                        </div>
                        <div className="item-detail">
                            <p className="item-num w100">{tongjiInfo.bedOutCount}</p>
                            <p className="item-title w100">离床</p>
                            <span className="border-left"></span>
                        </div>
                        <div className="item-detail">
                            <p className="item-num w100">0</p>
                            <p className="item-title w100">故障</p>
                        </div>
                    </div>
                </Card>
            </React.Fragment>
        )
    }
}