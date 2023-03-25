module.exports = (config) => {
    return {
        alias: ["guard"],
        filename: "{{ARGS.NAME}}.guard",
        template: config.LoadTemplate(__dirname, "guard.template.tsx"),
        inject: {
            import: [
                "import React, { FC } from 'react';",
                "import { Outlet } from 'react-router-dom';"
            ],
            export: [
                "export type { I{{ARGS.NAME}}GuardProps };",
                "export default {{ARGS.NAME}}Guard;"
            ]
        },
        overrides: [
            {
                search: [
                    {
                        up: true,
                        match: ({name}) => /\.router\./.test(name) || /\.route\./.test(name)
                    }
                ],
                inject: {
                    import: [
                        "import { Outlet } from 'react-router-dom';",
                        "import {{ARGS.NAME}}Guard from './{{PATH_TO.PARENT}}';"
                    ],
                    content: [
                        (content) => content.replace(/Guard:\s*null/, "Guard: {{ARGS.NAME}}Guard"),
                        (content) => content.replace(/Layout:\s*null/, "Layout: Outlet")
                    ]
                }
            }
        ],
        dependencies: []
    }
};