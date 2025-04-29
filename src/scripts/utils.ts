interface ArgumentsConfig {
  [k: string]: string | number | boolean;
  port: number;
}

// 判断是否为十进制整数数字
const isDecimalInt = (numberString: string) => /^(?!0)\d+$/.test(numberString)

/**
 * 以 -- 分隔封装命令行参数，返回对象
 *
 * input:
 *  pnpm dev --port 8088
 *
 * output:
 *  {
 *      port: 8088
 *  }
 *
 * @param defaultConf
 * @returns
 */
export const parseArgs = (defaultConfig: ArgumentsConfig) => {
  const config: ArgumentsConfig = { ...defaultConfig }
  const startIndex = process.argv.indexOf('--')
  if (startIndex === -1) {
    return config
  }
  const arguments_ = process.argv.slice(startIndex + 1)
  for (let index = 0; index < arguments_.length; ++index) {
    const argument = arguments_[index]
    const next = arguments_[index + 1]
    if (argument.indexOf('--') === 0) {
      if (next == undefined || next.indexOf('--') === 0) {
        config[argument.slice(2)] = true
      } else if (next === 'true' || next === 'false' || isDecimalInt(next)) {
        config[argument.slice(2)] = JSON.parse(next)
        index += 1
      } else {
        config[argument.slice(2)] = next
        index += 1
      }
    }
  }
  return config
}

/**
 * 获取配置信息
 * @returns
 */
export const getInfo = () => {
  const environment = import.meta.env

  return { env: environment }
}
