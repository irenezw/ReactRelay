import 'tailwindcss/tailwind.css'
import { useState } from 'react'
import Header from './components/Header'
import Tree from './components/Tree';

function App(): JSX.Element {

    const [filePath, setFilePath] = useState(''); // may want to change this to some sort of redux, but useState is good for now i guess
    // dialog settings
    const dialogConfig = {
      title: 'Select a project',
      buttonLabel: 'Select',
      properties: ['openDirectory']
    }
    // window.api.openDialog returns the filepath when the filepath is chosen from the dialog
  const openExplorer = async (): any => {
    const {filePaths} = await window.api.openDialog('showOpenDialog', dialogConfig)
    const fileArray = filePaths[0].split('/')
    setFilePath(fileArray[fileArray.length - 1]);
    console.log(filePaths[0]);  // returns an array, so indexed at 0 to retrieve path
  }

  return (
    <div>
      <Header onClick={openExplorer} projectName={filePath}/>
      <div className="grid grid-rows-2 h-screen w-full">
        <Tree />
        <div id="details-container" className="bg-blue-500 ">
          details
        </div>
      </div>
    </div>
  )
}

export default App
