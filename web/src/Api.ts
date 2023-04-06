
// Specify types of the objects that can be transferred by postMessage
type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array
  | Float32Array | Float64Array;

/* @ts-ignore */
type TransferableObjects = ArrayBuffer | MessagePort | ReadableStream | WritableStream | TransformStream | AudioData
  | ImageBitmap | VideoFrame | OffscreenCanvas | RTCDataChannel;

type TransferablePrimitive = string | null;
type Transferable = TransferableObjects & TransferablePrimitive;

interface RpcMessageInterface {
  getPayload(): RpcMessagePayload
}

type RpcMessagePayload = {
  [prop: string]: Transferable
}

type MethodName = string
type MethodBody = (...args: any) => any
type MethodSet = {
  [name: MethodName]: MethodBody
}
type MethodRecord = Record<MethodName, MethodBody>

interface SerializableInterface {
  toString(): string
}

interface ApiInfoInterface {
  name: string
  majorVer: number
  minorVer: number
}

interface ChannelOptionsInterface {

}

interface ChannelInterface {

}

class Channel implements ChannelInterface {

}

interface ApiInterface {
  newChannel(options?: ChannelOptionsInterface): ChannelInterface
  getMethods(): MethodSet
}

class Api implements ApiInterface {
  newChannel(options?: ChannelOptionsInterface): ChannelInterface {
    return {}
  }

  getMethods(): MethodSet {
    return {}
  }
}

interface ApiFactoryInterface extends SerializableInterface {
  getInfo(): ApiInfoInterface
  newInstance(...args: any): ApiInterface
}

export class ApiFactory {
  private info: ApiInfoInterface

  getInfo = (): ApiInfoInterface => {
    return this.info
  }

  constructor(info: ApiInfoInterface) {
    this.info = info;
  }
}
