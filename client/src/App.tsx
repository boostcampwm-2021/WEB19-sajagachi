/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

const testStyle = css`
    color: red;
`;

const App = () => {
    return <div css={testStyle}>client 개발환경 세팅</div>;
};

export default App;
