import React, { Component } from "react";
import "./ContentMain.css";
import { Link } from "react-router-dom";
class ContentMain extends Component {
  render() {
    return (
      <div className="box">
        <img src={this.props.photoCover} alt="hoa" />
        <span className="title">{this.props.product_name}</span>
        <span className="summary">{this.props.product_summary}</span>
        <div className="box-line1">
          <span className="rating">Rating</span>
          <span className="vies">views</span>
        </div>
        <div className="box-footer">
          <button>
            <a
              className="btnDeleteProduct"
              data-product-id="productid"
              onClick={this.props.clickedDeletePost}
            >
              Delete
            </a>
          </button>
          <button onClick={this.props.clickUpdatePost}>Update</button>
          <button>
            <Link to={"/detail/" + this.props.product_slug}>Detail</Link>
          </button>
        </div>
      </div>
    );
  }
}
export default ContentMain;
