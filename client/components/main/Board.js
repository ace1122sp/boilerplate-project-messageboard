import React, { useState, useContext, useEffect } from 'react';

import { get, remove } from '../../libs/apiHandler';
import { threadURL } from '../../libs/urlHandler';
import { addThreadPortal, deleteThreadPortal } from '../../libs/portalGenerators';
import { generalErrorHandler } from '../../libs/errorHandlers';

import BoardContext from '../contexts/BoardContext';
import ThreadCard from '../helper/ThreadCard';
import EmptyBoard from '../helper/EmptyBoard';
import Loading from '../helper/Loading';

import M from "materialize-css";

const Board = () => {
  const board = useContext(BoardContext);
  const [threads, setThreads] = useState([]);
  const [addThreadPanelOpened, toggleAddThreadPanel] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState(null);
  const [loading, setLoadingStatus] = useState(true);

  useEffect(() => {
    setInitThreads(threadURL(board));    
  }, []);

  useEffect(() => {
    const options = {};
    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems, options);
  });  

  const _handleInitGetResponse = res => {    
    setThreads([...sortThreads(res.threads)]);
    setLoadingStatus(false);
  };

  const _handleDeleteResponse = (res, data) => {
    if (res === 'success') removeFromThreads(data.thread_id);
  };

  const setInitThreads = url => {
    get(url)
      .then(res => {
        _handleInitGetResponse(res);        
      })
      .catch(err => {
        generalErrorHandler();
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

  const mergeThreads = (oldThreads, newThreads) => {
    let merged = [...oldThreads, ...newThreads];
    const s = new Set(merged);
    merged = [];

    s.forEach(thread => {
      merged.push(thread);
    });

    return merged;
  };

  const sortThreads = threads => {
    const sorted = threads.sort((a, b) => {
      const dateA = new Date(a.bumped_on);
      const dateB = new Date(b.bumped_on);

      return dateB.getTime() - dateA.getTime();
    });

    return sorted;
  }

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
        generalErrorHandler;
      });
  };

  const getMoreThreads = () => {
    const offset = threads.length;

    get(`${threadURL(board)}?offset=${offset}`)
      .then(res => {
        const merged = mergeThreads(threads, res.threads);
        const sorted = sortThreads(merged);
        setThreads(sorted);
      })
      .catch(err => {
        generalErrorHandler();
      });
  }

  const showThreadCards = threads.map(thread => <ThreadCard key={thread._id} thread={thread} apiUrl={threadURL(board)} setThreadToDelete={setThreadToDelete} />);

  return (
    <main className='container main main-padding'>
      {addThreadPanelOpened && addThreadPortal(addToThreads, closeAddThreadPanel)}
      {threadToDelete && deleteThreadPortal('Enter Thread Password', handleThreadDelete, closePasswordPanel)}
      {(loading && <Loading />) || 
      <div>
        <div className='fixed-action-btn'>
          <button className='btn-floating btn-large pulse waves-effect waves-circle waves-white' onClick={openAddThreadPanel}><i className='material-icons'>add</i></button>
        </div>
      <section>
        {!threads.length && <EmptyBoard />}
        <ul className='collapsible'>
          {showThreadCards}
        </ul>
        <div className='row center-align'>
          <button className='btn btn-raised' onClick={getMoreThreads}>load more threads</button>
        </div>
      </section>      
      </div>}
    </main>
  );
}
  
export default Board;