import React from "react";
import { Field } from "redux-form";
import { maxLength, required } from "../../../utilities/validators";
import { FormControlDiv } from "../../Common/FormController/FormControl";

const maxLength30 = maxLength(30)
const Textarea = FormControlDiv('textarea')

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='post' component={Textarea} type='text' validate={[required, maxLength30]} />
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

export default MyPostsForm