import React from "react";

class ProfileStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
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
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <div><span onDoubleClick={this.activateEditMode}>{this.props.status}</span></div>
                    : <div><input autoFocus={true} onBlur={this.deactivateEditMode} onChange={() => 'HELLO'} value={this.props.status} /></div>}
            </div>
        )
    }
}

export default ProfileStatus