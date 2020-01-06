declare namespace $api {
  const a: string
}

declare namespace NodeJS {
  interface Global {
    __$api: typeof $api
  }
}
