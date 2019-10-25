import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { inject, observer } from 'mobx-react';
import './SortDropdown.css';

class SortDropdown extends Component {
    constructor(props) {
        super(props);
        this.handleSorting = this.handleSorting.bind(this);
    }

    handleSorting(id, name) {
        // Sorts after, and displays what is sorted after
        this.props.sortStore.addSortAfter(id);
        this.props.sortStore.addActiveButton(name);
    }

    render() {
        return (
            <Dropdown className="dropdownContainer">
                <Dropdown.Toggle className="sortToggle">
                    {this.props.sortStore.activeButton}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        id="-AlkoholPrKrone"
                        name="Alkohol pr. krone (høy til lav)"
                        className={this.props.sortStore.sortAfter === "-AlkoholPrKrone" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.id, item.target.name)}>
                        Alkohol pr. krone (høy til lav)
                    </Dropdown.Item>
                    <Dropdown.Item
                        id="AlkoholPrKrone"
                        name="Alkohol pr. krone (lav til høy)"
                        className={this.props.sortStore.sortAfter === "AlkoholPrKrone" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.id, item.target.name)}>
                        Alkohol pr. krone (lav til høy)
                        </Dropdown.Item>
                    <Dropdown.Item
                        id="-Alkohol"
                        name="Alkoholprosent (høy til lav)"
                        className={this.props.sortStore.sortAfter === "-Alkohol" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.id, item.target.name)}>
                        Alkohol (høy til lav)
                    </Dropdown.Item>
                    <Dropdown.Item
                        id="Alkohol"
                        name="Alkoholprosent (lav til høy)"
                        className={this.props.sortStore.sortAfter === "Alkohol" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.id, item.target.name)}>
                        Alkohol (lav til høy)
                        </Dropdown.Item>
                    <Dropdown.Item
                        id="-Pris"
                        name="Pris (høy til lav)"
                        className={this.props.sortStore.sortAfter === "-Pris" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.id, item.target.name)}>
                        Pris (høy til lav)
                    </Dropdown.Item>
                    <Dropdown.Item
                        id="Pris"
                        name="Pris (lav til høy)"
                        className={this.props.sortStore.sortAfter === "Pris" ? "sortingItem activeSortingItem" : "sortingItem"}
                        onClick={item => this.handleSorting(item.target.id, item.target.name)}>
                        Pris (lav til høy)
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default inject('sortStore')(observer(SortDropdown));