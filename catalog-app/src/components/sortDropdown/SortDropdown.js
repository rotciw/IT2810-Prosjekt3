import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { inject, observer } from 'mobx-react';
import './SortDropdown.css'

class SortDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
          activeSort: "Pris",
        }
        this.handleSorting = this.handleSorting.bind(this);
      }

    handleSorting(name){
        this.props.sortStore.addSortAfter(name)
        this.setState({
            activeSort: name,
        })
    }

    render() {
        return (
            <Dropdown className="dropdownContainer">
                <Dropdown.Toggle className="sortToggle">
                    Sorter etter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        name="Pris"
                        className={this.state.activeSort === "Pris" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.name)}>
                            Pris (lav til høy)
                    </Dropdown.Item>
                    <Dropdown.Item
                        name="-Pris"
                        className={this.state.activeSort === "-Pris" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.name)}>
                            Pris (høy til lav)
                    </Dropdown.Item>
                    <Dropdown.Item
                        name="Alkohol"
                        className={this.state.activeSort === "Alkohol" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.name)}>
                            Alkohol (lav til høy)
                        </Dropdown.Item>
                    <Dropdown.Item
                        name="-Alkohol"
                        className={this.state.activeSort === "-Alkohol" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.name)}>
                            Alkohol (høy til lav)
                    </Dropdown.Item>
                    <Dropdown.Item
                        name="AlkoholPrKrone"
                        className={this.state.activeSort === "AlkoholPrKrone" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.name)}>
                            Alkohol pr. krone (lav til høy)
                    </Dropdown.Item>
                    <Dropdown.Item
                        name="-AlkoholPrKrone"
                        className={this.state.activeSort === "-AlkoholPrKrone" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.name)}>
                            Alkohol pr. krone (høy til lav)
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default inject('sortStore')(observer(SortDropdown));