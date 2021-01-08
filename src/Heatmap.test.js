import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Heatmap from './Heatmap';

let container = null;

// Sets up a DOM element as a render target.
beforeEach(() => {
    container = document.createElement( "div" );
    document.body.appendChild( container );
});

// Cleans up on exit.
afterEach(() => {
    unmountComponentAtNode( container );
    container.remove();
    container = null;
});

it( "creates a Heatmap element", () => {
    
    // Test first render and componentDidMount.
    act(() => {
        render( <Heatmap width="400" height="400" />, container );
    });
    
    // Test structure.
    expect( container.childNodes.length ).toBe( 1 );
    let div = container.firstChild;
    expect( div.nodeName ).toBe( "DIV" );
    let svg = div.firstChild;
    expect( svg.nodeName ).toBe( "svg" );
});

it( "draws the Heatmap", () => {
    let ref = { current: { childNodes: [ document.createElement( "svg" ), { style: { display: "inline" }}]}},
        margin = { top: 0, right: 0, bottom: 50, left: 50 },
        padding = { top: 0, right: 0, bottom: 0, left: 0 },
        xScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, 100 ]),
        yScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, 100 ]);
    Heatmap.draw( ref, 400, 400, margin, padding, true, xScale, yScale, [ 0, 1 ], [ 0, 1 ], "X", "Y", [], []);
});
