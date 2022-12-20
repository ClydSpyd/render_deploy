import React from 'react';
import './App.scss';
import icon from '../assets/icon_track2.png'
import bg_image from '../assets/treadmill.png'

const App:React.FC = () => {
    return(
        <section className='bg_exercise'>
            <div className="loginModal">
                <div className="flexRow justifyStart alignBase">

                    <h1>onTRACK</h1>
                    <p>let's get physical</p>

                </div>
                <div className="inputs">
                    <div className="inputRow">
                        <input type="text" />
                    </div>
                    <div className="inputRow">
                        <input type="text" />
                    </div>
                </div>
                <img className='icon' src={icon} />
            </div>
            <img className='bg_image' src={bg_image} />
        </section>
    )
}

export default App;