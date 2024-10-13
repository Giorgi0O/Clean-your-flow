import React, { useState, useRef, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { ReactComponent as LogoSvg } from '../../assets/Icons/logo-faggiolo.svg';


function Button( ) {

    const { t } = useTranslation();

    const localStorageState = localStorage.length === 0;
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const x = useMotionValue(6);
    const controls = useAnimation();
    const navigate = useNavigate();
    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

    useEffect(() => {
        if (containerRef.current && buttonRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const buttonWidth = buttonRef.current.offsetWidth;
          setDragConstraints({ left: 0, right: containerWidth - buttonWidth });
        }
    }, []);

  
    const background = useTransform(
        x,
        [0, dragConstraints.right],
        ["rgba(193,222,186)", "rgba(166, 236, 238, 1)"]
    );

    const opacity = useTransform(
        x,
        [0, 50],
        ["1", "0"]
    );
  
    const handleDragEnd = (event, info) => {
        const dragThreshold = dragConstraints.right - 10;
      
        if (info.offset.x > dragThreshold) {
          controls.start({ x: dragConstraints.right });
          navigate('/FlowSession');
        } else {
          controls.start({ x: 6 });
        }
    };

    return (
        <motion.div 
            ref={containerRef}
            className="flex items-center w-[350px] h-[60px] rounded-full border-2 border-verde-dark overflow-hidden"
            style={{ background }}
        >

            <motion.div 
                ref={buttonRef}
                drag="x"
                dragConstraints={dragConstraints}
                dragElastic={0}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                animate={controls}
                className="center border-2 border-rosa-dark w-[50px] h-[50px] rounded-full gradiente-bg"
                style={{ x }}
            >
                <LogoSvg></LogoSvg>
            </motion.div>

            <motion.div 
                className="w-5/6 center"
                style={{ opacity }}
            >
                <span className='font-body text-sm text-gray-400'> 
                    {t('home.scroll2')}
                </span>

            </motion.div>

        </motion.div>
    );
}


export default Button