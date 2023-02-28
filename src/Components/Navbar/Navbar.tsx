import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const LinkActive = ({ isActive }: { isActive: boolean }) => {
  return isActive ? style.active : style.text;
};

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <div className={style.item}>
        <NavLink className={LinkActive} to={'/profile'}>
          Profile
        </NavLink>
      </div>
      <div className={style.item}>
        <NavLink className={LinkActive} to={'/users'}>
          Users
        </NavLink>
      </div>
      <div className={style.item}>
        <NavLink className={LinkActive} to={'/chat'}>
          Chat
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
