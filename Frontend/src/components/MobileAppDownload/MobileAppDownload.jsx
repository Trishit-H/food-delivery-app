import { assets } from '../../assets/assets';
import './MobileAppDownload.css';

const MobileAppDownload = () => {
    return (
        <div className='mobile-app-download' id='mobile-app-download'>
            <p>For Better Experience Download <br />Tomato App</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default MobileAppDownload