# 房地产投资展示平台

一个基于React的房地产投资信息展示平台，用于展示物业投资数据、收益分析和市场信息。

## 功能特点

- 📊 物业投资数据展示
- 💰 年化收益率计算
- 🏠 房产信息可视化
- 📈 投资回报分析
- 🎨 现代化响应式界面

## 技术栈

- **前端框架**: React 19.1.0
- **样式**: CSS3 + 自定义样式
- **构建工具**: Create React App
- **测试**: Jest + React Testing Library

## 项目结构

```
src/
├── components/          # 组件目录
├── assets/             # 静态资源
│   └── images/         # 图片文件
├── HomePage.js         # 主页组件
├── App.js              # 应用主文件
├── propertyData.json   # 物业数据
└── styles/             # 样式文件
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装

```bash
# 克隆项目
git clone [your-repo-url]

# 进入项目目录
cd company-poster

# 安装依赖
npm install
```

### 运行

```bash
# 开发模式
npm start

# 构建生产版本
npm run build

# 运行测试
npm test
```

## 使用说明

1. **开发模式**: 运行 `npm start` 启动开发服务器，访问 http://localhost:3000
2. **生产构建**: 运行 `npm run build` 生成优化的生产版本
3. **数据配置**: 修改 `src/propertyData.json` 来更新物业数据

## 配置

项目使用JSON文件存储物业数据，可以通过修改 `src/propertyData.json` 来更新显示内容：

```json
{
  "property": {
    "name": "物业名称",
    "location": "地址信息"
  },
  "loan": {
    "amount": "贷款金额",
    "rate": "利率"
  },
  "investment": {
    "yield": "年化收益率"
  }
}
```

## 部署

### GitHub Pages 部署

1. 安装 gh-pages 包：
```bash
npm install --save-dev gh-pages
```

2. 在 package.json 中添加 homepage 字段：
```json
{
  "homepage": "https://[username].github.io/[repository-name]"
}
```

3. 添加部署脚本：
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. 运行部署：
```bash
npm run deploy
```

## 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，请通过以下方式联系：

- 邮箱: [your-email@example.com]
- GitHub Issues: [项目Issues页面]

---

⭐ 如果这个项目对你有帮助，请给个 star！
