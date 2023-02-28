import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  getCurrentPage,
  getFilteredUsers,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '../../redux/users-selectors';
import { DispatchType } from '../../redux/redux-store';

import User from './User';
import UsersSearchForm from '../../Components/Search/SearchForm';
import Paginator from '../../Components/Common/Paginator/Paginator';

export const UsersPage = () => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  let currentPage = useSelector(getCurrentPage);
  let filter = useSelector(getFilteredUsers);
  const users = useSelector(getUsers);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch<DispatchType>();

  const navigate = useNavigate();
  const location = useLocation(); // here we store query param. its like - ?term=a&friend=null&page=1

  const [searchParams] = useSearchParams(location.search); // [['term': ''], ['page': 3], ['friend': null]]

  useEffect(() => {
    // @ts-ignore
    let parsed: { term: string; page: string; friend: string } = Object.fromEntries(
      Array.from(searchParams), // {term: '', friend: 'null', page: '2'}
    );

    if (parsed.page) {
      currentPage = +parsed.page;
    }

    if (parsed.term) {
      filter = { ...filter, term: parsed.term as string };
    }

    if (parsed.friend)
      filter = {
        ...filter,
        friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false,
      };

    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  useEffect(() => {
    navigate({
      pathname: '/users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    });
  }, [filter, currentPage]);

  const onPageChange = (page: number) => {
    dispatch(requestUsers(page, pageSize, filter));
  };
  const onSearchUsers = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const followSuccess = (userID: number) => {
    dispatch(follow(userID));
  };
  const unfollowSuccess = (userID: number) => {
    dispatch(unfollow(userID));
  };

  return (
    <>
      <UsersSearchForm onSearchUsers={onSearchUsers} />
      <Paginator
        onPageChange={onPageChange}
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((u, id) => (
        <User
          key={id}
          user={u}
          follow={followSuccess}
          unfollow={unfollowSuccess}
          followingInProgress={followingInProgress}
        />
      ))}
    </>
  );
};
