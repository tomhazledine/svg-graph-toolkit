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
const parseDomain = (dataKey, data) => {
    const axisData = data
        .map(item => item[dataKey])
        .filter(d => d)
        .sort();
    const min = axisData[0];
    const max = axisData[axisData.length - 1];
    return [min, max];
};

/**
 * @typedef {Object} AxisBounds
 * @property {number} min - The lower bound of the axis.
 * @property {number} max - The upper bound of the axis.
 */

/**
 * @typedef {Object} RawAxisConfig
 * @property {string} key - The key to access the data for the axis.
 * @property {string} [type] - The type of data (timestamp or number).
 * @property {AxisBounds} [bounds] - The upper and lower bounds of the axis.
 */

/**
 * @typedef {Object} AxisConfig
 * @property {string} key - The key to access the data for the axis.
 * @property {string} type - The type of data (timestamp or number).
 * @property {number[]} bounds - An array of two numbers representing the upper and lower bounds of the axis.
 */

/**
 * @typedef {Object} ParsedAxesConfig
 * @property {AxisConfig} x - The configuration for the x axis.
 * @property {AxisConfig} y - The configuration for the y axis.
 */
/**
 * @typedef {Object} AxesConfig
 * @property {RawAxisConfig} x - The configuration for the x axis.
 * @property {RawAxisConfig} y - The configuration for the y axis.
 */

/**
 * Parses the configuration for the x and y axes.
 * @param {AxesConfig} rawAxesConfig - The raw configuration object for the axes.
 * @param {Array} data - The data array.
 * @returns {ParsedAxesConfig} - The parsed configuration object for the axes.
 * @throws {Error} - Throws an error if no configuration is provided for an axis.
 * @throws {Error} - Throws an error if no key is provided for an axis.
 */
const parseAxesConfig = (rawAxesConfig = {}, data) =>
    ["x", "y"].reduce((axesConfig, axisKey) => {
        const rawConfig = rawAxesConfig[axisKey];

        if (!rawConfig) {
            throw new Error(`No configuration provided for ${axisKey} axis.`);
        }
        if (!rawConfig.key) {
            throw new Error(`No data key provided for ${axisKey} axis.`);
        }

        return {
            ...axesConfig,
            [axisKey]: {
                key: rawConfig.key,
                type: rawConfig.type || "number",
                bounds: rawConfig.bounds
                    ? [rawConfig.bounds.min, rawConfig.bounds.max]
                    : parseDomain(rawConfig.key, data)
            }
        };
    }, {});

/**
 * Generates the scales for the x and y axes based on the provided configuration, layout, and data.
 *
 * @param {AxesConfig} axesConfig - The configuration object for the axes.
 * @param {Object} layout - The layout object for the container SVG and the graph.
 * @param {Array} data - The data array.
 * @returns {Object} - An object containing the scales for the x and y axes.
 */
export const getScales = ({ axesConfig, layout, data }) => {
    const { x: xConfig, y: yConfig } = parseAxesConfig(axesConfig, data);

    const x = selectScaleFunction(xConfig.type)
        .range([layout.graph.left, layout.graph.right])
        .domain(xConfig.bounds);

    const y = selectScaleFunction(yConfig.type)
        .range([layout.graph.bottom, layout.graph.top])
        .domain(yConfig.bounds);

    return { x, y };
};
