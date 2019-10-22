import React from 'react';
import './Modal.css'

function modal(props) {
    return (
        <div>
            <div className="modal-wrapper"
            style={{
                visibility: props.show ? 'visible' : 'hidden',
            }}>
            <div className="modal-header">
                <h3>Avansert visning (word cloud):</h3>
                <span className="close-modal-btn" onClick={props.close}>×</span>
            </div>
            <div className="modal-body">
                <p>
                    {props.children}
                </p>
            </div>
        </div>
    </div>
    )
}

export default modal;