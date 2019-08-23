import { getSyncRequest, getAsyncRequest, getIpcOnceRequest } from './utils';
import { SyncPing, AsyncPing, AsyncOncePing } from '../../endpoints';

export const getSyncPing = (message = 'ping') => {
    getSyncRequest(SyncPing, message)
}

export const getAsyncPing = (message = 'async ping') => {
    getAsyncRequest(AsyncPing, message)
}

export const getAsyncOncePing = (message = 'async once ping') => {
    getIpcOnceRequest(AsyncOncePing, message)
}