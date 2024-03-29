import React, {useEffect} from 'react'
import flight from './flight.json';
import 'earthjs/example/css/earthjs.css';

let earth = {};
earth.flight = flight;
window.earth = earth;

function Earth() {
    useEffect(() => {
        const {earthjs} = window;
        const g = earthjs({
            width: 420, height: 420,
            rotate:[47.29637916005367, -2.050804868735837, 1.2794284579135258],
            scale:120})
        .register(earthjs.plugins.inertiaPlugin())
        .register(earthjs.plugins.autorotatePlugin())
        .register(earthjs.plugins.dropShadowSvg())
        .register(earthjs.plugins.threejsPlugin())
        .register(earthjs.plugins.globeThreejs('/world_1.jpg'))
        .register(earthjs.plugins.worldThreejs('/world-110m.json'))
        .register(earthjs.plugins.flightLineThreejs(false,'/point3.png'));
        g.ready(() => {
            g.create();
            g.flightLineThreejs.data(flight, ['green', 'red'], [100,500], 50);
            g.flightLineThreejs.reload();
        });
        
        earth.g = g;
    }, []);

    return (<>
        <canvas id="three-js" className="ej-center"></canvas>
        <svg id="earth-js" className="ej-center"></svg>
        <span className="ejs-buttons">.</span>
    </>);
}
export default Earth
