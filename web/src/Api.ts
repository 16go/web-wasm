

enum TransportProtocol {
  Https = "https",
  SecureWebsocket = "wss",
  InsecureWebsocket = "ws"
}

interface ApiInfoInterface {
  name: string
  majorVer: number
  minorVer: number
}

interface ApiInterface {
  NewChaNel(): void
}

interface ApiFactoryInterface {
  getInfo(): ApiInfoInterface
  newInstance(...args: any): ApiInterface
}

class ApiFactory {
  private info: ApiInfoInterface

  getInfo = (): ApiInfoInterface => {
    return this.info
  }

  constructor(info: ApiInfoInterface) {
    this.info = info;
  }
}
