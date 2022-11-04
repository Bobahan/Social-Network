import React from "react"
import { useParams } from "react-router-dom"

export const withRouter = (Component) => {
    const ComponentWithRouterProps = (props) => {
        let params = useParams()
        return (
            <Component router={{ params }} {...props} />
        )
    }
    return ComponentWithRouterProps
}