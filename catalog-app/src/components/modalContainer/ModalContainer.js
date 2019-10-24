import React, { Component } from 'react';
import Modal from './modal/Modal';

class ModalContainer extends Component {
    constructor() {
        super();
        this.state = {
            isShowing: false
        };
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }

    render() {
        return (
            <div>
                {this.state.isShowing ? <div onClick={this.closeModalHandler} className="backDrop"></div> : null}
                <button className="openModalBtn" onClick={this.openModalHandler}>
                    Avansert visning (Mest populære søk)
                </button>

                <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                </Modal>
            </div>
        );
    }
}

export default ModalContainer;