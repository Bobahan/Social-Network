import React from "react"
import { Field, InjectedFormProps } from "redux-form"
import { required, maxLength } from "../../utilities/validators"
import { FormControlDiv } from "../Common/FormController/FormControl"
import { DialogsFormType } from "./Dialogs"

const maxLength50 = maxLength(30)
const Textarea = FormControlDiv('textarea')

type OwnProps = {}

const DialogsForm: React.FC<InjectedFormProps<DialogsFormType, OwnProps> & OwnProps> = (props) => {
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