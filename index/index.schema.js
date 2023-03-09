module.exports = (config) => {
    return {
        alias: ["index", "idx"],
        filename: "index",
        template: config.LoadTemplate(__dirname, "index.template.tsx"),
        inject: {},
        overrides: [],
        dependencies: []
    }
};