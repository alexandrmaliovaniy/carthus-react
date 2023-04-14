module.exports = (config) => {
    const deps = [];

    if (config.hasFlag('scss')) {
        deps.push({
            alias: 'cm-view-scss',
            path: './'
        })
    } else if (config.hasFlag('scss-module')) {
        deps.push({
            alias: 'cm-view-scss-module',
            path: './'
        })
    } else {
        deps.push({
            alias: 'cm-view-css',
            path: './'
        })
    }


    return {
        alias: ["component-view", "cm-view"],
        filename: "{{ARGS.NAME}}.view",
        template: config.LoadTemplate(__dirname, "component-view.template.tsx"),
        inject: {
            import: [
                "import React, { FC } from 'react';",
            ],
            export: [
                "export default {{ARGS.NAME}}View;",
                "export type { I{{ARGS.NAME}}ViewProps }"
            ]
        },
        overrides: [
            {
                search: [
                    {
                        up: true,
                        match: ({name}) => /\.component\./.test(name)
                    }
                ],
                inject: {
                    import: [
                        "import {{ARGS.NAME}}View from './{{PATH_TO.PARENT}}'"
                    ],
                    content: [
                        (content) => content.replace(/View:\s*null/, () => {
                            return "View: {{ARGS.NAME}}View"
                       })
                    ]
                }
            }
        ],
        dependencies: [...deps]
    }
};