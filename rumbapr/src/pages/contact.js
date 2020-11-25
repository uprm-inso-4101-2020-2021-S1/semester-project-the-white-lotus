import React from 'react';
import Header from '../components/header/Header';
import './placeCatalog.css';

const contact = () => {
    return(
        <div>
            <Header />
            <body style={{backgroundColor: '#303639'}}>
            <br />
            <div className={"header"}  style={{marginTop:'74px', textAlign: 'center'}}>The White Lotus</div>
            <br />
            <div style={{color:'#33b5e5', fontSize: '20px', textAlign: 'center'}}>Front-end Team</div>
            <div style={{fontSize: '18px', textAlign: 'center'}}>
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
            <div style={{color:'#33b5e5', fontSize: '20px', textAlign: 'center'}}>Back-end Team</div>
            <div style={{marginBottom: '100 px', fontSize: '18px', textAlign: 'center'}}>
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
            </body>
        </div>

    )
}

export default contact;