## Redux Actions

* 请按照领域拆分文件而非页面

## 示例

```ts
export const initState = {
  count: 1,
}

export function ACTION_ADD_COUNT(
  state: StoreStates,
  action: StoreAction<'ACTION_ADD_COUNT'>
): { count: number } {
  console.log({ state, action })
  return { count: state.count + 1 }
}

```