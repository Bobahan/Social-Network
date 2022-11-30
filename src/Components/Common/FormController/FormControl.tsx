import React from "react";
import style from './FormControl.module.css';

type FormControlDivType = {
    input: any
    meta: any
}

export const FormControlDiv = (Element: React.FC | string) => ({ input, meta, ...props }: FormControlDivType) => {
    debugger
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

type FormControlSpanParamsType = {
    input: any
    meta: {
        touched: boolean
        error: string
    }
}

type FormControlSpanType = (params: FormControlSpanParamsType) => React.ReactNode

export const FormControlSpan = (Element: React.FC | string): FormControlSpanType => ({ input, meta, ...props }) => {
    debugger
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