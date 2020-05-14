### dsbyd-internal-mall

### 安装依赖

```
npm install
```

### 启动项目

```
npm run serve
```

### 打包项目

```
npm run build
```

### 2. 项目结构

#### 网络服务

 src/api/network.services

 接口请求错误统一处理

 **业务请求错误各自模块处理**

### 组件

全局组件放在globals中,自动注册
命名规则 _base-组件名

### mixins

可将vuex引用放里面，组件中直接插入

### 路由

按模块建文件夹
index.js会获取注册所有路由配置

### store

vuex 配置相关，按模块划分

