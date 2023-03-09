module.exports = (config) => {
    return {
        alias: ["component-view-scss", "cm-view-scss"],
        filename: "{{ARGS.NAME}}.styles",
        template: config.LoadTemplate(__dirname, "component-view-scss.template.scss"),
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
                        'import "./{{PATH_TO.PARENT}}.scss";'
                    ]
                }
            }
        ],
        dependencies: []
    }
};