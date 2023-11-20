# GraphArea Component

## Overview

The `GraphArea` component is designed to create area charts within your React application. It uses SVG paths to visually represent data as a shaded area under a line, making it ideal for showing volume or cumulative data over a period.

## Installation

To use `GraphArea`, import it into your component file:

```jsx
import { GraphArea } from "@tomhazledine/svg-graph-toolkit";
```

## Props

### `data`

The data to be visualized as an area chart. The data must be an array of objects, and each object must have an `x` and `y` value

-   Type: Array
-   Example: `[{ x: 10, y: 20 }, { x: 20, y: 30 }, ...]`

### `scaleX` and `scaleY`

D3 scale functions for the X and Y axes, respectively.

-   Type: Function

### `className` (Optional)

A custom class name for styling the area chart.

-   Type: string
-   Default: "graph-area"

### `fill` (Optional)

The fill color for the area chart.

-   Type: string
-   Default: "blue"

## Example Usage

```jsx
import GraphArea from './GraphArea';
import { scaleTime, scaleLinear } from 'd3-scale';

const data = [...]; // Your data array
const scaleX = scaleTime().domain(/* domain values */);
const scaleY = scaleLinear().domain(/* domain values */);

const MyAreaChart = () => {
    return (
      <GraphArea
          data={data}
      scaleX={scaleX}
      scaleY={scaleY}
      fill="lightblue"
      className="custom-area-chart"
    />
  );
};

export default MyAreaChart;
```

This example shows how to integrate `GraphArea` with your data and scale functions to create a simple area chart. Customize the `fill` and `className` props as needed to match your styling requirements.
