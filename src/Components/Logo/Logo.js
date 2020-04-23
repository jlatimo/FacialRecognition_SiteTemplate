import React from 'react';
import Tilt from 'react-tilt'
import PokeBall from './fight-pokemon-96.png';
import './Logo.css';

const Logo = () =>{
    return (
     <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3"> 
                <img alt='logo' style={{paddingTop: '5px'}} src={PokeBall}/>
             </div>
        </Tilt>
     </div>
    );
}

export default Logo;