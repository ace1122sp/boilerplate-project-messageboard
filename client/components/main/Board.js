import React, { useState, useContext, useEffect } from 'react';

import { get, remove } from '../../libs/apiHandler';
import { threadURL } from '../../libs/urlHandler';
import { addThreadPortal, deleteThreadPortal } from '../../libs/portalGenerators';

import BoardContext from '../contexts/BoardContext';
import ThreadCard from '../helper/ThreadCard';
import EmptyBoard from '../helper/EmptyBoard';

import M from "materialize-css";

const Board = () => {
  const board = useContext(BoardContext);
  const [threads, setThreads] = useState([]);
  const [addThreadPanelOpened, toggleAddThreadPanel] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState(null);
  const [loading, setLoadingStatus] = useState(true);

  useEffect(() => {
    setInitThreads(threadURL(board));
    const options = {};
    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems, options);
  }, []);

  const _handleGetResponse = res => {
    setThreads([...res.threads]);
    setLoadingStatus('false');
  };

  const _handleDeleteResponse = (res, data) => {
    if (res === 'success') removeFromThreads(data.thread_id);
  };

  const setInitThreads = url => {
    get(url)
      .then(res => {
        _handleGetResponse(res);
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
    return remove(threadURL(board), data)
      .then(res => {
        _handleDeleteResponse(res, data);
        return res;
      })
      .catch(err => {
        console.error(err); // temp solution for development
      });
  };

  const showThreadCards = threads.map(thread => <ThreadCard key={thread._id} thread={thread} apiUrl={threadURL(board)} setThreadToDelete={setThreadToDelete} />);

  return (
    <main className='container main'>
      {addThreadPanelOpened && addThreadPortal(addToThreads, closeAddThreadPanel)}
      {threadToDelete && deleteThreadPortal('Enter Thread Password', handleThreadDelete, closePasswordPanel)}
      <div className='fixed-action-btn'>
        <button className='btn-floating btn-large pulse waves-effect waves-circle waves-white' onClick={openAddThreadPanel}><i className='material-icons'>add</i></button>
      </div>
      <section>
        {!threads.length && <EmptyBoard />}
        <ul className='collapsible'>
          {showThreadCards}
        </ul>
      </section>
    </main>
  );
}
  
export default Board;