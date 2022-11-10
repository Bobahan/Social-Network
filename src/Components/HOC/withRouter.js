import React from "react"
import { useLocation, useParams } from "react-router-dom"

export const withRouter = (Component) => {
    const ComponentWithRouterProps = (props) => {
        let params = useParams()
        let location = useLocation()
        return (
            <Component router={{ params, location }} {...props} />
        )
    }
    return ComponentWithRouterProps
}