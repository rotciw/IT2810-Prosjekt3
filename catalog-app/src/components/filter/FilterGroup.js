import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nouislider from 'react-nouislider';
import 'nouislider/distribute/nouislider.css';
import 'nouislider/src/nouislider.tooltips.less';
import 'nouislider/src/nouislider.pips.less';
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
            yearMinFilter: "1900",
            yearMaxFilter: "2019",
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

    handleSlider = (render, handle, value, un, percent) => {
        this.setState({yearMinFilter: value[0].toFixed(0)});
        this.setState({yearMaxFilter: value[1].toFixed(0)});
    }
    handleSliderUpdate = (render, handle, value, un, percent) => {
        this.props.store.addYearMinFilter(value[0].toFixed(0));
        this.props.store.addYearMaxFilter(value[1].toFixed(0));
    }
    
    render() {
        
        return (
            
            <Accordion>
            <Card>
                <Card.Header className="filterHeader">
                <h5>Filtrering</h5>
                </Card.Header>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="cardHeader">
                Land
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    {this.renderFilters(0, this.state.distinctCountries, this.state.selectedCountryFilter)}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1" className="cardHeader">
                Årgang
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <div className="yearSlider">
                        <Nouislider
                            range={{min: 1900, max: 2019}}
                            step={1}
                            connect={true}
                            start={[this.state.yearMinFilter, this.state.yearMaxFilter]}
                            onSlide={this.handleSlider}
                            onChange={this.handleSliderUpdate}
                            
                        />
                        <p className="yearSliderValues">{this.state.yearMinFilter} - {this.state.yearMaxFilter}</p>
                        
                    </div>

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2" className="cardHeader">
                Emballasjetype
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                <Card.Body>
                    {this.renderFilters(1, this.state.distinctPackaging, this.state.selectedPackagingFilter)}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3" className="cardHeader">
                Produktutvalg
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                <Card.Body>
                    {this.renderFilters(2, this.state.distinctProductSelection, this.state.selectedProductSelectionFilter)}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            
            </Accordion>
        );
    }
  }