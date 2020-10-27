import React from "react";
import axios from "axios";

//Truyền props
class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: null,
      idUpdate: null,
      fileUpdate: null,
      nameButton: "",
      dataUpdate: {
        photoContent_1: "",
        photoContent_2: "",
        photoCover: "",
        product_description_1: "",
        product_description_2: "",
        product_name: "",
        product_price: "",
        product_slug: "",
        product_summary: "",
      },
    };
    //
    this.handleChangePostName = this.handleChangePostName.bind(this);
    //
 
    //
   
    this.apiUpdate = this.apiUpdate.bind(this);
  }
  componentDidMount() {
    const slug = this.props.location.pathname.split("/");
    const id = slug[2];

    if (slug[1] === "update") {
      axios.get("/getPost/" + id).then((response) => {
        this.setState({
          isUpdate: true,
          idUpdate: id,
          fileUpdate: "Update A Post",
          nameButton: "Update",
          dataUpdate: response.data.data,
        });
      });
    }
    if (slug === "/create-post") {
      this.state.fileUpdate = "Create A Post";
    }
  }

  
  handleChangePostName(e) {
    this.setState({dataUpdate: {
        product_name: e.target.value,
            },
    });
  };
  
 



  
  apiUpdate(e) {
    e.preventDefault();
    //  console.log(this.state.dataUpdate.product_summary);
    axios
      .post("/update/" + this.state.idUpdate, {
       
       product_name: this.state.dataUpdate.product_name,
       //
    
       //
      
        _id: this.state.idUpdate,
      })
      .then((response) => {
        console.log(response);
      });
  }


 
  render() {
    if (this.state.dataUpdate) {
      console.log(this.state.dataUpdate);
    }

    return (
      <div className="container custom-container">
        <div className="row">
          <div className="box-create-post">
            <h1>{this.state.fileUpdate}</h1>
            <form
              onSubmit={this.apiUpdate}
              className="form-create-product"
              method="post"
              encType="multipart/form-data"
            >
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="form-group">
                    <label htmlFor="product_name">Product Title: </label>
                    <input
                      className="form-control"
                      id="product_name"
                      type="text"
                      name="product_name"
                      defaultValue={this.state.dataUpdate.product_name}
                      onChange={this.handleChangePostName}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_summary">Product Summary: </label>
                    <input
                      className="form-control"
                      id="product_summary"
                      type="text"
                      name="product_summary"
                      defaultValue={this.state.dataUpdate.product_summary}
                     
                      
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoCover">Choose one photoCover:</label>
                    <input
                      id="photoCover"
                      type="file"
                      accept="image/*"
                      name="photoCover"
                      defaultValue={this.state.dataUpdate.photoCover}
                      
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_description_1">
                      Product content 1:{" "}
                    </label>
                    <textarea
                      className="product_description form-control"
                      id="product_description_1"
                      name="product_description_1"
                      cols="100"
                      rows="5"
                      defaultValue={this.state.dataUpdate.product_description_1}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoContent_1">
                      Choose one photo for content 1:
                    </label>
                    <input
                      id="photoContent_1"
                      type="file"
                      accept="image/*"
                      name="photoContent_1"
                      defaultValue={this.state.dataUpdate.photoContent_1}
                      
                    />
                  </div>
                  <div className="btn btn-success btnPlus">Plus 1 Content</div>
                  <div className="form-group">
                    <label id="idSeeImg" htmlFor="xao">
                      Choose many photos:
                    </label>
                    <input id="photos" type="file" name="images" multiple="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_price">Product Price: </label>
                    <input
                      className="form-control"
                      id="product_price"
                      type="text"
                      name="product_price"
                      defaultValue={this.state.dataUpdate.product_price}
                     
                    />
                  </div>
                  <button
                    className="btn btn-success btn-hoa-wait"
                    type="submit"
                    onClick={this.apiUpdate}
                  >
                    {this.state.nameButton}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreatePost;
