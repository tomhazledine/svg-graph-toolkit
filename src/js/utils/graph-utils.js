export const parseLayout = ({
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
