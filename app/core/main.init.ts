import * as config from '../app.config'
import * as tools from './tools'

// @ts-ignore
$tools = { ...tools, config }

// @ts-ignore
$logger = new $tools.SystemLogger('main')

// @ts-ignore
$api = { a: 1 }
