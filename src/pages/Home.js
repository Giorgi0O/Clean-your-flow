import '../App.scss';
import BgLeftGradient from '../components/AnimatedBackground/BgLeftGradient';
import Title from '../components/Title/Title';
import ContentBox from '../components/AppText/ContentBox';
import SessionStart from '../components/Buttons/SessionStart'
import { useTranslation } from 'react-i18next';

function Home() {

  const { t } = useTranslation();

  return (
    <div className='app'>
        <BgLeftGradient/>
        <div className='lg:fixed lg:left-0 center flex-col w-full h-full z-[100] lg:w-1/2 lg:flex-row ' >
            <div className='flex-col text-center center h-full w-1/2'>
              <div className='fixed top-4'>
                <Title />
              </div>
              <ContentBox
                  body={
                      <>
                        {t('home.ours_objective')}                  
                      </>
                  }
                  bodyClass={'font-titolo text-2xl font-bold text-ciano-dark'}
              />
            </div>
            <div className=' fixed bottom-0 lg:right-0
              w-5/6 bg-ciano-opacity center p-4 rounded-full shadow-sm mb-2
              lg:rounded-none lg:m-0 lg:center lg:h-full lg:w-1/2'
            >
                <SessionStart />
            </div>
        </div>
    </div>
  );
}

export default Home;
