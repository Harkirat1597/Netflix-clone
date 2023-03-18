import React, { useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import userContext from '../Context/User/UserContext';

function Advertisement() {
  const { user, updateUser } = useContext(userContext);

  const userEmailRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) return navigate("/dashboard");
  }, []);

  const handleClick = () => {
    updateUser({ email: userEmailRef.current.value });
    navigate('/signup');
    return;
  }

  return (
    <>
      <Navbar type={"advertisement"} />

      <div className='advertisement '>
        {/* Login banner */}
        <div
          className='adv-get-started-banner'
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("http://s3-us-west-2.amazonaws.com/techvibes/wp-content/uploads/2017/04/24135159/Netflix-Background.jpg")`,
            backgroundPosition: "center center"
          }}
        >
          <div className='adv-banner-overlay' />
        </div>

        {/* Login form */}
        <div className='adv-get-started-form-container width-control'>
          <div className='adv-get-started-form-container-text'>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
          </div>

          <form>
            <input type={"email"} placeholder={"Email address"} ref={userEmailRef} />
            <button type='submit' onClick={handleClick} >Get Started</button>
          </form>
        </div>

        {/* Advertisements */}
        <div className='adv-column border-bottom-thick'>
          <div className='login-adv-div'>
            <img
              className='login-adv-image'
              src={"https://occ-0-4875-2164.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABYjXrxZKtrzxQRVQNn2aIByoomnlbXmJ-uBy7du8a5Si3xqIsgerTlwJZG1vMpqer2kvcILy0UJQnjfRUQ5cEr7gQlYqXfxUg7bz.png?r=420"}
              alt=""
            />
            <div className='login-adv-description'>
              <h1>Create profiles for children.</h1>
              <h2>Send children on adventures with their favourite characters in a space made just for them—free with your membership.</h2>
            </div>
          </div>
        </div>

        <div className='adv-column border-bottom-thick'>
          <div className='login-adv-div'>
            <div className='login-adv-description'>
              <h1>Enjoy on your TV.</h1>
              <h2>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h2>
            </div>
            <img
              className='login-adv-image'
              src={"https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"}
              alt=""
            />
          </div>
        </div>

        <div className='adv-column'>
          <div className='login-adv-div'>
            <div className='login-adv-description'>
              <h1>Download your shows to watch offline.</h1>
              <h2>Save your favourites easily and always have something to watch.</h2>
            </div>
            <img
              className='login-adv-image'
              src={"https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Advertisement;