module.exports = (config) => {
    return {
        alias: ["data-schema"],
        filename: "{{ARGS.NAME}}.schema",
        template: config.LoadTemplate(__dirname, "data-schema.template.tsx"),
        inject: {
            import: [
                "import React from 'react';",
                "import { z } from 'zod';"
            ],
            export: [
                "export type { I{{ARGS.NAME}}Schema };",
                "export default {{ARGS.NAME}}Schema;"
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
                        "import {{ARGS.NAME}}Schema from './{{PATH_TO.PARENT}}'",
                    ],
                    content: [
                        (content) => content.replace(/Schema:\s*null/, "Schema: {{ARGS.NAME}}Schema")
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
                        "export type { I{{ARGS.NAME}}Schema } from './{{PATH_TO.PARENT}}';"
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
                        down: true,
                        match: ({name}) => /source\./.test(name)
                    }
                ],
                inject: {
                    import: [
                        "import { I{{ARGS.NAME}}Schema } from './{{PATH_TO.PARENT}}';"
                    ],
                    content: [
                        (content) => content.replace(/\)\s*=>/, "): I{{ARGS.NAME}}Schema =>")
                    ]
                }
            },
        ],
        dependencies: []
    }
};