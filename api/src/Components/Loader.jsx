import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Loader = () => {
    return(
        <div className = 'loader'>
            {/* the below was taken from fontawesome.com */}
            <i className="fas fa-spinner fa-4x fa-spin" />
        </div>
    )
}

export default Loader;