import React from "react";
import style from './FormControl.module.css';

export const FormControlDiv = (Element) => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            <div>
                <Element {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const FormControlSpan = (Element) => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <span className={style.formControl + ' ' + (hasError ? style.error : '')}>
            <span>
                <Element {...input} {...props} />
            </span>
            {hasError && <span>{meta.error}</span>}
        </span>
    )
}