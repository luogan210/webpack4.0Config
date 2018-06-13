import _ from "lodash";
console.log("多页面应用中的dddddddddddddindex.html");
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import "css/style.css"
import React from "react";
import ReactDOM from "react-dom";


var appState = observable({
    timer: 0
});

@observer
class TimerView extends React.Component { 

    render() {
        return (<button onClick={this.onReset.bind(this)}>
                Seconds luogan and suizhouyizhong passed hhhh: {this.props.appState.timer}
            </button>);
    }

    onReset () {
        this.props.appState.resetTimer();
    }
};

appState.resetTimer = action(function reset() {
    appState.timer = 0;
});

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);

ReactDOM.render(<TimerView appState={appState} />, document.getElementById("root"));