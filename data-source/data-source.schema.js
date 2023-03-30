module.exports = (config) => {
    return {
        alias: ["data-source"],
        filename: "{{ARGS.NAME}}.source",
        template: config.LoadTemplate(__dirname, "data-source.template.tsx"),
        inject: {
            import: [
                "import React from 'react';",
            ],
            export: [
                "export default {{ARGS.NAME}}Source;",
                "export type { I{{ARGS.NAME}}SourceProps };"
            ]
        },
        overrides: [
            {
                search: [
                    {
                        up: true,
                        match: ({name}) => /\.data\./.test(name)
                    }
                ],
                inject: {
                    import: [
                        "import {{ARGS.NAME}}Source from './{{PATH_TO.PARENT}}'",
                    ],
                    content: [
                        (content) => content.replace(/Source:\s*null/, "Source: {{ARGS.NAME}}Source")
                    ]
                }
            },
            {
                search: [
                    {
                        up: true,
                        match: ({name}) => /\.data\./.test(name)
                    },
                    {
                        match: ({name}) => /index\./.test(name)
                    }
                ],
                inject: {
                    export: [
                        "export { I{{ARGS.NAME}}SourceProps } from './{{PATH_TO.PARENT}}'",
                    ]
                }
            }
        ],
        dependencies: []
    }
};