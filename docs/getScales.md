# `getScales` Helper Function

## Overview

The `getScales` function is a crucial utility in the SVG Graph Toolkit, used for generating D3 scales based on the data set provided. It automates the process of creating accurate and proportionate scales for both the X and Y axes of a graph.

## Installation

Import `getScales` into your component:

```jsx
import { getScales } from "@tomhazledine/svg-graph-toolkit";
```

## Parameters

### axesConfig - Object

Configuration object for the axes, specifying details for both x and y axes.

* `x`: Object - Configuration for the x-axis.
    * `type`: string - The data type of the axis ('timestamp' or 'number').
    * `key`: string - The key to access the data for the axis.
    * `scale`: Object (Optional) - Object defining the scale range with min and max values.
* `y`: Object - Configuration for the y-axis, similar structure to x.

### layout - Object

A layout object generated using the [`getLayout` helper function](./getLayout.md).

### data - Array

The dataset that will be visualized on the graph. This should be an array of objects, with each object representing a single data point. Each object should have a key that matches the `key` value specified in the `axesConfig` object. Each object should also have an `x` and `y` value, representing the data point's position on the graph.

## Returns

An object containing:

* `x`: The D3 scale function for the X-axis.
* `y`: The D3 scale function for the Y-axis.

## Example Usage

```jsx
import { getLayout, getScales } from "@tomhazledine/svg-graph-toolkit";

const data = [...]; // your data array

const layout = getLayout();

const axesConfig = {
    x: {
        type: "timestamp",
        key: "date"
    },
    y: {
        type: "number",
        key: "value",
        scale: {
            min: 0,
            max: 100
        }
    }
};

const scales = getScales({ axesConfig, layout, data });

// Use `scales.x` and `scales.y` for plotting your data on the graph
```

This helper function streamlines the process of setting up scales for your graph, ensuring that your data is represented accurately and effectively on the SVG canvas.