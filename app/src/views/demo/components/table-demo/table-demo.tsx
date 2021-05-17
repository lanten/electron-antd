import React from 'react'
import { Table, Card, Button } from 'antd'
import { ColumnType } from 'antd/es/table'

import { useRequest } from '@/src/hooks'

import './table-demo.less'

const LIST_COLUMNS: ColumnType<Awaited<ReturnType<typeof $api.queryList>>[number]>[] = [
  { dataIndex: 'col1', title: 'col-1' },
  { dataIndex: 'col2', title: 'col-2' },
  { dataIndex: 'col3', title: 'col-3' },
]

export const TableDemo = React.memo(() => {
  const { loading, data: listData, reRequest, error } = useRequest('queryList', false, { type: 'init' })

  return (
    <Card title="Table" className="mb-16">
      <Button type="primary" onClick={() => reRequest({ type: 'onClick' })}>
        Request Data
      </Button>
      {!error ? (
        <Table
          rowKey="id"
          dataSource={listData}
          columns={LIST_COLUMNS}
          loading={loading}
          pagination={{
            position: ['topRight', 'bottomRight'],
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: () => reRequest({ type: 'onChange' }),
          }}
        />
      ) : (
        <div>
          error: [{error.path}] {error.resData.message}
        </div>
      )}
    </Card>
  )
})
