import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDoubleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './Pagination.css';

class Pagination extends Component {

    handleIncrement() {
        this.props.paginationStore.incrementPage();
    }

    handleDecrement() {
        this.props.paginationStore.decrementPage();
    }

    handleFirstPage() {
        // For jumping back to page 1
        this.props.paginationStore.firstPage();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <button
                        className="paginationButton mr-2 col-2 col-sm-1"
                        disabled={this.props.paginationStore.prevButtonDisabled}
                        onClick={this.handleFirstPage.bind(this)}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </button>
                    <button
                        className="paginationButton mr-2 col-3 col-sm-1"
                        disabled={this.props.paginationStore.prevButtonDisabled}
                        onClick={this.handleDecrement.bind(this)}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <div className="paginationNumber mr-2 col-3 col-sm-1">
                        {this.props.paginationStore.paginationPage + 1}
                    </div>
                    <button
                        className="paginationButton col-3 col-sm-1"
                        disabled={this.props.paginationStore.nextButtonDisabled}
                        onClick={this.handleIncrement.bind(this)}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
        );
    }
}

export default inject('paginationStore')(observer(Pagination));