import './App.scss';
import Timer from './components/Timer/Timer';
import Title from './components/Title/Title';
import {useState} from 'react';


function App() {

  const [bgPink, setBgPink] = useState(15);
  const [bgCiano, setBgCiano] = useState(100);

  const [selectedMode, setSelectedMode] = useState('pomodoro');
  const [isActive, setIsActive] = useState(false);

  const [modalSetting, setModalSetting] = useState(false);

  return (
    <div className="app bg-moving">
      <div className='bg-moving-blur'></div>
      <div 
        className='bg-moving-pink'
        style={{width: `${bgPink}%` }}
      ></div>
      <div 
        className='bg-moving-ciano'
        style={{width: `${bgCiano}%` }}
      ></div>
      
      <Title 
        isActive={isActive}
        selectedMode={selectedMode} 
        setSelectedMode={setSelectedMode}
        modalSetting={modalSetting}
        setModalSetting={setModalSetting}
      />
      <Timer 
        isActive={isActive}
        setIsActive={setIsActive}
        bgCiano={bgCiano}
        bgPink={bgPink}
        setBgCiano={setBgCiano}
        setBgPink={setBgPink}
        modalSetting={modalSetting}
        setModalSetting={setModalSetting}
      />
    </div>  );
}

export default App;
