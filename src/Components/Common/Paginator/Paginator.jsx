import React from "react";
import style from './Paginator.module.css';

const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChange }) => {
    let totalPages = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return (
        <div>
            {
                pages.map((p, id) => {
                    return (
                        <span style={{ 'cursor': 'pointer' }} key={id} className={currentPage === p ? style.selectedPage : ''} onClick={() => { onPageChange(p) }}>
                            {p}
                        </span>
                    )
                })
            }
        </div>
    )
}

export default Paginator