## 实现原理

### 服务端

服务端使用 Node.js 的 http 模块创建服务器，主要实现了两个路由：

- `/`: 返回静态 HTML 页面
- `/data`: 模拟数据流式传输
  - 每秒发送 6 个字符
  - 总共发送 3 轮数据
  - 使用 `res.write()` 分块发送数据

### 客户端

提供了两种数据获取方式：

1. 普通 Fetch
   - 等待所有数据接收完成后一次性显示
   - 可以通过控制台查看完整请求时间

2. 流式 Fetch
   - 使用 `ReadableStream` 读取数据流
   - 实时显示接收到的数据
   - 提供更好的用户体验

## 使用方法

1. 启动服务器：
```bash
node index.js
```

2. 在浏览器中访问 `http://localhost:3001`

3. 点击按钮测试两种不同的数据获取方式：
   - "Fetch Data": 普通获取
   - "Stream Fetch": 流式获取

## 技术要点

- 使用 `response.body.getReader()` 获取数据流
- 使用 `TextDecoder` 解码接收到的数据
- 服务端使用 `setInterval` 模拟数据流的分块发送
