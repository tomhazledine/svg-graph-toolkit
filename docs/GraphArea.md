# GraphArea Component

## Overview

The `GraphArea` component is designed to create area charts within your React application. It uses SVG paths to visually represent data as a shaded area under a line, making it ideal for showing volume or cumulative data over a period.

## Installation

To use `GraphArea`, import it into your component file:

```jsx
import { GraphArea } from "@tomhazledine/svg-graph-toolkit";
```

## Props

### `data` - Array

The data to be visualized as an area chart. The data must be an array of objects, and each object must have an `x` and `y` value

Example:

```js
const data = [
  { x: 10, y: 20 },
  { x: 20, y: 30 },
  // etc...
];
```

### `classPrefix` - string (optional, default value: `"graph"`)

The prefix for the CSS class.

### `className` - string (optional, default value: `""`)

Additional CSS classes.

### `scales` - Object

An object containing the x and y scales.

* `x`: The x scale type to use.
* `y`: The y scale type to use.

`scales.x` and `scales.y` can be any D3 scale function, but it's recommended to use the [`getScale` helper function](./getScale.md) for simplicity (and to ensure consistent scales across the multiple components rendered within the graph).

### `curve` - boolean (optional, default value: `false`)

Whether to apply a curve to the area. If `false` (i.e. "no curve") then the area will be rendered as a series of straight lines between data points. If `true` (i.e. "curve") then the area will be rendered as a smooth curve between data points.

> **Note:** this toolkit currently only includes one curve type, a cubic [Catmull–Rom](https://d3js.org/d3-shape/curve#curveCatmullRom) spline. Future versions plan to include [all D3-supported curves](https://d3js.org/d3-shape/curve).

### `label` - string (optional, default value: `""`)

The label for the area.

### `baseline` - number (optional, default value: `0`)

The y-coordinate of the baseline of the area. Useful if you're truncating the y-axis and want to show the area starting from a specific point. Also useful for showing areas above and below a certain threshold.

## Example Usage

This example assumes you've already setup your `<GraphBase />` component with the necessary [layout](./getLayout.md) and [scales](./getScales.md). See the [`<GraphBase />` documentation](./GraphBase.md) for more details.

```jsx
import { GraphArea, GraphBase } from "@tomhazledine/svg-graph-toolkit";

const MyGraph = () => {
    const myData = [
        // your data array...
    ];

    // See the `getLayout()` documentation for more details.
    const myLayout = getLayout();
    
    // See the `getScales()` documentation for more details.
    const myScales = getScales({
        layout: myLayout,
        data: myData
    }); 

    // See the `<GraphBase />` documentation for more details about defining your axes. 
    const myAxes = {
        //...
    };


    return (
        <GraphBase
            axes={myAxes}
            className="my-custom-graph"
            layout={myLayout}
        >
            <GraphArea
                data={myData}
                scales={myScales}
                curve={true}
                label="My Area"
                baseline={10}
            />
        </GraphBase>
    );
};

export default MyGraph;
```