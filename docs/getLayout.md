# `getLayout` Helper Function

## Overview

The `getLayout` function is a utility designed to calculate and return layout properties for your SVG graphs. It simplifies the process of determining the dimensions and margins of your graph, ensuring that it fits perfectly within its container.

## Usage

To use `getLayout`, simply import it into your component:

```jsx
import { getLayout } from "@tomhazledine/svg-graph-toolkit";
```

## Parameters

* `width`: (number) The total width of the container SVG in pixels. Optional, defaults to `960`.
* `height`: (number) The total height of the container SVG in pixels. Optional, defaults to `400`.
* `margin`: (array) An array specifying the top, right, bottom, and left margins in pixels (in that order). Optional, defaults to `[10, 10, 40, 40]`.

## Returns

An object containing calculated properties:

* `width`: (number) Matches the `width` parameter.
* `height`: (number) Matches the `height` parameter.
* `margin`: (array) Matches the `margin` parameter.
* `graph`: (object) An object containing the following properties:
  * `width`: (number) The width of the graph area (minus margins).
  * `height`: (number) The height of the graph area (minus margins).
  * `top`: (number) The top position on the graph area within the overall SVG.
  * `right`: (number) The right position on the graph area within the overall SVG.
  * `bottom`: (number) The bottom position on the graph area within the overall SVG.
  * `left`: (number) The left position on the graph area within the overall SVG.

## Example Usage

```jsx
import { GraphBase, getLayout } from "@tomhazledine/svg-graph-toolkit";

const layout = getLayout(800, 600, [20, 30, 20, 40 ]);

const MyGraph = () => {
    return (
        <GraphBase layout={layout}>
            {/* Your graph contents go here */}
        </GraphBase>
    );
};
```