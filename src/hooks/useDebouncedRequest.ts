import fetch, { RequestInfo, RequestInit } from "node-fetch";
import AbortControler from "abort-controller";

export default () => {
  let controller: AbortControler | null = null;
  return (url: RequestInfo, init?: RequestInit) => {
    if (controller) {
      controller.abort();
    }
    controller = new AbortControler();
    const config = init ? { ...init, signal: controller.signal } : { signal: controller.signal };
    return fetch(url, config);
  };
};
