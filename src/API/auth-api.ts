import { instance, ResponseType, ResultCodesEnum, ResultCodesForCaptchaEnum } from './API';

export const authAPI = {
  authMe: async () => {
    return await instance
      .get<ResponseType<AuthMeType, ResultCodesEnum>>(`auth/me`)
      .then((res) => res.data);
  },
  login: async (
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null,
  ) => {
    return await instance
      .post<ResponseType<LoginType, ResultCodesEnum | ResultCodesForCaptchaEnum>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout: async () => {
    return await instance.delete<ResponseType>(`auth/login`).then((res) => res.data);
  },
};

type AuthMeType = { id: number; email: string; login: string };
type LoginType = { userId: number };
