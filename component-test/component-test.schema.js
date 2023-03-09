module.exports = (config) => {

    return {
        alias: ["component-test", "cm-test"],
        filename: "{{ARGS.NAME}}.test",
        template: config.LoadTemplate(__dirname, "component-test.template.tsx"),
        inject: {
            import: [
                "import React from 'react';",
                "import {render, screen} from '@testing-library/react';",
                "import userEvent from '@testing-library/user-event';",
                "import '@testing-library/jest-dom';",
            ],
        },
    }
};