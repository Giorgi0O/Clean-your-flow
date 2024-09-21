import '../App.scss';
import './Home.css';
import BgLeftGradient from '../components/AnimatedBackground/BgLeftGradient';
import Title from '../components/Title/Title';
import ContentBox from '../components/AppText/ContentBox';
import SessionStart from '../components/Buttons/SessionStart'


function Home() {

  return (
    <div className='app'>
        <BgLeftGradient/>
        <Title/>
        <div id='home-container' >
            <div className='home-left titolo3-font'>
              <ContentBox
                  body={
                      <>
                        Our <span className='marker-green'> goal</span> is for you to achieve  <br/>
                        your goals in the <span className='marker-pink'> cleanest </span> <br/>
                        way possible.                  
                       </>
                  }
                  bodyClass={'titolo-font color-dark-ciano'}
              />
            </div>
            <div className='home-rigth'>
                <SessionStart />
            </div>

        </div>
    </div>
  );
}

export default Home;
