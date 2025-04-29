const subscribers = new Set<chrome.runtime.Port>();

const datas = new Proxy(
  {
    value: undefined,
  },
  {
    get(target, property, receiver) {
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      for (const port of subscribers) port.postMessage(value);
      Reflect.set(target, property, value, receiver);
      return true;
    },
  }
);

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup-connect') {
    subscribers.add(port);
    port.onDisconnect.addListener(() => subscribers.delete(port));
  }
});

async function getMSGoldLatestPrice() {
  const response = await fetch('https://api.jdjygold.com/gw/generic/hj/h5/m/latestPrice');
  const data = await response.json();
  if (data.resultCode === 0) {
    datas.value = data.resultData.datas;
  }
  setTimeout(() => {
    getMSGoldLatestPrice();
  }, 1000);
}
getMSGoldLatestPrice();
