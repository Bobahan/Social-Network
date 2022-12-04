import React from "react";
import { Field, InjectedFormProps } from "redux-form";
import { maxLength, required } from "../../../utilities/validators";
import { FormControlDiv } from "../../Common/FormController/FormControl";
import { DataType } from "./MyPostsContainer";

const maxLength30 = maxLength(30)
const Textarea = FormControlDiv('textarea')

const MyPostsForm: React.FC<InjectedFormProps<DataType>>  = (props) => {
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