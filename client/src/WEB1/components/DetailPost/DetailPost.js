import React, { useState, useEffect } from 'react';
import './DetailPost.css';
import axios from 'axios';

// React Hook
function GetPost(props) {
    // console.log(props);
    const slug = props.match.params.slug;
    const [post, setPost] = useState({});
    useEffect(() => {
        axios.get(`/detail/${slug}`)
            .then(response => {
                setPost(response.data.post);
            });
    }, [slug]);
    return (
        <div className="blogDetail">
            <div className="title">{post.product_name}</div>
            <div className="imgTitle">
                <img src={post.photoCover} alt="conghoa-img" />
            </div>
            {post.product_description_1 ? <div className="wrap-content1">{post.product_description_1}</div> : null}
            {post.photoContent_1 ? <div className="wrap-img"><img src={post.photoContent_1} alt='conghoa-img' /></div> : ''}

            {post.product_description_2 ? <div className="wrap-content1">{post.product_description_2}</div> : null}
            {post.photoContent_2 ? <div className="wrap-img"><img src={post.photoContent_2} alt='conghoa-img' /></div> : ''}

            {post.product_description_3 ? <div className="wrap-content1">{post.product_description_3}</div> : null}
            {post.photoContent_3 ? <div className="wrap-img"><img src={post.photoContent_3} alt='conghoa-img' /></div> : ''}

            {post.product_description_4 ? <div className="wrap-content1">{post.product_description_4}</div> : null}
            {post.photoContent_4 ? <div className="wrap-img"><img src={post.photoContent_4} alt='conghoa-img' /></div> : ''}

            {post.product_description_5 ? <div className="wrap-content1">{post.product_description_5}</div> : null}
            {post.photoContent_5 ? <div className="wrap-img"><img src={post.photoContent_5} alt='conghoa-img' /></div> : ''}

            {post.product_description_6 ? <div className="wrap-content1">{post.product_description_6}</div> : null}
            {post.photoContent_6 ? <div className="wrap-img"><img src={post.photoContent_6} alt='conghoa-img' /></div> : ''}

            {post.product_description_7 ? <div className="wrap-content1">{post.product_description_7}</div> : null}
            {post.photoContent_7 ? <div className="wrap-img"><img src={post.photoContent_7} alt='conghoa-img' /></div> : ''}
        </div>
    );
}
export default GetPost;
