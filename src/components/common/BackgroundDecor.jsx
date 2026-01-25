import teddy from '../../assets/images/decor/teddy5.png';
import './BackgroundDecor.css';

export default function BackgroundDecor() {
  return (
    <div className="background-decor">
      <img
        src={teddy}
        alt=""
        className="decor-teddy"
      />
    </div>
  );
}




