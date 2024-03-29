import React from 'react';
import { ReactDOM, render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import * as d3 from 'd3';
import Graph from './Graph';
import ScatterPlot from './ScatterPlot';

let container = null;

// Sets up a DOM element as a render target.
beforeEach(() => {
    window.PointerEvent = MouseEvent;   // PointerEvent is not supported in JSDOM
    container = document.createElement( "div" );
    document.body.appendChild( container );
});

// Cleans up on exit.
afterEach(() => {
    unmountComponentAtNode( container );
    container.remove();
    container = null;
});

it( "creates a ScatterPlot element", () => {
    
    // Test first render and componentDidMount.
    act(() => {
        render( <ScatterPlot width="400" height="400" />, container );  
    });
    
    // Test structure.
    expect( container.childNodes.length ).toBe( 1 );
    let div = container.firstChild;
    expect( div.nodeName ).toBe( "DIV" );
    let svg = div.firstChild;
    expect( svg.nodeName ).toBe( "svg" );
});

it( "draws the ScatterPlot", () => {
    let ref = { current: { childNodes: [
            document.createElement( "svg" ),
            document.createElement( "BUTTON" ),
            document.createElement( "BUTTON" ),
            document.createElement( "SPAN" ),
            document.createElement( "SPAN" )
        ]}},
        margin = { top: 0, right: 0, bottom: 50, left: 50 },
        padding = { top: 0, right: 0, bottom: 0, left: 0 },
        xScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, 100 ]),
        yScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, 100 ]),
        symbolScale = d3.scaleOrdinal([ 0, 1 ], d3.symbols.map( s => d3.symbol().type( s ).size( 100 )()));
    ScatterPlot.draw( d3.select( ref.current.childNodes[ 0 ]), margin, padding, false, xScale, yScale, [ 0, 1 ], [ 0, 1 ], "X", "Y", "Iris", symbolScale );
});
