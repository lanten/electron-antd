const { syncReplyService, asyncReplyService, asyncOnceReplyService } = require('./utils')
const { SyncPing, AsyncPing, AsyncOncePing } = require('../../endpoints')

syncReplyService(SyncPing, (event, arg) => {
    return 'pong'
})

asyncReplyService(AsyncPing, (event, arg) => {
    return 'async pong'
})

asyncOnceReplyService(AsyncOncePing, async (event, arg) => {
    return 'async once pong'
})
