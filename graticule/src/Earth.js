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
        this.createEarth = this.createEarth.bind(this);
        this.btnClick    = this.btnClick.bind(this);
    }
    componentDidMount() {
        this.createEarth()
    }
    shouldComponentUpdate() {
        return false; // This prevents future re-renders of this component
    }
    createEarth() {
        const {
            mousePlugin,
            configPlugin,
            autorotatePlugin,
        } = earthjs.plugins;
        const g = earthjs()
        .register(mousePlugin())
        .register(configPlugin())
        .register(canvasPlugin())
        .register(autorotatePlugin())
        .register(graticuleCanvas())
        .register(worldCanvas());
        g._.options.transparent = true;
        g.worldCanvas.data(world); // get embedded topojson
        g.create();
        this.g = g;
    }
    btnClick(e) {
        const t = e.target.innerText;
        const o = this.g._.options;
        const c = this.g.configPlugin;
        if (t==='transparent') {
            c.set({transparent: !o.transparent});
        } else if (t==='graticule') {
            c.set({showGraticule: !o.showGraticule});
        } else if (t==='land') {
            c.set({showLand: !o.showLand});
        }
    }
    render() {
        return (<div>
            <svg id="earth-js"></svg>
            <span className="ejs-buttons">
                <button onClick={this.btnClick}>transparent</button>,
                <button onClick={this.btnClick}>graticule</button>,
                <button onClick={this.btnClick}>land</button>
            </span>
        </div>)
    }
}
export default Earth
