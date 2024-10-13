import '../App.scss';
import BgLeftGradient from '../components/AnimatedBackground/BgLeftGradient';
import Title from '../components/Title/Title';
import ContentBox from '../components/AppText/ContentBox';
import SessionStart from '../components/Buttons/SessionStart'
import { useTranslation } from 'react-i18next';
import {ReactComponent as ModalIcon1} from '../assets/Icons/task_modal_icon.svg';
import {ReactComponent as ModalIcon2} from '../assets/Icons/time_selector.svg';
import {ReactComponent as ModalIcon3} from '../assets/Icons/mode_selector.svg';
import {ReactComponent as Arrow} from '../assets/Icons/arrow.svg';

function Home() {

  const { t } = useTranslation();

  return (
    <div className='h-screen'>
      <BgLeftGradient/>

      <div className='z-[101] w-full fixed top-2 left-2/4 translate-x-[-50%]'>
        <Title></Title>
      </div>

      <div className='z-[101] fixed bottom-4 left-2/4 translate-x-[-50%]'>
        <SessionStart></SessionStart>
        <p className='text-center z-[100] font-body font-bold text-sm mt-2 text-ciano-dark'> {t('home.scroll1')} </p>
      </div>

      <div className='relative top-[9%] lg:top-0 z-[100] w-screen h-5/6 lg:h-full overflow-y-scroll overflow-x-hidden'>
        
        <div className=' w-screen h-screen p-8 center flex-col text-center'>
          <p className='font-titolo font-bold text-2xl text-ciano-dark'> {t('home.main1')} </p>
          <p className='font-titolo font-bold text-2xl text-ciano-dark mb-8'> {t('home.main2')} </p>
          <Arrow onClick={() => document.getElementById('second-section').scrollIntoView({ behavior: 'smooth' })} />
        </div>
        
        <div id='second-section' className='mb-[100px] lg:mb-0 center flex-col lg:flex-row w-screen h-[130vh] lg:h-screen justify-between lg:p-16'>

          {/* card task */}
          <div  className='card-mirror-ciano'> 
            <div className='h-1/2 w-full center m-8'>
              <ModalIcon1/>
            </div>
            <h1 className='font-titolo font-bold text-3xl text-ciano-dark'> {t('home.card1.title')} </h1>
            <span className='font-body text-sm text-ciano'> {t('home.card1.body')} </span>
          </div>

          {/* card tempo */}
          <div  className='card-mirror-verde'> 
            <div className='h-1/2 w-full center m-8'>
              <ModalIcon2/>
            </div>
            <h1 className='font-titolo font-bold text-3xl text-verde-dark'> {t('home.card2.title')} </h1>
            <span className='font-body text-sm text-verde'> {t('home.card2.body')} </span>
          </div>

          {/* card modalità */}
          <div  className='card-mirror-rosa'> 
            <div className='h-1/2 w-full center m-8'>
              <ModalIcon3/>
            </div>
            <h1 className='font-titolo font-bold text-3xl text-rosa-dark'> {t('home.card3.title')} </h1>
            <span className='font-body text-sm text-rosa'> {t('home.card3.body')} </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;
