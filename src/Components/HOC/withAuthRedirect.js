import React from "react";
import { Navigate } from "react-router-dom";


// логику определили в контейнерной компоненте - WrapperRedirectComponent
// когда к нам будет поступать целевая компонента - Component
// HOC withRedirect вернет нам контейнерную компоненту с общим поведением для целевых компонент Component

export const withAuthRedirect = (Component) => {
    return class WrapperRedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'} />
            return <Component {...this.props} />
        }
    }
}






















function hello() {
    return 'Hello'
}

// вторая вложенная функция это конвеер в виде обертки и контейнера
// а внутряк уже там где-то вызывается всегда по разному 
function firstFn(fn) {
    return function secondFn() {
        return fn()
    }
}

let sayhello = firstFn(hello)
console.log(sayhello())
