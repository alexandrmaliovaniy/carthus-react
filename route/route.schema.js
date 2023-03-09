module.exports = (config) => {
    const deps = [];
    if (config.hasFlag('g')) {
        deps.push({
            alias: 'guard',
            path: '/'
        })
    }
    return {
        alias: ["route"],
        filename: "{{ARGS.NAME}}.route",
        template: config.LoadTemplate(__dirname, "route.template.tsx"),
        inject: {
            import: [
                "import React from 'react';",
                "import { CreateRoute } from 'maverick';",
            ],
            export: [
                "export default {{ARGS.NAME}}Route;",
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
                        "import {{ARGS.NAME}}Route from './{{PATH_TO.PARENT}}';"
                    ],
                    content: [
                        (content) => content.replace(/routes:\s*\[(.*)\]/, (res, g) => {
                            const props = g.trim();
                            if (props.length === 0) return "routes: [{{ARGS.NAME}}Route]"
                            return `routes: [${props}, {{ARGS.NAME}}Route]`;
                        })
                    ]
                }
            },
        ],
        dependencies: deps
    }
};