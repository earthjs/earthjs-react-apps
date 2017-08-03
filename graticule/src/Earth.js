// http://eng.wealthfront.com/2017/02/14/integrating-d3-into-react/
import React, { Component } from 'react'
import earthjs  from 'earthjs/core';
import world from 'earthjs/example/d/world-110m.json';
import worldCanvas from 'earthjs/npm/plugins/worldCanvas';
import canvasPlugin from 'earthjs/npm/plugins/canvasPlugin';
import graticuleCanvas from 'earthjs/npm/plugins/graticuleCanvas';
import 'earthjs/example/css/earthjs.css'
class Earth extends Component {
    constructor(props){
        super(props)
        this.createEarth = this.createEarth.bind(this)
    }
    componentDidMount() {
        this.createEarth()
    }
    shouldComponentUpdate() {
        return false; // This prevents future re-renders of this component
    }
    // componentDidUpdate() {
    //     this.createEarth()
    // }
    createEarth() {
        const {
            mousePlugin,
            autorotatePlugin,
        } = earthjs.plugins;
        const g = earthjs()
        .register(mousePlugin())
        .register(canvasPlugin())
        .register(autorotatePlugin())
        .register(graticuleCanvas())
        .register(worldCanvas());
        g._.options.transparent = true;
        g.worldCanvas.data(world);
        g.create();
    }
    render() {
        return <svg id="earth-js">
        </svg>
    }
}
export default Earth
