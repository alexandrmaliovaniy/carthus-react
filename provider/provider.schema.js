module.exports = (config) => {
    return {
        alias: ["provider"],
        filename: "{{ARGS.NAME}}.context",
        template: config.LoadTemplate(__dirname, "provider.template.tsx"),
        inject: {
            import: [
                "import React, { createContext } from 'react';"
            ],
            export: [
                "export default {{ARGS.NAME}}Context;"
            ]
        },
        overrides: [
            {
                search: {
                    match: ({name}) => /index/.test(name)
                },
                inject: {
                    import: [
                        "import React, { FC, ReactNode, useContext } from 'react';",
                        "import {{ARGS.NAME}}Context from './{{PATH_TO.PARENT}}'"
                    ],
                    content: [
                        "export const {{ARGS.NAME}}Provider: FC<I{{ARGS.NAME}}ServiceProps> = ({children, ...props}: { children?: ReactNode } & I{{ARGS.NAME}}ServiceProps) => {\n\tconst service = {{ARGS.NAME}}Service(props);\n\treturn <{{ARGS.NAME}}Context.Provider value={service}>{children}</{{ARGS.NAME}}Context.Provider>\n}"
                    ],
                    export: [
                        (exp) => exp.replace(/export\s+const\s+use.+$/m, "export const use{{ARGS.NAME}} = (): ReturnType<typeof {{ARGS.NAME}}Service> => useContext({{ARGS.NAME}}Context) as ReturnType<typeof {{ARGS.NAME}}Service>;")
                    ]
                }
            },
            {
                search: {
                    up: true,
                    match: ({name}) => /\.component\./.test(name)
                },
                inject: {
                    import: [
                        "import { {{ARGS.NAME}}Provider } from './{{PATH_TO.PARENT_FOLDER}}';"
                    ],
                    content: [
                        (content) => content.replace(/providers:\s*\[(.*)\]/, (res, g) => {
                            const props = g.trim();
                            if (props.length === 0) return "providers: [{{ARGS.NAME}}Provider]"
                            return `providers: [${props}, {{ARGS.NAME}}Provider]`;
                        })
                    ]
                }
            }
        ],
        dependencies: [
            {
                alias: 'srv',
                path: "./"
            }
        ]
    }
};