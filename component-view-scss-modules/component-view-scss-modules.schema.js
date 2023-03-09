module.exports = (config) => {
    return {
        alias: ["component-view-scss-module", "cm-view-scss-module"],
        filename: "{{ARGS.NAME}}.styles.module",
        template: config.LoadTemplate(__dirname, "component-view-scss-modules.template.scss"),
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
                        'import styles from "./{{PATH_TO.PARENT}}.scss";'
                    ]
                }
            }
        ],
        dependencies: []
    }
};