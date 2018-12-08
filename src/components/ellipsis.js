/**
 * 中文汉字两行40
 * 英文字母两行
 * 汉字2，英文1，ejimo4
 * 2行，len要小于87，在width一定的情况下
 */
import React from 'react';
import { Tooltip } from 'antd';

const Ellipsis = ({ text, maxLen }) => {
    if (!text) {
        return <span></span>
    }
    //计算text大小
    // text = 'sssss😞😟😖😯每日更新图文测试1每日更新图增加值文测试1每日更新图文测试1每日更新图文测21'
    let len = 0, stopNode = 0;
    for (let i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) > 127 || text.charCodeAt(i) === 94) {
            len += 2;
        } else {
            len++;
        }
        //由于maxLen为奇偶数和text为中英文的原因
        if (maxLen === len || maxLen === (len + 1)) {
            stopNode = i;
        }
    }
    if (len > maxLen) {
        const moreText = text.slice(stopNode);
        return <Tooltip title={moreText}>
            {`${text.slice(0, stopNode)}...`}
        </Tooltip>
    } else {
        return <span>{text}</span>
    }
}
export default Ellipsis;