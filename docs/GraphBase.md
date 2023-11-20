# GraphBase Component

## Overview

The `GraphBase` component serves as the foundational structure for all types of graphs within your React application. It manages the rendering of axes and the graph background while allowing you to insert additional React components like paths, points, and other graphical elements.

## Installation

Make sure to import `GraphBase` into your file:

```jsx
import { GraphBase } from "@tomhazledine/svg-graph-toolkit";
```

## Props

### `layout` - Object (required)

To draw an SVG graph, you must first define the layout of the graph. This includes the width and height of the SVG, the margins, and the position of the graph within the SVG. The `layout` prop is an object that contains all of this information.

A layout object can be generated using the [`getLayout` helper function](./getLayout.md).

The layout object should contain:

* `width`: (number) The total width of the container SVG (including margins).
* `height`: (number) The total height of the container SVG (including margins).
* `margin`: (number[]) An array containing the margins (top, right, bottom, left).
* `graph`: An object specifying the graph's width, height, and position within the SVG (top, left, right, and bottom).

**Note**: while `width`, `height`, and `margin` can be manually defined, it is recommended to use the [`getLayout` helper function](./getLayout.md) calculate the `graph` value. This ensures that the graph is positioned correctly within the SVG. `getLayout()` will also set default values for `width`, `height`, and `margin` if they are not provided.

> #### Why is the graph positioned within the SVG?
>
> The graph is positioned within the SVG so that it can be offset from the edges of the SVG. This is useful for adding labels or other graphical elements to the SVG without them being cut off by the edges of the SVG. The `graph` values are computed from the outer `width`, `height`, and `margin` values because, in practice, the total area of the SVG is what you want to work with when positioning the graph.

### `axes` - Object (optional, default value: `{}`)

An object defining the axes for the graph. The object can have keys for "top", "right", "bottom", and "left". These are all optional, so only define the axes that you want to appear in the graph.

Each axis is described by an Axis object with the following properties:

* `type`: (enum) The type of data (`"timestamp"` or `"number"`). Optional, defaults to `"number"`.
* `ticks`: (number) The number of ticks to use.
* `format`: (function) A function to format the ticks.
* `scale`: The scale type to use. This will accept any D3 scale function, but it's recommended to use the [`getScale` helper function](./getScale.md) for simplicity (and to ensure consistent scales across the multiple components rendered within the graph).

### `className` - String (Optional, default value: `"graph"`)

A string that specifies a class name for the graph component. This class name will be prepended to any auto-generated class names for internal elements like the background and axes.

### `children` - React.ReactNode

React nodes to be rendered within the graph. These can be additional graphical elements like paths, points, etc.


## Example Usage

```jsx
import { GraphBase, getLayout } from "@tomhazledine/svg-graph-toolkit";

const MyGraph = () => {
    const myData = [...]; // your data array

    const myLayout = getLayout(800, 600, [10, 20, 30, 40]);
    
    const myScales = getScales({
        layout: myLayout,
        data: myData
    }); 

    const myAxes = {
        bottom: {
            type: 'timestamp',
            ticks: 10,
            format: d => new Date(d).toLocaleDateString(),
            scale: myScales
        },
        left: {
            type: 'number',
            ticks: 5,
            format: d => `${d} units`,
            scale: /* a D3 scale function */
        }
    };


    return (
        <GraphBase
            axes={myAxes}
            className="my-custom-graph"
            layout={myLayout}
        >
            {/* Your graph content here */}
        </GraphBase>
    );
};

export default MyGraph;
```