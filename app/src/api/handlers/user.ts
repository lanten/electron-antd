/**
 * 获取用户权限 (示例)
 * @param params
 * @param options
 */
export function getUserPermissions(
  params?: getUserPermissionsUsingGET.Params,
  options?: RequestOptions
): Promise<getUserPermissionsUsingGET.Response> {
  return $api.request('/demo/demo-test', params, options)
}
