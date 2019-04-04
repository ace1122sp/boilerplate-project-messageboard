import React from 'react';
import { createPortal } from 'react-dom';

import PasswordPanel from '../components/helper/PasswordPanel';
import AddThreadPanel from '../components/helper/AddThreadPanel';

const portal = document.getElementById('portal');

export const addThreadPortal = (addToThreads, close) => createPortal(<AddThreadPanel addToThreads={addToThreads} close={close} />, portal);

export const deleteThreadPortal = (message, handler, close) => createPortal(<PasswordPanel message={message} handler={handler} close={close} />, portal);

export const addReplyPortal = (message, handler, close) => createPortal(<PasswordPanel message={message} handler={handler} close={close} />, portal);

export const deleteReplyPortal = (message, handler, close) => createPortal(<PasswordPanel message={message} handler={handler} close={close} />, portal);