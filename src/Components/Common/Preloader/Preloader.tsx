import style from './Preloader.module.css';
import preloader from '../../../assets/preloader.gif';

const Preloader = () => {
  return (
    <div className={style.preloader}>
      <img alt="preloader" src={preloader} />
    </div>
  );
};

export default Preloader;
