import { scaleLinear, scaleTime } from "d3-scale";

/**
 * Selects the appropriate D3 scale function based on the axis data type.
 *
 * @param {string} dataType - The data type of the axis ('timestamp' or 'number').
 * @returns A D3 scale function (either scaleTime or scaleLinear).
 */
const selectScaleFunction = dataType =>
    dataType === "timestamp" ? scaleTime() : scaleLinear();

/**
 * Parses the domain of a given axis from the provided data. In D3, the domain is the range of values for the axis represented by an array of two values: the minimum and maximum values.
 *
 * @param {string} axisKey - The key to access the data for the axis.
 * @param {Array} data - The data array.
 * @returns {Array} - An array containing the minimum and maximum values from the data for the given axis.
 */
const parseDomain = (axisKey, data) => {
    const axisData = data
        .map(item => item[axisKey])
        .filter(d => d)
        .sort();
    const min = axisData[0];
    const max = axisData[axisData.length - 1];
    return [min, max];
};

/**
 * Generates the scales for the x and y axes based on the provided configuration, layout, and data.
 *
 * @param {Object} axesConfig - The configuration object for the axes.
 * @param {Object} layout - The layout object for the container SVG and the graph.
 * @param {Array} data - The data array.
 * @param {Object} axesConfig.x - The configuration for the x axis.
 * @param {Object} axesConfig.y - The configuration for the y axis.
 * @param {Object} layout.graph - The layout for the graph.
 * @returns {Object} - An object containing the scales for the x and y axes.
 */
export const getScales = ({ axesConfig, layout, data }) => {
    const x = selectScaleFunction(axesConfig.x.type)
        .range([layout.graph.left, layout.graph.right])
        .domain(
            axesConfig.x.scale
                ? [axesConfig.x.scale.min, axesConfig.x.scale.max]
                : parseDomain(axesConfig.x.key, data)
        );
    const y = selectScaleFunction(axesConfig.y.type)
        .range([layout.graph.bottom, layout.graph.top])
        .domain(
            axesConfig.y.scale
                ? [axesConfig.y.scale.min, axesConfig.y.scale.max]
                : parseDomain(axesConfig.y.key, data)
        );
    return { x, y };
};
