# @tomhazledine/svg-graph-toolkit

This is a set of helper functions and React components that I commonly use when generating SVG graphs in my projects. I like to hand-roll SVG graphs with JSX and D3, but there are inevitably certain things that I need to do over and over again. I've created this library to DRY out my graphing projects and avoid re-work.

## Components

* [`<GraphBase />`](./docs/GraphBase.md) This foundational component sets up the SVG container, defining the size and scales of the graph.
* [`<GraphArea />`](./docs/GraphArea.md) Used for creating area charts, this component helps in visualizing data as a filled area on the graph.
* `<GraphBlock />` A simple way to draw blocks (rectangles) on your graph (useful for bar charts and also masking or highlighting certain areas).
* `<GraphHoverTargets />` Enables interactive elements in the graph, like tooltips or highlights when hovering over data points.
* `<GraphLabel />` Provides a way to add descriptive labels to your graphs, enhancing readability and context.
* `<GraphLine />` A simple way to draw either horizontal or vertical lines on your graph (useful for drawing grid lines).
* `<GraphPath />` Essential for line charts, this component draws lines between data points.
* `<GraphPoint />` Used to render individual data points, ideal for scatter plots or to highlight specific values in other chart types.
* `<GraphPoints />` Facilitates rendering multiple data points at once, streamlining the creation of scatter plots or similar point-based visualizations.

## Helpers

These helper functions are designed to simplify common tasks associated with setting up and scaling SVG graphs, making your graphing projects more efficient and streamlined.

* [`getLayout()`](./docs/getLayout.md) A utility function that calculates and returns layout properties such as margins and dimensions, essential for graph positioning and sizing.
* [`getScales()`](./docs/getScales.md) This function generates the necessary D3 scales based on your data, ensuring that data points are accurately represented on the graph according to their values.

