import React, { Component } from 'react';
import store from './store';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.output = {
            out: "0",
        }
        this.refOutput = React.createRef();
    }

    tapeKeywords(value) {
        let currentValue = value;
        let output = this.refOutput.current;
        this.setState({
            out: currentValue
        });
        if (output.value === "0") output.value = "";
        output.value += currentValue;
    }

    tapeOperation(value) {
        let currentValue = value;
        let output = this.refOutput.current;
        this.setState({
            out: currentValue
        });
        if (output.value === "0") output.value = "";
        if (currentValue !== "=") {
            if (output.value[output.value.length - 1] === "+" || output.value[output.value.length - 1] === "/" || output.value[output.value.length - 1] === "*" || output.value[output.value.length - 1] === "-") output.value = output.value.substring(0, output.value.length - 1) + currentValue;
            else output.value += currentValue;
        }
        try {
            if (currentValue === "=") output.value = eval(output.value)
        } catch (error) {
            output.value = "Error!";
            console.log(error);
            setTimeout(() => output.value = "0", 1500);
        }
    }

    tapeOperationTop(value) {
        let currentValue = value;
        let output = this.refOutput.current;
        this.setState({
            out: currentValue
        });
        if (output.value === "0") output.value = "";
        if (currentValue === "±") output.value = output.value * -1;
        else if (currentValue === "AC") output.value = "0";
        else {
            output.value = output.value / 100;
        }
    }

    tapePoint(value) {
        let currentValue = value;
        let output = this.refOutput.current;
        this.setState({
            out: currentValue
        });
        output.value += currentValue;
    }

    render() {
        let fs = 500;
        return (
            <div className='container'>
                <input type='text' defaultValue={this.output.out} ref={this.refOutput} readOnly style={{ fontSize: `${fs}%` }} />
                <div className='keywords'>
                    {store.keywords.map((item, index) => (
                        <button key={index} onClick={() => this.tapeKeywords(item.val)}>{item.val}</button>
                    ))}
                </div>
                <div className="operations-right">
                    {store.operations.map((item, index) => (
                        <button key={index} onClick={() => this.tapeOperation(item.val)}>{item.val}</button>
                    ))}
                </div>
                <div className='operations-up'>
                    {store.operationsTop.map((item, index) => (
                        <button key={index} onClick={() => this.tapeOperationTop(item.val)}>{item.val}</button>
                    ))}
                </div>
                <div className='operations-down'>
                    <button className='zero' onClick={() => this.tapeKeywords("0")}>0</button>
                    <button className='point' onClick={() => this.tapePoint(".")}>,</button>
                </div>
            </div>
        )
    }
}
