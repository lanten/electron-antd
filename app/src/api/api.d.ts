declare namespace $api {
  /**
   * 发起一个请求
   * @param service 后端接口 service
   * @param params
   * @param optionsSource
   */
  function request(path: string, params?: RequestParams, options?: RequestOptions): Promise<RequestRes>

  namespace common {}

  namespace user {
    /**
     * 获取个人权限
     * @param params
     * @param options
     */
    function getUserPermissions(
      params?: getUserPermissionsUsingGET.Params,
      options?: RequestOptions
    ): Promise<getUserPermissionsUsingGET.Response>
  }
}
