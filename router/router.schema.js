module.exports = (config) => {
    const deps = [];
    if (config.hasFlag('g')) {
        deps.push({
            alias: 'guard',
            path: '/'
        })
    }
    return {
        alias: ["router"],
        filename: "{{ARGS.NAME}}.router",
        template: config.LoadTemplate(__dirname, "router.template.tsx"),
        inject: {
            import: [
                "import React from 'react';",
                "import { CreateRouter } from 'maverick';",
            ],
            export: [
                "export default {{ARGS.NAME}}Router;",
            ]
        },
        overrides: [
            {
                search: [
                    {
                        path: "..",
                        up: true,
                        match: ({name}) => /\.router\./.test(name) || /\.route\./.test(name)
                    }
                ],
                inject: {
                    import: [
                        "import {{ARGS.NAME}}Router from './{{PATH_TO.PARENT}}';"
                    ],
                    content: [
                        (content) => content.replace(/routes:\s*\[(.*)\]/, (res, g) => {
                            const props = g.trim();
                            if (props.length === 0) return "routes: [{{ARGS.NAME}}Router]"
                            return `routes: [${props}, {{ARGS.NAME}}Router]`;
                        })
                    ]
                }
            },
        ],
        dependencies: deps
    }
};