export const getLayout = ({
    width = 960,
    height = 400,
    margin = [10, 10, 40, 40] // top, right, bottom, left
}) => {
    const graphWidth = width - margin[3] - margin[1];
    const graphHeight = height - margin[0] - margin[2];
    const graph = {
        width: graphWidth,
        height: graphHeight,
        top: margin[0],
        left: margin[3],
        right: margin[3] + graphWidth,
        bottom: margin[0] + graphHeight
    };
    return { width, height, margin, graph };
};

const parseScale = axis =>
    axis.type === "timestamp" ? d3.scaleTime() : d3.scaleLinear();

const parseDomain = (axis, data) => {
    const axisData = data
        .map(item => item[axis.key])
        .filter(d => d)
        .sort();
    const min = axisData[0];
    const max = axisData[axisData.length - 1];
    return [min, max];
};

export const getScales = ({ config, layout, data }) => {
    const x = parseScale(config.x)
        .range([layout.graph.left, layout.graph.right])
        .domain(
            config.x.scale
                ? [config.x.scale.min, config.x.scale.max]
                : parseDomain(config.x, data)
        );
    const y = parseScale(config.y)
        .range([layout.graph.bottom, layout.graph.top])
        .domain(
            config.y.scale
                ? [config.y.scale.min, config.y.scale.max]
                : parseDomain(config.y, data)
        );
    return { x, y };
};
