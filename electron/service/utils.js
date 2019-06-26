const { ipcMain } = require('electron')


const syncReplyService = (endpoint, func, ...args) => {
    return ipcMain.on(endpoint, (event, arg) => {
        successResponse(event, func(arg, ...args))
    })
}

const asyncReplyService = (endpoint, func, ...args) => {
    return ipcMain.on(endpoint, (event, arg) => {
        successAsyncResponse(event, endpoint + '-reply', func(arg, ...args))
    })
}

const asyncOnceReplyService = (endpoint, func, ...args) => {
    return ipcMain.on(endpoint, async (event, arg) => {
        let data = await func(arg, ...args)
        successAsyncResponse(event, endpoint + '-reply', data)
    })
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const successResponse = (event, data) => {
    event.returnValue = {
        code: '20000',
        data: data
    }
}

const successAsyncResponse = (event, endpoint, data) => {
    let value = {
        code: '20000',
        data: data
    }
    event.sender.send(endpoint, value)
}

module.exports = {
    asyncOnceReplyService, syncReplyService, asyncReplyService, sleep
}
