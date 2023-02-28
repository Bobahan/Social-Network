import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from '../HOC/withRouter';
import { getStatus, getProfile, updateStatus } from '../../redux/profile-reducer';
import { compose } from 'redux';
import { withAuthRedirect } from '../HOC/withAuthRedirect';
import Profile from './Profile';
import { ProfileType } from '../../types/types';
import { AppStateType, DispatchType } from '../../redux/redux-store';
import { useParams } from 'react-router-dom';

const ProfileContainer: React.FC<
  MapStateToPropsType & MapDispatchToPropsType & PathParamsType
> = () => {
  let params = useParams();

  let authorizedID = useSelector((state: AppStateType) => state.auth.id);
  let status = useSelector((state: AppStateType) => state.profilePage.status);
  let profile = useSelector((state: AppStateType) => state.profilePage.profile);

  const dispatch = useDispatch<DispatchType>();

  const refreshProfile = () => {
    let userID = params.userId as any;
    if (!userID) {
      userID = authorizedID;
    }
    dispatch(getProfile(userID));
    dispatch(getStatus(userID));
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [params.userId]);

  return <Profile isOwner={!params.userId} status={status} profile={profile} />;
};

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedID: state.auth.id,
    isAuth: state.auth.isAuth,
  };
};

type PathParamsType = { router: any };

type MapStateToPropsType = {
  profile: ProfileType | any;
  status: string | null;
  authorizedID: number | null;
  isAuth: boolean;
};

type MapDispatchToPropsType = {
  getProfile: (userID: number) => void;
  getStatus: (userID: number) => void;
  updateStatus: (status: string) => void;
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
  }),
  withAuthRedirect,
  withRouter,
)(ProfileContainer);
