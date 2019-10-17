import React, {Component} from 'react';

export default class Form extends Component {
  constructor() {
    super()
    this.submitReview = this.submitReview.bind(this)
  }

  submitReview = (e) => {
    e.preventDefault();
    const review = this.review.value;
    console.log(review)
    this.props.store.addItem(review)
  };

  render() {
    return (
      <div className="formSection">
        <div className="form-group">
          <p>Submit a Review</p>
        </div>
        <form onSubmit={this.submitReview}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" name="review" ref={node => {
                  this.review = node;
                }} id="review" placeholder="Write a review" className="form-control"/>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <button className="btn btn-success" type="submit">SUBMIT REVIEW</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}