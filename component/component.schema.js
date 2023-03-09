module.exports = (config) => {
    const dep = [];

    if (config.hasFlag('p')) {
        dep.push({
            alias: 'provider',
            path: './Service/{{ARGS.NAME}}/'
        })
    } else {
        dep.push({
            alias: 'srv',
            path: './Service/{{ARGS.NAME}}/'
        },)
    }
    return {
        alias: ["component", "cm"],
        filename: "{{ARGS.NAME}}.component",
        template: config.LoadTemplate(__dirname, "component.template.tsx"),
        inject: {
            import: [
                "import React from 'react';",
                "import { CreateComponent } from '@carthus/core';"
            ],
            export: [
                "export default {{ARGS.NAME}};",
            ]
        },
        overrides: [
            {
                search: [
                    {
                        match: ({name}) => /index/.test(name)
                    }
                ],
                inject: {
                    import: [
                        "import { default as {{ARGS.NAME}} } from './{{PATH_TO.PARENT}}';"
                    ],
                    export: [
                        "export default {{ARGS.NAME}};"
                    ]
                }
            }
        ],
        dependencies: [
            ...dep,
            {
                alias: 'cm-view',
                path: './View/'
            },
            {
                alias: 'index',
                path: './'
            },
            {
                alias: 'cm-test',
                path: "./__tests__",
                inject: {
                    import: [
                        "import {{ARGS.NAME}} from './{{PATH_TO.PARENT_FOLDER}}'"
                    ],
                    content: [
                        (content) => content.replace(/render\([^\)]*\)/, "render(<{{ARGS.NAME}} />)")
                    ]
                }
            }
        ]
    }
};