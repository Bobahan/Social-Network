import React, { useState } from "react";
import style from './Paginator.module.css';
import cn from "classnames"

const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChange, portionSize = 10 }) => {
    let totalPages = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(totalPages / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)

    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize

    return (
        <div >
            {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
            {
                pages
                    .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                    .map((p) => {
                        return (
                            <span key={p} onClick={() => { onPageChange(p) }} className={cn({
                                [style.selectedPage]: currentPage === p
                            }, style.pageNumber)}>
                                {p}
                            </span>
                        )
                    })
            }
            {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
        </div>
    )
}

export default Paginator