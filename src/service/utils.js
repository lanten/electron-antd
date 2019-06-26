import { message } from 'antd';
const { ipcRenderer } = require('electron')

export async function getIpcOnceRequest(endpoint, data) {
    getAsyncRequest(endpoint, data)
    return checkResponse(await getAsyncOnceData(endpoint + '-reply'))
}

export function getSyncRequest(endpoint, data) {
    return checkResponse(ipcRenderer.sendSync(endpoint, data))
}

export function getAsyncRequest(endpoint, data) {
    ipcRenderer.send(endpoint, data)
}

export async function getAsyncOnceData(endpoint) {
    return new Promise((resolve, reject) => {
        ipcRenderer.once(endpoint, (event, arg) => {
            resolve(arg)
        })
    })
}
export function checkResponse(response) {
    console.log(response)
    if (response.code != '20000') {
        message.error('service error, please restart~')
    }
    return response
}