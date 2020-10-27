import React from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import ContentMain from "../ContentMain/ContentMain";
import { connect } from "react-redux";

class ListPost extends React.Component {
  state = {
    posts: [],
    currentPage: 1,
    pageGoto: null,
  };
  componentDidMount() {
    axios.get(`/post/${this.state.currentPage}`).then((response) => {
      this.setState({
        posts: response.data.products,
        totalPages: response.data.pages,
        pageGoto: response.data.current,
      });
    });
  }
  componentDidUpdate() {
    if (
      !this.state.pageGoto ||
      (this.state.pageGoto && this.state.currentPage !== this.state.pageGoto)
    ) {
      axios.get(`/post/${this.state.currentPage}`).then((response) => {
        this.setState({
          posts: response.data.products,
          totalPages: response.data.pages,
          pageGoto: this.state.currentPage,
          currentPage: this.state.currentPage,
        });
      });
    }
  }
  setCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };
  updatePost = (id) => {
    window.location.assign('/update/' + id);
  };

  render() {
    // map tao mang moi cac phan tu do
    const posts = this.state.posts.map((post) => {
      return (
        <ContentMain
          key={post._id}
          product_name={post.product_name}
          product_summary={post.product_summary}
          photoCover={post.photoCover}
          product_slug={post.product_slug}
          clickedDeletePost={() => this.props.fetchDeletePost(post._id)}
          clickUpdatePost= {() => this.updatePost(post._id)}
        />
      );
    });
    return (
      <React.Fragment>
        {posts}
        <Pagination
          totalPages={this.state.totalPages}
          currentPage={this.state.currentPage}
          setCurrentPage={this.setCurrentPage}
        />
      </React.Fragment>
    );
  }
}
function fetchDeletePost(id) {
  return (dispatch) => {
    dispatch(fetchDelete());
    fetchDeleteSerivce(id)
      .then((data) => dispatch(fetchDeleteSuccess(data)))
      .catch((error) => dispatch(fetchDeleteFailed(error)));
  };
}
function fetchDelete() {
  return {
    type: "DELETE_POST",
  };
}
function fetchDeleteSerivce(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/delete/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
function fetchDeleteSuccess(data) {
  return {
    type: "DELETE_SUCCESS",
    data: data,
  };
}
function fetchDeleteFailed(err) {
  return {
    type: "DELETE_ERROR",
    data: err,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeletePost: (id) => dispatch(fetchDeletePost(id)),
  };
};
export default connect(null, mapDispatchToProps)(ListPost);
