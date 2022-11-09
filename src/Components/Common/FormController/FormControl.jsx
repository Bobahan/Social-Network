import React from "react";
import style from './FormControl.module.css';

export const FormControl = (Element) => ({ input, meta, ...props }) => {
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