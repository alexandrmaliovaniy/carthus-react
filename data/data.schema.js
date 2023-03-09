module.exports = (config) => {
    return {
        alias: ["data"],
        filename: "{{ARGS.NAME}}.data",
        template: config.LoadTemplate(__dirname, "data.template.tsx"),
        inject: {
            import: [
                "import React from 'react';",
                "import { CreateData } from 'maverick';"
            ],
            export: [
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
                        "export default {{ARGS.NAME}}Data;"
                    ]
                }
            }
        ]
    }
};