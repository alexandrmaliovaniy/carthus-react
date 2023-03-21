module.exports = (config) => {
    return {
        alias: ["data"],
        filename: "{{ARGS.NAME}}.data",
        template: config.LoadTemplate(__dirname, "data.template.tsx"),
        inject: {
            import: [
                "import React from 'react';",
                "import { CreateData, ReturnData } from '@carthus/core';"
            ],
            export: [
                "export type I{{ARGS.NAME}}Data = ReturnData<typeof {{ARGS.NAME}}Data>",
                "export default {{ARGS.NAME}}Data;"
            ]
        },
        overrides: [],
        dependencies: [
            {
                alias: 'data-schema',
                path: './Schema'
            },
            {
                alias: 'data-source',
                path: "./Source"
            },
            {
                alias: 'index',
                path: './',
                inject: {
                    import: [
                        "import { default as {{ARGS.NAME}}Data } from './{{PATH_TO.PARENT}}';"
                    ],
                    export: [
                        "export { type I{{ARGS.NAME}}Data } from './{{PATH_TO.PARENT}}';",
                        "export default {{ARGS.NAME}}Data;"
                    ]
                }
            }
        ]
    }
};