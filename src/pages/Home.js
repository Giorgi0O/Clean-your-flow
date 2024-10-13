import '../App.scss';
import BgLeftGradient from '../components/AnimatedBackground/BgLeftGradient';
import Title from '../components/Title/Title';
import SessionStart from '../components/Buttons/SessionStart'
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import ModeExplain from '../components/Modal/ModExplain';

//svg
import {ReactComponent as ModalIcon1} from '../assets/Icons/task_modal_icon.svg';
import {ReactComponent as ModalIcon2} from '../assets/Icons/time_selector.svg';
import {ReactComponent as ModalIcon3} from '../assets/Icons/mode_selector.svg';
import {ReactComponent as Arrow} from '../assets/Icons/arrow.svg';


function Home() {

  const { t } = useTranslation();

  return (
    <div className='h-screen'>
      <BgLeftGradient/>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-screen">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <ModeExplain/> 
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div className='z-[101] w-full fixed top-2 left-2/4 translate-x-[-50%]'>
        <Title></Title>
      </div>

      <div className='z-[101] fixed bottom-4 left-2/4 translate-x-[-50%]'>
        <SessionStart></SessionStart>
        <p className='text-center z-[100] font-body font-bold text-sm mt-2 text-ciano-dark'> {t('home.scroll1')} </p>
      </div>

      <div className='relative top-[9%] lg:top-0 z-[100] w-screen h-5/6 lg:h-full overflow-y-scroll overflow-x-hidden'>
        
        <div className=' w-screen h-screen p-8 center flex-col text-center'>
          <p className='font-titolo font-bold text-2xl text-ciano-dark'> 
            <Trans i18nKey="home.main1" >
              Questo non è altro che un <span className='underline-wave decoration-verde'> semplicissimo </span> timer.
            </Trans>
          </p>
          <p className='mt-2 font-titolo font-bold text-2xl text-ciano-dark mb-8'> 
            <Trans i18nKey="home.main2" >
              Sii tu a farne uno strumento di <span className='underline-wave decoration-rosa'> produttività </span>
            </Trans>  
          </p>
          <Arrow onClick={() => document.getElementById('second-section').scrollIntoView({ behavior: 'smooth' })} />
        </div>
        
        <div id='second-section' className='mb-[100px] lg:mb-0 center flex-col lg:flex-row w-screen h-[130vh] lg:h-screen justify-between lg:p-16'>

          {/* card task */}
          <div  className='card-mirror-ciano'> 
            <div className='h-1/2 w-full center m-8'>
              <ModalIcon1/>
            </div>
            <h1 className='font-titolo font-bold text-3xl text-ciano-dark'>
              <Trans i18nKey="home.card1.title" >
                Concentrati sulla creazione dei <span className='underline-wave decoration-ciano'>task</span>
              </Trans>
            </h1>
            <span className='mt-2 font-body text-sm text-ciano'> {t('home.card1.body')} </span>
          </div>

          {/* card tempo */}
          <div  className='card-mirror-verde'> 
            <div className='h-1/2 w-full center m-8'>
              <ModalIcon2/>
            </div>
            <h1 className='font-titolo font-bold text-3xl text-verde-dark'>
              <Trans i18nKey="home.card2.title" >
                Imposta un limite di <span className='underline-wave decoration-verde'>tempo</span>
              </Trans>
            </h1>
            <span className='mt-2 font-body text-sm text-verde'> {t('home.card2.body')} </span>
          </div>

          {/* card modalità */}
          <div  className='card-mirror-rosa'> 
            <div className='h-1/2 w-full center m-8'>
              <ModalIcon3/>
            </div>
            <h1 className='font-titolo font-bold text-3xl text-rosa-dark'>
              <Trans i18nKey="home.card3.title" >
                Scegli la <span className='underline-wave decoration-rosa'>modalità</span>che fa per te
              </Trans>
            </h1>
            <span className='mt-2 font-body text-sm text-rosa'> 
              <Trans i18nKey="home.card3.body" >
                Potrai scegliere tra la tecnica del pomodoro e quella flowmodoro. Se non conosci la differenza <button onClick={()=>document.getElementById('my_modal_3').showModal()} className='font-bold text-rosa hover:underline'>clicca quì</button>.
              </Trans>
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;
