import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FilterType } from "../redux/users-reducer";

type UsersSearchFormType = {
    searchUsers: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<UsersSearchFormType> = (props: any) => {
    const sumbit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setTimeout(() => {
            props.searchUsers(values)
            setSubmitting(false)
        }, 200)
        setSubmitting(true)
    }

    return <div>
        <Formik initialValues={{ term: '' }} onSubmit={sumbit} validate={usersSearchFormValidate}>
            {({ isSubmitting }) => (
                <Form style={{ 'display': 'flex', 'justifyContent': 'center', 'marginTop': '10px' }}>
                    <Field type="term" name="term" style={{ 'padding': '5px' }} placeholder="search..." />
                    <button type="submit" disabled={isSubmitting}>Search</button>
                </Form>
            )}
        </Formik>
    </div>
}

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

export default UsersSearchForm