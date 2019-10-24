import React from 'react';
import './Modal.css'
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import ReactWordCloud from 'react-wordcloud';

const GET_POPULAR = gql`
{
  popularSearches{
    Searched,
    Times
  }
}`;

function Modal(props) {
    const { loading, error, data } = useQuery(GET_POPULAR)
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    let cloudData = []
    data.popularSearches.map(popSearch => (
        cloudData.push({
            text:popSearch.Searched,
            value:popSearch.Times
        })

    ))

    return (
        <div>
            <div className="modalWrapper"
            style={{
                visibility: props.show ? 'visible' : 'hidden',
            }}>
            <div className="modalHeader">
                <span className="closeModalBtn" onClick={props.close}>×</span>
                <h3>Mest populære søk:</h3>
            </div>
            <div className="modalBody">
                <ReactWordCloud
                    words={cloudData}
                    options={{fontSizes: [16,60]}}
                />
            </div>
        </div>
    </div>
    )
}

export default Modal;