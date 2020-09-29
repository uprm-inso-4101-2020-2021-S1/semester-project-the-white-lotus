import React, { useState, useEffect } from 'react';
// import constants from '../../constants.js';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { SearchPanel } from "react-search-panel"

const choices = [{ key: "38963", description: "The Mandalorian" }, { key: "563", description: "Star Wars: The Clone Wars" }]

function Header() {
    const [input, setInput] = React.useState('');
    const [selectedChoices, setSelectedChoices] = useState(choices);
    return (
        <header style={kHeaderStyle}>
            <Container>
                <Row md={6} style={headerRowStyle}>
                    <Button style={homeButton} >LOGO BUTTON</Button>{' '}
                    <h1 >RumbaPR</h1>
                    <SearchPanel
                        choices={choices}
                        onChange={event => setInput(event.target.value)}
                        onSelectionChange={setSelectedChoices}
                        placeholder="Search a place"
                        selectedChoices={selectedChoices}
                        value={input}
                    />
                    <Button style={homeButton} >ABOUT</Button>{' '}
                    <Button style={homeButton} >HELP</Button>{' '}
                    <Button style={homeButton} >PROFILE</Button>{' '}


                </Row>
            </Container>
        </header>
    );
}

const headerRowStyle = {
    margin: '20px',
    padding: '20px'
}

const homeButton = {
    borderRadius: '50px',
    background: '#454D51',
    boxShadow: '10px 10px 20px #fff, - 10px - 10px 20px #fff'
}

const kHeaderStyle = {
    background: '#454D51',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '0px 0px 22px 22px',
    flexDirection: "row"
}

export default Header;
