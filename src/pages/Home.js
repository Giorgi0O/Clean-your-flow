import '../App.scss';
import BgLeftGradient from '../components/AnimatedBackground/BgLeftGradient';
import Title from '../components/Title/Title';
import ContentBox from '../components/AppText/ContentBox';
import SessionStart from '../components/Buttons/SessionStart'


function Home() {

  return (
    <div className='app'>
        <BgLeftGradient/>
        <Title/>
        <div className='h-3/4 w-full flex z-[100]' >
            <div className='center h-full w-1/2'>
              <ContentBox
                  body={
                      <>
                        Our <span className='bg-verde-light'> goal</span> is for you to achieve  <br/>
                        your goals in the <span className='bg-rosa-light'> cleanest </span> <br/>
                        way possible.                  
                       </>
                  }
                  bodyClass={'font-corpo text-xl font-bold text-ciano-dark'}
              />
            </div>
            <div className='center h-full w-1/2'>
                <SessionStart />
            </div>
        </div>
    </div>
  );
}

export default Home;
