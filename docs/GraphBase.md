# GraphBase Component

## Overview

The `GraphBase` component serves as the foundational structure for all types of graphs within your React application. It manages the rendering of axes and the graph background while allowing you to insert additional React components like paths, points, and other graphical elements.

## Installation

Make sure to import `GraphBase` into your file:

```jsx
import GraphBase from './GraphBase'; // adjust path as needed
```

## Props

### `axes` (Optional)

An object defining the axes for the graph. The object should have keys for "top", "right", "bottom", and "left".

* Type: Object
* Default: `{}`

Each axis is described by an Axis object with the following properties:

* `type`: (enum) The type of data (`"timestamp"` or `"number"`). Optional, defaults to `"number"`.
* `ticks`: (number) The number of ticks to use.
* `format`: (function) A function to format the ticks.
* `scale`: The scale type to use.

### `className` (Optional)

A string that specifies a class name for the graph component. This class name will be prepended to any auto-generated class names for internal elements like the background and axes.

* Type: string
* Default: "graph"

### `layout`

An object that describes the layout of the graph.

* Type: Layout

The Layout object should contain:

* `width`: (number) The total width of the container SVG (including margins).
* `height`: (number) The total height of the container SVG (including margins).
* `margin`: (number[]) An array containing the margins (top, right, bottom, left).
* `graph`: An object specifying the graph's width and height, and position within the SVG (top, left, right, and bottom).

### `children`

React nodes to be rendered within the graph. These can be additional graphical elements like paths, points, etc.

* Type: React.ReactNode


## Example Usage

```jsx
import GraphBase from './GraphBase';

const myAxes = {
  bottom: {
    type: 'timestamp',
    ticks: 10,
    format: d => new Date(d).toLocaleDateString(),
    scale: /* a D3 scale function */
  },
  left: {
    type: 'number',
    ticks: 5,
    format: d => `${d} units`,
    scale: /* a D3 scale function */
  }
};

const myLayout = {
  width: 800,
  height: 600,
  margin: [10, 20, 30, 40],
  graph: {
    width: 700,
    height: 500,
    top: 10,
    left: 40,
    right: 20,
    bottom: 30
  }
};

const MyGraph = () => {
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