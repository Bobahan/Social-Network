import React, { useState } from "react";
import style from './Paginator.module.css';
import cn from "classnames";

const Paginator: React.FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChange, portionSize = 10 }) => {
    let totalPages = Math.ceil(totalUsersCount / pageSize)
    
    let pages: Array<number> = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(totalPages / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)

    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize

    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'margin': '10px 0px 10px 0px', 'flexWrap': 'wrap' }}>
            {portionNumber > 1 && <button style={{ 'padding': '10px' }} onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
            {
                pages
                    .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                    .map((p) => {
                        return (
                            <div style={{ 'cursor': 'pointer', 'padding': '10px' }} key={p} onClick={() => { onPageChange(p) }} className={cn({
                                [style.selectedPage]: currentPage === p
                            }, style.pageNumber)}>
                                {p}
                            </div>
                        )
                    })
            }
            {portionCount > portionNumber && <button style={{ 'padding': '10px' }} onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
        </div>
    )
}

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (p: number) => void
    portionSize?: number
}

export default Paginator