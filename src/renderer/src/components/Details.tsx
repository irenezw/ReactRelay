import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ModelPreview from './ModelPreview';
import MethodButtonContainer from '@renderer/containers/MethodButtonContainer';
import ComponentCode from './ComponentCode'
import { useSelector } from 'react-redux'

function Details(): JSX.Element {
  const [height, setHeight] = useState<string | number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const nodeInfo = useSelector(state => state.reactFlow.nodeInfo);
  const componentName = useSelector(state => state.reactFlow.componentName)
  const treeContainerClick = useSelector(state => state.detail.treeContainerClick)
  const activeComponentCode = useSelector(state => state.detail.activeComponentCode)

  useEffect(() => {
      window.innerHeight > 800 ? setHeight('40vh') : setHeight('30vh');
  },[nodeInfo])

  useEffect(() => {
    console.log('height', height)
      const newHeight = height > '30vh' ? '20vh' : 0;
      setHeight(newHeight)
  }, [treeContainerClick])

  const handler = (mouseDownEvent) => {
    // const startHeight = height;
    // const startPosition = mouseDownEvent.pageY;
    function onMouseMove(mouseMoveEvent) {
      console.log('mme', mouseMoveEvent.pageY)
      const newHeight = window.innerHeight - mouseMoveEvent.pageY;  //startHeight = height of div // startPosition = where the mouse is positioned // mouseMoveEvenet.pageY = detects where mouse is on the screen //pageY is property of mouse event (on y axis unit is in pixels)
      // console.log('start:', startHeight, ' position:', startPosition, 'mouse: ', mouseMoveEvent.pageY)
      setHeight(newHeight)
      console.log(height, newHeight);
    }

    function onMouseUp() {
      console.log('mouse up')
      window.document.body.removeEventListener('mousemove', onMouseMove)
      window.document.body.removeEventListener('mouseup', onMouseUp)
      console.log('removed')
    }

    window.document.body.addEventListener("mousemove", onMouseMove);
    window.document.body.addEventListener("mouseup", onMouseUp);
  }



  return (
    <>
      <div id="draggable-container" className={`relative w-full flex flex-col bg-primary pt-10 pb-3 rounded-t-lg resize-y mt-2 z-1`}  style={{height: height}} >
        <div id="drag-bar" onMouseDown = {handler} className="pointer-events-auto self-center top-1/2 right-0 -mt-7 p-2 hidden md:block cursor-ns-resize z-3"  draggable="false">
          <div className="w-9 h-2 bg-base-100 rounded-full"></div>
        </div>

        <div className='w-fit'>
          <p className='relative rounded-t-xl text-2xl bg-primary font-bold mt-[-85px] ml-[40px] pl-5 pr-2 p-2 '>
            <div id="label" className="flex w-full items-center	">
              {componentName}
              <div className="tooltip tooltip-secondary tooltip-right" data-tip="toggle component details">
                <p className={`badge cursor-pointer	 text-m rounded-full bg-secondary m-2 ml-10 w-fit px-2` } onClick={() => location.pathname === '/' ? navigate('/code') : navigate('/')}>
                  {location.pathname === '/' ? 'ROUTES' : 'CODE'}
                </p>

              </div>
            </div>
          </p>
        </div>



        <div id='detail-container' className='grid grid-cols-12 overflow-auto h-min m-3 mt-4 px-2 gap-[1rem] '>
          <Routes>
            <Route path="/" element={
              <>
                <MethodButtonContainer nodeInfo={nodeInfo}/>
                <ModelPreview />
              </>
            }/>
            <Route path="/code" element={<ComponentCode/>} />
          </Routes> 
        </div>
      </div>
    </>
  );
}

export default Details;
