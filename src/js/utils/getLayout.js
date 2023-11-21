/**
 * @typedef {Object} GraphLayout
 * @property {number} width - The width of the graph.
 * @property {number} height - The height of the graph.
 * @property {number} top - The top position on the graph area within the overall SVG.
 * @property {number} left - The left position on the graph area within the overall SVG.
 * @property {number} right - The right position on the graph area within the overall SVG.
 * @property {number} bottom - The bottom position on the graph area within the overall SVG.
 */

/**
 * @typedef {Object} HydratedLayout
 * @property {number} width - The width of the container SVG.
 * @property {number} height - The height of the container SVG.
 * @property {number[]} margin - The margins around the graph.
 * @property {GraphLayout} graph - The dimensions and position of the graph within the container.
 */

/**
 * Generates a layout object for a graph based on specified dimensions and margins.
 *
 * @param {number} [width] - The total width of the graph container.
 * @param {number} [height] - The total height of the graph container.
 * @param {number[]} [margin] - The margins around the graph specified as an array [top, right, bottom, left].
 * @returns {HydratedLayout} The layout object containing overall dimensions, margins, and individual graph dimensions.
 */
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
