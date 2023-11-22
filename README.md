# @tomhazledine/svg-graph-toolkit

This is a set of helper functions and React components that I commonly use when generating SVG graphs in my projects. I like to hand-roll SVG graphs with JSX and D3, but there are inevitably certain things that I need to do over and over again. I've created this library to DRY out my graphing projects and avoid re-work.

## Basic concept

### 1. Why

There are lots of graphing libraries and charting tools out there, and they're mostly pretty great. But with any pre-made solution there are inevitably limits to what you can do. My use of graphs and charts tends to be for very specific, very idiosyncratic little charts. Charts that tell a specific story, rather than showing data in the most straightforward way possible. They're not fancy, but they have more in common with infographics and data visualizations than they do with the kinds of chart you'd see in an application dashboard. **This means I like to "hand-roll" my SVG graphs**.

But there are still tools I use over and over again, and certain ways I like to use those tools. So *this* library is my attempt to abstract the hard parts of graphing, while still allowing me to hand-roll the graphs themselves.

These are my requirements, and if your interests match these then you might find this library useful too:

* **I want to use React**. I really like React's component system and I love using JSX to generate my SVGs.
* **I want to use D3**. [D3.js](https://d3js.org/) is really good at some of the hard parts of visualizing data, and there are certain parts I use over and over again. But they can be fiddly to setup and hard to remember, so I want to abstract them away a little.
* **I want full control of my SVGs**. I don't want to be limited by the options available in a charting library. I want to be able to do whatever I want with my SVGs, and I want to be able to do it in a way that makes sense to me.

### 2. How

The basic idea behind this toolkit is to break down the common sections of graphs and charts and turn them into reusable and composable building blocks.

Crucially, these blocks are interchangeable with "regular" SVG markup, so if you need to do something unusual or specific you can just drop in some JSX and do it yourself.

```jsx
// Use <GraphBase> to set up the SVG container with axes and margins.
<GraphBase {...baseProps}>
    {/* Use <GraphPoints> to render a bunch of data points. */}
    <GraphPoints {...pointsProps} />
    {/* Use <GraphPath> to draw a line between data points. */}
    <GraphPath {...pathProps} />
    {/* YOLO some SVG markup in there if you need to. */}
    <rect x={10} y={20} width={30} height={40} />
</GraphBase>
```

Yes, the unseen `...Props` are doing a lot of heavy-lifting in that example, but it serves as a neat illustration of the basic concept.

> As with all composable systems, the goal is to make the easy things easier and the hard things possible.

To enable the "simple" composition of components, there is some complexity to be handled. And `svg-graph-toolkit` aims to help with that as well. At the core of any `svg-graph-toolkit` graph are the twin concepts of **layout** and **scaling**. The layout defines how the graph is positioned on the page or in your application. The scaling is the mathematics that converts your data into the correct coordinates for the layout.

> **You what now?!** On the screen you deal in pixels, and you might want your graph to be 500px wide and 500px tall. But your data might have a y-axis in the range 0-100 and use dates for the x-axis. So how do you convert your data into pixels? That's what scaling is for.

`svg-graph-toolkit` comes with the helper functions [`getLayout()`](./docs/) and [`getScales()`](./docs/getScales.md) which set all that up for you. These are things that are required for most SVG graphs, so I've made them as simple as possible to use.

The more complete example below shows how those helper functions create the props needed to populate the simple example above.

```jsx
const FancyGraphComponent = ({}) => {

    // An array of data you want to display.
    const rawData = [
        { date: 1614556800000, foo: 50 },
        { date: 1614643200000, foo: 100 },
        { date: 1614729600000, foo: 75 }
    ];

    // For any 2D plotting scenario, you need to convert your data into x-y coordinates.
    const xyData = rawData.map(d => ({ x: d.date, y: d.foo }));

    // Use the helper function to define the size and shape of your graph.
    const layout = getLayout({ width: 500, height: 500 });

    // Define which axes you want to display.
    const axes = {
        bottom: {
            key: "date",
            type: "timestamp"
        },
        left: {
            key: "foo"
            // No need to define the type here: the default is "number".
        }
    }

    // Use the helper function to generate the scales you need.
    const scales = getScales({
        axesConfig: {
            x: axes.bottom,
            y: axes.left
        },
        layout,
        data: rawData
    });

    const dataProps = {
        data: xyData,
        scales
    };

    return (
        <GraphBase layout={layout} axes={axes}>
            <GraphPoints {...dataProps} />
            <GraphPath {...dataProps} />
            <rect x={10} y={20} width={30} height={40} />
        </GraphBase>
    );
}
```

## Components

### Required for every graph

* [`<GraphBase />`](./docs/GraphBase.md) This foundational component sets up the SVG container, defining the size and scales of the graph.

### Core components (the ones that get used most often)

* [`<GraphArea />`](./docs/GraphArea.md) Used for creating area charts, this component helps in visualizing data as a filled area on the graph.
* `<GraphPath />` Essential for line charts, this component draws lines between data points.
* `<GraphPoints />` Facilitates rendering multiple data points at once, streamlining the creation of scatter plots or similar point-based visualizations.

### Useful utils

* `<GraphHoverTargets />` Enables interactive elements in the graph, like tooltips or highlights when hovering over data points.
* `<GraphLine />` A simple way to draw either horizontal or vertical lines on your graph (useful for drawing grid lines).

### Decorators and bonus bits

* `<GraphLabel />` Provides a way to add descriptive labels to your graphs, enhancing readability and context.
* `<GraphBlock />` A simple way to draw blocks (rectangles) on your graph (useful for bar charts and also masking or highlighting certain areas).
* `<GraphPoint />` Used to render individual data points, ideal for scatter plots or to highlight specific values in other chart types.

## Helpers

These helper functions are designed to simplify common tasks associated with setting up and scaling SVG graphs, making your graphing projects more efficient and streamlined.

* [`getLayout()`](./docs/getLayout.md) A utility function that calculates and returns layout properties such as margins and dimensions, essential for graph positioning and sizing.
* [`getScales()`](./docs/getScales.md) This function generates the necessary D3 scales based on your data, ensuring that data points are accurately represented on the graph according to their values.

