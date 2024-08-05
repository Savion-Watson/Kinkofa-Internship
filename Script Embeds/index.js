/**
 * This script holds all the needed functions from other scripts in the "Script Embeds" folder
 * This will make it easy to send functions via jsDelivr and have them available at a global level for each webpage.
 * Please only add functions that DO NOT have direct references to  Webflow CMS items.
 *
 * Old filtering related functions are no longer necessary, and are not imported.
 * imageSlider.js is omitted since it has a CMS reference that will only work in Webflow
 *
 * How to use:
 *  1) Install webpack
 *  2) Run "npx webpack --config webpack.config.js" to generate "allScripts.js" to export
 */

import "./tagColoring.js";

import "./locationInfo.js";
