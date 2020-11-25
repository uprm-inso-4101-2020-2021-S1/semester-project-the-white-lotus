import React from 'react';
import Header from '../components/header/Header';
import './placeCatalog.css';

const contact = () => {
    return(
        <div style={{backgroundColor: '#303639'}}>
            <Header />
            <div className={"header"}  style={{marginTop:'74px'}}>Contact Us</div>
            <div style={{marginLeft:'28px', color:'#33b5e5', fontSize: '18px'}}>Front-end Team</div>
            <div style={{marginLeft:'50px'}}>
                <p> M. Alejandra Muñoz:
                    <a href="mailto:maria.munoz10@upr.edu" target="_blank" rel="noopener noreferrer"> maria.munoz10@upr.edu</a>
                    <br />
                    Fher Rodríguez:
                    <a href="mailto:fher.rodriguez@upr.edu" target="_blank" rel="noopener noreferrer"> fher.rodriguez@upr.edu</a>
                    <br />
                    Jomar Santos:
                    <a href="mailto:jomar.santos@upr.edu" target="_blank" rel="noopener noreferrer"> jomar.santos@upr.edu</a>
                </p>
            </div>
            <div style={{marginLeft:'28px', color:'#33b5e5', fontSize: '18px'}}>Back-end Team</div>
            <div style={{marginLeft:'50px', marginBottom: '100 px'}}>
                <p> Alondra Pereira:
                    <a href="mailto:alondra.pereira@upr.edu" target="_blank" rel="noopener noreferrer"> alondra.pereira@upr.edu</a>
                    <br />
                    Diego Paris:
                    <a href="mailto:diego.paris@upr.edu" target="_blank" rel="noopener noreferrer"> diego.paris@upr.edu</a>
                    <br />
                    Héctor Miranda:
                    <a href="mailto:hector.miranda8@upr.edu" target="_blank" rel="noopener noreferrer"> hector.miranda8@upr.edu</a>
                    <br />
                    Jean Rivera:
                    <a href="mailto:jean.rivera4@upr.edu" target="_blank" rel="noopener noreferrer"> jean.rivera4@upr.edu</a>
                    <br />
                </p>
                <br />
            </div>
        </div>

    )
}

export default contact;