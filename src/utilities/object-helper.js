export const updateObjectInArray = (items, objPropName, itemsID, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === itemsID) {
            return { ...u, ...newObjProps }
        }
        return u
    })
}