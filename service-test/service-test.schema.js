module.exports = (config) => {

    return {
        alias: ["service-test", "srv-test"],
        filename: "{{ARGS.NAME}}.test",
        template: config.LoadTemplate(__dirname, "service-test.template.tsx"),
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