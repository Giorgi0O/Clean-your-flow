import AnimatedBg from '../components/shared/AnimatedBg';
import Header from '../components/shared/Header';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import MExplanation from '../components/shared/MExplanation';
import Modal from '../components/shared/Modal'
import BSlider from '../components/home/BSlider';
import {ReactComponent as ModalIcon1} from '../assets/Icons/task_modal_icon.svg';
import {ReactComponent as ModalIcon2} from '../assets/Icons/time_selector.svg';
import {ReactComponent as ModalIcon3} from '../assets/Icons/mode_selector.svg';
import {ReactComponent as Arrow} from '../assets/Icons/arrow.svg';

function Home() {

  const { t } = useTranslation();

  return (
    <div className='h-screen'>
      <AnimatedBg/>

      <Modal id="mode-explain" onClose={() => document.getElementById('mode-explain').close()}>
        <MExplanation/> 
      </Modal>

      <div className='z-[101] w-full fixed top-2 left-2/4 translate-x-[-50%]'>
        <Header/>
      </div>

      <div className='z-[101] fixed bottom-4 left-2/4 translate-x-[-50%]'>
        <BSlider/>
        <p className='text-center z-[100] font-body font-bold text-sm mt-2 text-ciano-dark'> 
          {t('home.scroll1')} 
        </p>
      </div>

      <div className='relative top-[9%] lg:top-0 z-[100] w-screen h-5/6 lg:h-full overflow-y-scroll overflow-x-hidden'>
        
        <div className=' w-screen h-screen p-8 center flex-col text-center'>
          <p className='font-titolo font-bold text-2xl text-ciano-dark'> 
            <Trans i18nKey="home.main1" >
              * <span className='underline-wave decoration-verde'> * </span> *
            </Trans>
          </p>
          <p className='mt-2 font-titolo font-bold text-2xl text-ciano-dark mb-8'> 
            <Trans i18nKey="home.main2" >
              * <span className='underline-wave decoration-rosa'> * </span>
            </Trans>  
          </p>
          <Arrow onClick={() => document.getElementById('second-section').scrollIntoView({ behavior: 'smooth' })} />
        </div>
        
        <div id='second-section' className='mb-[100px] lg:mb-0 center flex-col lg:flex-row w-screen h-[130vh] lg:h-screen justify-between lg:p-16'>
          <Card iconNumber={1} titleId={'home.card1.title'} bodyId={'home.card1.body'} />
          <Card iconNumber={2} titleId={'home.card2.title'} bodyId={'home.card2.body'} />
          <Card iconNumber={3} titleId={'home.card3.title'} bodyId={'home.card3.body'} />
        </div>
        
      </div>
    </div>
  );
}


const Card = ({ iconNumber, titleId, bodyId }) => {

  const getColor = () =>{
    return iconNumber === 1 ? 'ciano' : iconNumber === 2 ? 'verde' : 'rosa';
  }

  return (
    <div className={`card-mirror-${getColor()}`}> 
      <div className='h-1/2 w-full center m-8'>
        {iconNumber === 1 ? <ModalIcon1 /> : iconNumber === 2 ? <ModalIcon2/> : <ModalIcon3 />}
      </div>
      <h1 className={`font-titolo font-bold text-3xl text-${getColor()}-dark`}>
        <Trans i18nKey={titleId} >
          * <span className={`underline-wave decoration-${getColor()}`}>*</span> *
        </Trans>
      </h1>
      <span className={`mt-2 font-body text-sm text-${getColor()}`}> 
        {
          iconNumber === 3 ?
          <Trans i18nKey={bodyId}>
            *  <button onClick={()=>document.getElementById('mode-explain').showModal()} className='font-bold text-rosa hover:underline'>*</button>.
          </Trans>
          :
          <Trans i18nKey={bodyId}> 
          </Trans>
        }
      </span>
    </div>
  );
}



export default Home;