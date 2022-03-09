declare namespace queryTestInfoUsingGET {
  interface Params {}

  interface Response {
    code: number
    message: string
    data: {
      info: string
    }
  }
}
