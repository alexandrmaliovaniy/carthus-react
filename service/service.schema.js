module.exports = (config) => {
    return {
        alias: ["service", "srv"],
        filename: "{{ARGS.NAME}}.service",
        template: config.LoadTemplate(__dirname, "service.template.tsx"),
        inject: {
            import: [
                "import React from 'react';"
            ],
            export: [
                "export default {{ARGS.NAME}}Service;",
                "export type { I{{ARGS.NAME}}ServiceProps };"
            ]
        },
        overrides: [
            {
                search: [
                    {
                        up: true,
                        match: ({name}) => /\.component\./.test(name)
                    },
                    {
                        match: ({name}) => /index/.test(name)
                    }
                ],
                inject: {
                    export: [
                        "export { use{{ARGS.NAME}}, type I{{ARGS.NAME}}ServiceProps } from './{{PATH_TO.PARENT_FOLDER}}'"
                    ]
                }
            }
        ],
        dependencies: [
            {
                alias: 'srv-test',
                path: "./__tests__",
                inject: {
                    import: [
                        "import { use{{ARGS.NAME}} } from './{{PATH_TO.PARENT_FOLDER}}'"
                    ]
                }
            },
            {
                alias: 'index',
                path: './',
                inject: {
                    import: [
                        "import {{ARGS.NAME}}Service, { I{{ARGS.NAME}}ServiceProps } from './{{PATH_TO.PARENT}}';"
                    ],
                    export: [
                        "export const use{{ARGS.NAME}} = {{ARGS.NAME}}Service;",
                        "export type { I{{ARGS.NAME}}ServiceProps };"
                    ]
                }
            }
        ]
    }
};