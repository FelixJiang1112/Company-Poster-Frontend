# GitHub 上传完整流程指南

## 准备工作

### 1. 确保已安装必要工具
- Git: [下载地址](https://git-scm.com/downloads)
- Node.js: [下载地址](https://nodejs.org/)
- GitHub 账户: [注册地址](https://github.com/)

### 2. 验证环境
```bash
# 检查 Git 版本
git --version

# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version
```

## 步骤一：GitHub 上创建仓库

1. 登录 GitHub 账户
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `company-poster` (或您喜欢的名称)
   - Description: `房地产投资展示平台 - React应用`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"
   - **不要**添加 .gitignore 或 license（我们已经有了）
4. 点击 "Create repository"

## 步骤二：本地 Git 配置

### 1. 配置 Git 用户信息（如果尚未配置）
```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱@example.com"
```

### 2. 在项目目录中初始化 Git（如果还没有）
```bash
# 确保在项目根目录
cd "d:\Australia\unsw\finance proj\company poster"

# 初始化 Git 仓库（如果还没有）
git init

# 检查当前状态
git status
```

## 步骤三：准备和提交代码

### 1. 添加远程仓库
```bash
# 添加远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/你的用户名/company-poster.git

# 验证远程仓库
git remote -v
```

### 2. 添加文件到暂存区
```bash
# 添加所有文件
git add .

# 或者逐个添加重要文件
git add package.json
git add package-lock.json
git add src/
git add public/
git add README.md
git add .gitignore
```

### 3. 提交代码
```bash
# 创建第一次提交
git commit -m "初始提交: 房地产投资展示平台"

# 查看提交历史
git log --oneline
```

## 步骤四：推送到 GitHub

### 1. 推送到远程仓库
```bash
# 推送到 main 分支
git push -u origin main

# 如果遇到错误，可能需要先 pull
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 2. 处理可能的问题

#### 问题1：分支名称不匹配
```bash
# 如果默认分支是 master，重命名为 main
git branch -M main
git push -u origin main
```

#### 问题2：认证问题
- 使用 GitHub Personal Access Token
- 或者配置 SSH 密钥

#### 问题3：文件过大
```bash
# 检查大文件
git ls-files --others --ignored --exclude-standard

# 如果有大文件，添加到 .gitignore
echo "大文件名" >> .gitignore
git add .gitignore
git commit -m "添加大文件到 .gitignore"
```

## 步骤五：验证上传结果

1. 访问您的 GitHub 仓库页面
2. 确认所有文件都已正确上传
3. 检查 README.md 是否正确显示
4. 验证代码结构是否完整

## 步骤六：后续维护

### 1. 日常更新流程
```bash
# 检查状态
git status

# 添加更改
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送更改
git push
```

### 2. 创建分支（推荐）
```bash
# 创建新功能分支
git checkout -b feature/新功能名称

# 开发完成后合并
git checkout main
git merge feature/新功能名称
git push
```

### 3. 查看历史和状态
```bash
# 查看提交历史
git log --oneline

# 查看文件变更
git diff

# 查看分支
git branch -a
```

## 步骤七：可选 - 设置 GitHub Pages

如果您想让项目在线访问：

1. 进入 GitHub 仓库设置页面
2. 滚动到 "Pages" 部分
3. 选择 "Source" 为 "GitHub Actions"
4. 或者使用我们在 README.md 中提到的 gh-pages 方法

## 常见问题解决

### 1. 推送被拒绝
```bash
git pull origin main
git push origin main
```

### 2. 合并冲突
```bash
# 手动解决冲突后
git add .
git commit -m "解决合并冲突"
git push
```

### 3. 撤销最后一次提交
```bash
# 撤销但保留更改
git reset --soft HEAD~1

# 完全撤销
git reset --hard HEAD~1
```

### 4. 忽略已跟踪的文件
```bash
# 停止跟踪但保留文件
git rm --cached 文件名

# 添加到 .gitignore
echo "文件名" >> .gitignore
git add .gitignore
git commit -m "忽略敏感文件"
```

## 安全建议

1. **永远不要上传**：
   - 密码、API密钥
   - 个人信息
   - 大型二进制文件

2. **使用 .gitignore**：
   - 确保敏感文件被忽略
   - 定期检查文件内容

3. **分支保护**：
   - 在 GitHub 设置中启用分支保护
   - 要求代码审查

## 完成检查清单

- [ ] GitHub 仓库创建成功
- [ ] 本地 Git 配置正确
- [ ] 代码成功推送到远程仓库
- [ ] README.md 正确显示
- [ ] .gitignore 文件生效
- [ ] 项目可以正常访问和克隆

---

🎉 恭喜！您的项目已经成功上传到 GitHub！

如果遇到任何问题，请参考 [GitHub 官方文档](https://docs.github.com/) 或寻求帮助。 