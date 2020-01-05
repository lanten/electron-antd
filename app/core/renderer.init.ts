import { remote } from 'electron'
import { SystemLogger } from '@/core/tools/system-logger'

// @ts-ignore
$tools = remote.getGlobal('__$tools')

// @ts-ignore
$logger = new SystemLogger('renderer')

// @ts-ignore
$api = remote.getGlobal('__$api')
