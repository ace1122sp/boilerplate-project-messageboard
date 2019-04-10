import React from 'react';

import Loading from '../components/helper/Loading';
import Notification from '../components/helper/Notification';

export const showOnlyLoadingIf = loading => loading && <Loading/>;
export const showOnlyNotificationIf = notification => notification && <Notification notification={notification} />;


