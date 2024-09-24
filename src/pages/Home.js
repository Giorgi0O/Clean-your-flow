import '../App.scss';
import BgLeftGradient from '../components/AnimatedBackground/BgLeftGradient';
import Title from '../components/Title/Title';
import ContentBox from '../components/AppText/ContentBox';
import SessionStart from '../components/Buttons/SessionStart'


function Home() {

  return (
    <div className='app'>
        <BgLeftGradient/>
        <div className='center flex-col w-full h-full z-[100] lg:w-full lg:flex-row ' >
            <div className='flex-col text-center center h-full w-1/2'>
              <div className='fixed top-4'>
                <Title />
              </div>
              <ContentBox
                  body={
                      <>
                        Our <span className='bg-verde-light'> goal</span> is for you to achieve  <br/>
                        your goals in the <span className='bg-rosa-light'> cleanest </span> <br/>
                        way possible.                  
                       </>
                  }
                  bodyClass={'font-titolo text-2xl font-bold text-ciano-dark'}
              />
            </div>
            <div className='
              w-5/6 bg-ciano-opacity center p-4 rounded-full shadow-xl mb-2
              lg:rounded-none lg:m-0 lg:center lg:h-full lg:w-1/2'
            >
                <SessionStart />
            </div>
        </div>
    </div>
  );
}

export default Home;
