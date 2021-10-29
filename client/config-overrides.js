/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, removeModuleScopePlugin, override } = require("customize-cra");

module.exports = override(useBabelRc(), removeModuleScopePlugin());
