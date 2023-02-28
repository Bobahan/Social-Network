import React, { useState } from 'react';
import style from './Paginator.module.css';
import cn from 'classnames';

const Paginator: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChange,
  portionSize = 10,
}) => {
  let totalPages = Math.ceil(totalUsersCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(totalPages / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);

  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionNumber * portionSize;

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <button
          className="button button-paginator"
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}>
          back
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
        .map((p) => {
          return (
            <div
              key={p}
              onClick={() => {
                onPageChange(p);
              }}
              className={cn({ [style.selectedPage]: currentPage === p }, style.pageNumber)}>
              {p}
            </div>
          );
        })}
      {portionCount > portionNumber && (
        <button
          className="button button-paginator"
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}>
          next
        </button>
      )}
    </div>
  );
};

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (p: number) => void;
  portionSize?: number;
};

export default Paginator;
