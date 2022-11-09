import React from "react"
import { Field } from "redux-form"
import { required, maxLength } from "../../utilities/validators"
import { Textarea } from "../Common/Textarea"

const maxLength30 = maxLength(30)

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='message' component={Textarea} type='text' placeholder='Enter your message' validate={[required, maxLength30]} />
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

export default DialogsForm