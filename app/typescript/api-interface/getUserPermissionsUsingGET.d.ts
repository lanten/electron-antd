declare namespace queryTestInfoUsingGET {
  interface Params {}

  interface Response {
    code: number
    status: boolean
    data: {
      info: string
    }
  }
}
