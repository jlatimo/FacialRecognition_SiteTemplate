import React from 'react';
import Tilt from 'react-tilt'
import PokeBall from './fight-pokemon-96.png';
import './LogoNav.css';
import {Link} from "react-router-dom";

const Navigation = ({ onRouteChange }) => {

    return (
        <div >
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to='/'>
            <Tilt className=" mt2 Tilt shadow-2" options={{ max: 30 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner pa3">
                        <img alt='logo' style={{ paddingTop: '5px' }} src={PokeBall} />
                    </div>
                </Tilt>
            </Link>
                
            <Link to='/'>
            <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>  </Link>
            </nav>
        </div>
    );
}

export default Navigation;