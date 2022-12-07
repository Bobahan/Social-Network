import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FilterType } from "../redux/users-reducer";

const UsersSearchForm: React.FC<UsersSearchFormType> = React.memo((props) => {
    const sumbit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === "true" ? true : false
        }
        props.onSearchUsers(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik initialValues={{ term: '', friend: '' }} onSubmit={sumbit} validate={usersSearchFormValidate}>
            {({ isSubmitting }) => (
                <Form style={{ 'display': 'flex', 'justifyContent': 'center', 'marginTop': '10px' }}>
                    <Field type="term" name="term" style={{ 'padding': '5px' }} placeholder="search..." />
                    <Field name="friend" as="select">
                        <option value="null">ALL</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>Search</button>
                </Form>
            )}
        </Formik>
    </div>
})

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type UsersSearchFormType = {
    onSearchUsers: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: string
}

export default UsersSearchForm