import React from "react"
import { Field } from "redux-form"

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='message' component='textarea' type='text' placeholder='Enter your message'/>
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

export default DialogsForm