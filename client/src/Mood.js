import React from "react";
import {Link} from "react-router-dom";


function Mood(){
    return(
        <div>
            <h1>This is the Mood-o-meter page! Just a test though!</h1>
            <Link to="/">Back to landing page</Link>
        </div>
    );
}

export default Mood;