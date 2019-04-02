import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { get, remove } from '../../libs/apiHandler';
import { threadURL } from '../../libs/urlHandler';

import BoardContext from '../contexts/BoardContext';
import ThreadCard from '../helper/ThreadCard';
import EmptyBoard from '../helper/EmptyBoard';
import AddThreadPanel from '../helper/AddThreadPanel';
import PasswordPanel from '../helper/PasswordPanel';

const Board = () => {
  const board = useContext(BoardContext);
  const [threads, setThreads] = useState([]);
  const [addThreadPanelOpened, toggleAddThreadPanel] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState(null);
  const [loading, setLoadingStatus] = useState(true);

  const showThreadCards = threads.map(thread => <ThreadCard key={thread._id} thread={thread} apiUrl={threadURL(board)} setThreadToDelete={setThreadToDelete} />);
  
  useEffect(() => {
    setInitThreads(threadURL(board));
  }, []);

  const setInitThreads = url => {
    get(url)
      .then(res => {
        setThreads([...res.threads]);
        setLoadingStatus('false');
      })
      .catch(err => {
        console.log(err) // temp solution
      });
  };

  const openAddThreadPanel = () => {
    toggleAddThreadPanel(true);
  };

  const closeAddThreadPanel = () => {
    toggleAddThreadPanel(false);
  };

  const addToThreads = thread => {
    setThreads(() => [...threads, thread]);
  };

  const removeFromThreads = thread => {
    setThreads(() => threads.filter(t => t._id !== thread));
  };

  const closePasswordPanel = () => {
    setThreadToDelete(null);
  };

  const handleThreadDelete = password => {
    const data = { thread_id: threadToDelete, delete_password: password };
    closePasswordPanel(null);
    remove(threadURL(board), data)
      .then(res => {
        if (res === 'success') {
          console.log('thread deleted');
          removeFromThreads(data.thread_id);
        } else {
          console.log(res);
        }        
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  };

  return (
    <main>
      {addThreadPanelOpened && <AddThreadPanel close={closeAddThreadPanel} addToThreads={addToThreads} />}
      {threadToDelete && <PasswordPanel message='Enter Thread Password' handler={handleThreadDelete} close={closePasswordPanel} />}
      <div>
        <button onClick={openAddThreadPanel}><FontAwesomeIcon size='1x' icon='plus' />add thread</button>
      </div>
      <section>
        {threads.length === 0 && <EmptyBoard />}
        <ul>
          {showThreadCards}
        </ul>
      </section>
    </main>
  );
}
  
export default Board;