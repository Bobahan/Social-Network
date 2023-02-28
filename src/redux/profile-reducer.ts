import { stopSubmit } from 'redux-form';
import { profileAPI } from '../API/profile-api';
import { PhotosType, ProfileType } from '../types/types';
import { InferActionsType, ThunkType } from './redux-store';

let initialState = {
  posts: [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Yo Yo o guys!' },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: null as string | null,
};

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST':
      return {
        ...state,
        posts: [...state.posts, { id: 4, message: action.post }],
      };
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.profile,
      };
    case 'SET_STATUS':
      return {
        ...state,
        status: action.status,
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postID),
      };
    case 'SAVE_PHOTO':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photo } as ProfileType,
      };
    default:
      return state;
  }
};

export const getProfile =
  (userID: number): ThunkType<ActionsType> =>
  async (dispatch) => {
    const response = await profileAPI.getProfile(userID);
    dispatch(actionsProfile.getUserProfile(response));
  };

export const getStatus =
  (userID: number): ThunkType<ActionsType> =>
  async (dispatch) => {
    const response = await profileAPI.getStatus(userID);
    dispatch(actionsProfile.setStatus(response));
  };

export const updateStatus =
  (status: string): ThunkType<ActionsType> =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    const responseError = response.messages[0];
    if (response.resultCode === 0) {
      dispatch(actionsProfile.setStatus(status));
    } else {
      dispatch(actionsProfile.setStatus(responseError));
    }
  };

export const updatePhoto =
  (photo: PhotosType): ThunkType<ActionsType> =>
  async (dispatch) => {
    let response = await profileAPI.updatePhoto(photo);
    if (response.resultCode === 0) {
      dispatch(actionsProfile.setProfilePhoto(response.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType<ActionsType | ReturnType<typeof stopSubmit>> =>
  async (dispatch, getState) => {
    const userID = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.resultCode === 0) {
      if (userID !== null) {
        dispatch(getProfile(userID));
      } else {
        throw new Error('userID cannot be null');
      }
    } else {
      const errorResponse = response.messages.length > 0 ? response.messages[0] : '';
      dispatch(stopSubmit('profile', { _error: errorResponse }));
      return Promise.reject(response.messages[0]);
    }
  };

export const actionsProfile = {
  addPost: (post: string) => ({ type: 'ADD_POST', post } as const),
  getUserProfile: (profile: ProfileType) => ({ type: 'SET_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
  deletePost: (postID: number) => ({ type: 'DELETE_POST', postID } as const),
  setProfilePhoto: (photo: PhotosType) => ({ type: 'SAVE_PHOTO', photo } as const),
};

export type PostType = { id: number; message: string };

type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actionsProfile>;
