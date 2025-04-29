const port = chrome.runtime.connect({ name: 'popup-connect' })

const container = document.createElement('div')
container.id = 'gold_price'
container.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 999999;
    background-color: rgba(255, 255, 255, .7);
    font-size: 16px;
    font-weight: bold;
    padding: 8px 12px;
    border-radius: 6px;
    color: blue;
    text-shadow: 
    -1px -1px 0 #fff,  /* 轮廓 */
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
    1px 1px 0 #fff,
    0 0 8px #fff,      /* 发光 */
    0 0 16px #fff
`
const price = document.createElement('div')
const rate = document.createElement('div')
container.append(price)
container.append(rate)
document.body.append(container)
let yesterdayPrice = 0
let prePrice = 0
port.onMessage.addListener((data) => {
  yesterdayPrice = Number.parseFloat(data.yesterdayPrice)
  price.textContent = data.price
  rate.textContent = data.upAndDownRate
  if (yesterdayPrice > Number.parseFloat(data.price)) {
    price.style.color = 'green'
  } else if (yesterdayPrice < Number.parseFloat(data.price)) {
    price.style.color = 'red'
  } else {
    price.style.color = 'blue'
  }
  if (prePrice > Number.parseFloat(data.price)) {
    container.style.animation = ''
    container.style.animation = 'green 1s'
    container.style.backgroundColor = 'rgba(0, 255, 0, 0.1)'
  } else if (prePrice < Number.parseFloat(data.price)) {
    container.style.animation = ''
    container.style.animation = 'red 1s'
    container.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'
  } else {
    container.style.animation = ''
  }
  prePrice = Number.parseFloat(data.price)
})
