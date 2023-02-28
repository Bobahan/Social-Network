import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FilterType } from '../../redux/users-reducer';
import { useSelector } from 'react-redux';
import { getFilteredUsers } from '../../redux/users-selectors';
import style from './SearchForm.module.css';

const UsersSearchForm: React.FC<UsersSearchFormType> = React.memo((props) => {
  const filter = useSelector(getFilteredUsers);
  const sumbit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
    };
    props.onSearchUsers(filter);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) }}
        onSubmit={sumbit}
        validate={usersSearchFormValidate}>
        {({ isSubmitting }) => (
          <Form className={style.form}>
            <Field className={style.form__search} type="term" name="term" placeholder="search..." />
            <Field name="friend" as="select">
              <option value="null">ALL</option>
              <option value="true">Followed</option>
              <option value="false">Unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type UsersSearchFormType = { onSearchUsers: (filter: FilterType) => void };
type FormType = { term: string; friend: string };
export default UsersSearchForm;
