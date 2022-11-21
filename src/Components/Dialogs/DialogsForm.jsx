import React from "react"
import { Field } from "redux-form"
import { required, maxLength } from "../../utilities/validators"
import { FormControlDiv } from "../Common/FormController/FormControl"

const maxLength50 = maxLength(30)
const Textarea = FormControlDiv('textarea')

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='message' component={Textarea} type='text' placeholder='Enter your message' validate={[required, maxLength50]} />
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

export default DialogsForm