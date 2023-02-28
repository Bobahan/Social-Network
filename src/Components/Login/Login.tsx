import LoginForm from './LoginForm';
import style from './Login.module.css';
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import { AppStateType, DispatchType } from '../../redux/redux-store';

export const Login = () => {
  const captcha = useSelector((state: AppStateType) => state.auth.captcha);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch = useDispatch<DispatchType>();

  const onSubmit = (formData: LoginFormType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  };

  if (isAuth) {
    return <Navigate to={'/profile'} />;
  }

  return (
    <div className="container">
      <div className={style.login}>
        <h2>Login</h2>
        <LoginReduxForm onSubmit={onSubmit} captcha={captcha} />
      </div>
    </div>
  );
};

export type LoginFormType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export type LoginFormOwnProps = { captcha: string | null };

const LoginReduxForm = reduxForm<LoginFormType, LoginFormOwnProps>({ form: 'login' })(LoginForm);
