import React from 'react';
import Header from '../components/header/Header';

const contact = () => {
    return(
        <div className="for_container">
            <div className="header_container">
                <Header />
                <div className={"header"}>Contact Us</div>
                <div style={{marginLeft:'28px'}}>
                    <p>Alejandra Muñoz: maria.munoz10@upr.edu </p>
                    <p>Alondra Pereira: alondra.pereira@upr.edu</p>
                    <p>Diego Paris: diego.paris@upr.edu</p>
                    <p>Fher Rodríguez: fher.rodriguez@upr.edu</p>
                    <p>Héctor Miranda: hector.miranda8@upr.edu</p>
                    <p>Jean Rivera: jean.rivera4@upr.edu</p>
                    <p>Jomar Santos: jomar.santos@upr.edu</p>
                </div>
            </div>
        </div>
    )
}

export default contact;