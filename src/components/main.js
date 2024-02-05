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
        try {
            currentValue === "=" ? output.value = eval(output.value) : output.value += currentValue;
        } catch (error) {
            output.value = "Error!";
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
        if (currentValue === "C") output.value.length < 2 ? output.value = "0" : output.value = output.value.substring(0, output.value.length - 1)
        else if (currentValue === "AC") output.value = "0";
        else {
            output.value += currentValue;
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
        return (
            <div className='container'>
                <input type='text' defaultValue={this.output.out} ref={this.refOutput}></input>
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
