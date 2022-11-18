import React from 'react';
import preloader from '../../../assets/preloader.gif'

const Preloader = () => {
    return (
        <div style={{'display': 'flex', 'justifyContent': 'center'}}>
            <img alt="preloader" style={{ 'width': '100px' }} src={preloader} />
        </div>
    )
}

export default Preloader