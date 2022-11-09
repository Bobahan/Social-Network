import React from "react";
import { Field } from "redux-form";

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='post' component='input' type='text' />
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

export default MyPostsForm