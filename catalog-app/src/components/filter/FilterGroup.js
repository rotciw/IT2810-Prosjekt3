import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './FilterGroup.css'

var distinctCountriesFile = require("./DistinctCountries")

let buttonsStyle = {
    margin: "5px",
  };

let selectedButtonStyle = {
    background: "#6c757d",
    margin: "5px",
    color: "white",
  };

export default class FilterGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            distinctCountries: distinctCountriesFile.distinctCountries.sort(),
            selectedCountryFilter: null,
        };
        this.selectButton = this.selectButton.bind(this);
        
    }
    selectButton(name, i){
        this.setState({selectedCountryFilter: i});
        this.props.store.addCountryFilter(name);
    }
    renderCountryFilters(){
            
        const buttons = this.state.distinctCountries.map((name, i) => {
            const buttonStyle = i === this.state.selectedCountryFilter ? selectedButtonStyle : buttonsStyle;
            return(
                <Button onClick={() => { this.selectButton(name, i) }} key={i} id={i} style={buttonStyle} variant="outline-secondary">{name}</Button>
            )
            
        });
        return buttons
    };
    
    render() {
        
        return (
            <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                Land
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>

                    {this.renderCountryFilters()}

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                Filter
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        );
    }
  }