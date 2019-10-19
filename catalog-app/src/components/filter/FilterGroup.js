import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './FilterGroup.css'

var filterData = require("./FilterData")

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
            distinctCountries: filterData.distinctCountries,
            distinctPackaging: filterData.distinctPackaging,
            distinctProductSelection: filterData.distinctProductSelection,
            selectedCountryFilter: null,
            selectedPackagingFilter: null,
            selectedProductSelectionFilter: null,
        };
        this.selectButton = this.selectButton.bind(this);
        
    }
    selectButton(filterGroup, name, i){
        console.log("selectedFilter: " + filterGroup);
        
        if (filterGroup === 0){
            console.log("selected country filter");
            this.setState({selectedCountryFilter: i});
            this.props.store.addCountryFilter(name);
        }else if(filterGroup === 1){
            console.log("selected packaging filter");
            this.setState({selectedPackagingFilter: i});
            this.props.store.addPackagingFilter(name);
        }else if(filterGroup === 2){
            console.log("selected product selection filter");
            this.setState({selectedProductSelectionFilter: i});
            this.props.store.addProductSelectionFilter(name);
        }
        
    }
    renderFilters(filterGroup, buttonNames, selectedFilter){
            
        const buttons = buttonNames.map((name, i) => {
            const buttonStyle = i === selectedFilter ? selectedButtonStyle : buttonsStyle;
            return(
                <Button onClick={() => { this.selectButton(filterGroup, name, i) }} key={i} id={i} style={buttonStyle} variant="outline-secondary">{name}</Button>
            )
            
        });
        return buttons
    };
    
    render() {
        
        return (
            <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                Land
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    {this.renderFilters(0, this.state.distinctCountries, this.state.selectedCountryFilter)}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                Emballasjetype
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                    {this.renderFilters(1, this.state.distinctPackaging, this.state.selectedPackagingFilter)}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                Produktutvalg
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                <Card.Body>
                    {this.renderFilters(2, this.state.distinctProductSelection, this.state.selectedProductSelectionFilter)}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        );
    }
  }