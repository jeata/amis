/**
 * @file entry of this example.
 * @author liaoxuezhi@cloud.com
 */
import './polyfills/index';
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';


// 初始化嵌入跳转
if(window !== top.window || location.search.indexOf('_inIframe=1') !== -1) {
  let lastPathName = sessionStorage.getItem('jeata/doc/amis/pathname');

  // 有上一次记录，并且本次不是跳转,并且开启了自动跳转
  if(lastPathName && location.search.indexOf('auto_jump=1') !== -1) {

    if(location.search.indexOf('_inIframe=1') !== -1) {
      lastPathName += "?_inIframe=1"
    }
    location.replace(lastPathName);
    return;
  }
}

export function bootstrap(mountTo, initalState) {
  render(<App />, mountTo);
}
