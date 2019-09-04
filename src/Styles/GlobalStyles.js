import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset}
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    @import url('https://fonts.googleapis.com/css?family=Varela+Round&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Anton|Libre+Baskerville&display=swap');
    * {
        box-sizing: border-box;
        
    }
    head{
        font-size: 14px;
        font-family: 'Anton', sans-serif, 'Libre Baskerville', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-size: 14px;
        font-family: 'Varela Round', 'Anton', sans-serif, 'Libre Baskerville', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        paading-top: 140px;
    }
    a {
        color:${props => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus{
        outline: none;
    }
`;
