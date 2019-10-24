import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleDoubleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

class Pagination extends Component {

    handleIncrement() {
        this.props.paginationStore.incrementPage()
    }

    handleDecrement() {
        this.props.paginationStore.decrementPage()
    }

    handleFirstPage() {
        this.props.paginationStore.firstPage()
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                <button
                    className="paginationButton"
                    disabled={this.props.paginationStore.prevButtonDisabled}
                    onClick={this.handleFirstPage.bind(this)}>
                         <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </button>
                <button
                    className="paginationButton"
                    disabled={this.props.paginationStore.prevButtonDisabled}
                    onClick={this.handleDecrement.bind(this)}>
                         <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <div className="paginationNumber">
                    {this.props.paginationStore.paginationPage+1}
                </div>
                <button
                    className="paginationButton"
                    disabled={this.props.paginationStore.nextButtonDisabled}
                    onClick={this.handleIncrement.bind(this)}>
                        <FontAwesomeIcon icon={faAngleRight} />
                </button>
                </div>
            </div>
        )
    }
}

export default inject('paginationStore')(observer(Pagination));