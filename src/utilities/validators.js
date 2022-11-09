export const required = value => {
    return value ? undefined : 'Required'
}

export const maxLength = max => value => {
    return value && value.length > max ? `Max length is ${max} symbols` : undefined
}