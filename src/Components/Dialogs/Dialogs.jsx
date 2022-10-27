import React from "react";
import s from './Dialogs.module.css';
import userAvatar from '../../assets/user.jpeg'


const Dialogs = () => {
    return (
        <div className={s.parentContainer}>
            <div className={s.users}>
                <div className={s.item}>
                    <div style={{ 'textAlign': 'center' }}>Vladimir</div>
                    <div>
                        <img src={userAvatar} className={s.imgUser} />
                    </div>
                </div>
                <div className={s.item}>
                    <div style={{ 'textAlign': 'center' }}>Vladimir</div>
                    <div>
                        <img src={userAvatar} className={s.imgUser} />
                    </div>
                </div>
                <div className={s.item}>
                    <div style={{ 'textAlign': 'center' }}>Vladimir</div>
                    <div>
                        <img src={userAvatar} className={s.imgUser} />
                    </div>
                </div>
            </div>
            <div className={s.item} style={{'padding': '50px'}}>Messages</div>
        </div>
    )
}

export default Dialogs