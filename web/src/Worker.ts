importScripts('wasm_exec.js'); // This file is provided by the Go distribution

class ApiWorker {
  moduleUri: string;

  constructor(private uri: string) {
    this.moduleUri = uri;
  }

  async initialize(): Promise<void> {
    // @ts-ignore
    const go = new Go();
    await WebAssembly.instantiateStreaming(fetch(this.moduleUri), go.importObject).then((result) => {
      go.run(result.instance);
    });
  }

  static async create(moduleUri: string): Promise<ApiWorker> {
    const worker = new ApiWorker(moduleUri);
    await worker.initialize();
    return worker;
  }
}
