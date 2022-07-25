import MemoList from './modules/MemoList.jsx';
import Editor from './modules/Editor.jsx';

import './App.styl';

const App = () => {
  return (
    <div id='MemoApp'>
      <div className='SideNav'>
        <h1>Memo App 📝</h1>
        <div className='SideNav__inner'>
          <MemoList></MemoList>
        </div>
      </div>
      <Editor />

    </div>
  );
};

export default App;
