import React from "react";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

type OwnProps = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType, OwnProps> {
    constructor(props: any) {
        super(props)
        this.state = {
            editMode: false,
            status: this.props.status
        }
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: event.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <div><span onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</span></div>
                    : <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} /></div>}
            </div>
        )
    }
}

export default ProfileStatus