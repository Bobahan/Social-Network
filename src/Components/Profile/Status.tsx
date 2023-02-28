import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../redux/profile-reducer';
import { DispatchType } from '../../redux/redux-store';

const ProfileStatus: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  let dispatch = useDispatch<DispatchType>();
  let st: string = status as string;

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(updateStatus(st));
  };

  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode ? (
        <div>
          <span style={{ fontWeight: '700' }}>Status: </span>
          <span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span>
        </div>
      ) : (
        <div>
          <input value={st} onChange={changeText} onBlur={deactivateEditMode} autoFocus={true} />
        </div>
      )}
    </div>
  );
};

type PropsType = { status: string | null };

export default ProfileStatus;
