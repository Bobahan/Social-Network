import { GetItemsType, instance, ResponseType } from './API';

export const usersAPI = {
  getUsers: async (
    currentPage: number,
    pageSize: number,
    term: string = '',
    friend: null | boolean = null,
  ) => {
    const res = await instance.get<GetItemsType>(
      `users?page=${currentPage}&count=${pageSize}&term=${term}` +
        (friend === null ? '' : `&friend=${friend}`),
    );
    return res.data;
  },
  follow: async (userID: number) => {
    const res = await instance.post<ResponseType>(`follow/${userID}`);
    return res.data;
  },
  unfollow: async (userID: number) => {
    const res = await instance.delete<ResponseType>(`follow/${userID}`);
    return res.data;
  },
};
