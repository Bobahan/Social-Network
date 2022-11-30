export type RequiredValidatorType = (value: string) => string | undefined

export const required: RequiredValidatorType = value => {
    return value ? undefined : 'Required'
}

export const maxLength = (max: number): RequiredValidatorType => value => {
    return value && value.length > max ? `Max length is ${max} symbols` : undefined
}