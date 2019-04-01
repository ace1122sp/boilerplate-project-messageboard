import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { get, post, remove } from '../../libs/apiHandler';
import { threadURL } from '../../libs/urlHandler';

import BoardContext from '../contexts/BoardContext';
import ThreadCard from '../helper/ThreadCard';
import EmptyBoard from '../helper/EmptyBoard';
import AddThreadPanel from '../helper/AddThreadPanel';

const Board = () => {
  const board = useContext(BoardContext);
  const [threads, setThreads] = useState([]);
  const [loading, setLoadingStatus] = useState(true);
  const [addThreadPanelOpened, toggleAddThreadPanel] = useState(false);

  const showThreadCards = threads.map(thread => <ThreadCard key={thread._id} thread={thread} apiUrl={threadURL(board)} />);
  
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

  return (
    <main>
      {addThreadPanelOpened && <AddThreadPanel close={closeAddThreadPanel} addToThreads={addToThreads} />}
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