import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './web1.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CreatePostUpdate from '../components/CreatePostUpdate/CreatePostUpdate';
import DetailPost from '../components/DetailPost/DetailPost';
import Login from '../components/Login/Login';
import Me from '../components/Me/Me';
import Sigup from '../components/Sigup/Sigup';
import ListPost from '../components/Post/Post';
import AlertModal from '../components/Alert/Alert';
import {connect} from 'react-redux';
class HomeComponent extends React.Component {
    render() {
        let Modal = this.props.isShowModal ? <AlertModal type={this.props.status} msg={this.props.message}/>  : null;
        if(Modal && this.props.status === 'error'){
            setTimeout(() => {
                this.props.closeModal();
            }, 1500);
        }
        if(Modal && this.props.status === 'success'){
            setTimeout(() => {
                this.props.closeModal();
                window.location.assign('/');
            }, 1500);
        }
        return (
            <div className="container">
                <Header />
                <main>
                    <Switch>
                        <Route exact path="/" component={ListPost} />
                        <Route path="/detail/:slug" component={DetailPost} />
                        <Route path="/create-post" component={CreatePostUpdate} />
                        <Route path="/update" component={CreatePostUpdate} />
                        <Route path="/login" component={Login} />
                        <Route path="/me" component={Me} />
                        <Route path="/sigup" component={Sigup} />
                    </Switch>
                </main>
                <Footer />
                {Modal}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isShowModal: state.isShowModal,
        status: state.status,
        message: state.message,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        closeModal:  () => dispatch({type:'CLOSE_MODAL'})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent);
