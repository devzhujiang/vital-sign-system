import React, { Component } from 'react';
class NotFound extends Component {
    render() {
        console.log(this.props)
        return (
            <div style={{ width: '100%', textAlign: 'center'}}>
                404页面不见了
            </div>
        )
    }
}

export default NotFound

