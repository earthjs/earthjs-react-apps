import React, { Component } from 'react'
import earthjs  from 'earthjs/core';
import world from 'earthjs/example/d/world-110m.json';
import worldCanvas from 'earthjs/npm/canvas/worldCanvas';
import canvasPlugin from 'earthjs/npm/base/canvasPlugin';
import graticuleCanvas from 'earthjs/npm/canvas/graticuleCanvas';
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
            inertiaPlugin,
            autorotatePlugin,
        } = earthjs.plugins;
        const g = earthjs()
        .register(canvasPlugin())
        .register(inertiaPlugin())
        .register(graticuleCanvas())
        .register(autorotatePlugin())
        .register(worldCanvas());
        g._.options.transparent = true;
        g.worldCanvas.data(world); // get embedded topojson
        g.create();
        this.g = g;
    }
    btnClick(e) {
        const t = e.target.innerText;
        const o = this.g._.options;
        if (t==='land')        {o.showLand = !o.showLand;} else
        if (t==='lakes')       {o.showLakes = !o.showLakes;} else
        if (t==='countries')   {o.showCountries = !o.showCountries;} else
        if (t==='graticule')   {o.showGraticule = !o.showGraticule;} else
        if (t==='transparent') {o.transparent = !o.transparent;}
    }
    render() {
        return (<div>
            <svg id="earth-js"></svg>
            <span className="ejs-buttons">
                <button onClick={this.btnClick}>transparent</button>,
                <button onClick={this.btnClick}>graticule</button>,
                <button onClick={this.btnClick}>land</button>,
                <button onClick={this.btnClick}>lakes</button>,
                <button onClick={this.btnClick}>countries</button>
            </span>
        </div>)
    }
}
export default Earth
