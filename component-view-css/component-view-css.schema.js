module.exports = (config) => {
    return {
        alias: ["component-view-css", "cm-view-css"],
        filename: "{{ARGS.NAME}}.styles",
        template: config.LoadTemplate(__dirname, "component-view-css.template.css"),
        overrides: [
            {
                search: [
                    {
                        up: true,
                        match: ({name}) => /\.view\./.test(name)
                    }
                ],
                inject: {
                    import: [
                        'import "./{{PATH_TO.PARENT}}.css";'
                    ]
                }
            }
        ],
        dependencies: []
    }
};