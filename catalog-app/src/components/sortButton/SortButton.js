import React from 'react';
import { inject } from 'mobx-react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function SortButton(props) {
    function descending() {
        props.sortStore.addSortElement(props.name)
        console.log(props.sortStore.sortElement)
    };
    function ascending() {
        props.sortStore.addSortElement("-"+props.name)
        console.log(props.sortStore.sortElement)
    }
    return (<div>
       <DropdownButton id="dropdownButton" title={props.name}>
            <Dropdown.Item onSelect={descending}>Synkende</Dropdown.Item>
            <Dropdown.Item onSelect={ascending} >Stigende</Dropdown.Item>
        </DropdownButton>
        </div>
        )
}

export default inject('sortStore')(SortButton);