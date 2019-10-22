import React, { Component } from 'react';
import Modal from '../modal/Modal';
import WordCloud from '../wordcloud/WordCloud';

class ModalContainer extends Component {
    constructor(){
        super();
        this.state = {
            isShowing: false
        }
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

    render () {
        return (
            <div>
                { this.state.isShowing ? <div onClick={this.closeModalHandler} className="backDrop"></div> : null }

                <button className="open-modal-btn" onClick={this.openModalHandler}>Avansert visning</button>

                <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                        <WordCloud />
                </Modal>
            </div>
        );
    }
}

export default ModalContainer;