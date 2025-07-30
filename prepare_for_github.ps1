# PowerShell 脚本：准备 GitHub 上传
# 使用方法：在PowerShell中运行 .\prepare_for_github.ps1

Write-Host "🚀 准备将项目上传到 GitHub..." -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Yellow

# 检查必要工具
Write-Host "1. 检查环境..." -ForegroundColor Cyan

# 检查 Git
if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitVersion = git --version
    Write-Host "✅ Git 已安装: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Git 未安装，请从 https://git-scm.com/downloads 下载安装" -ForegroundColor Red
    exit 1
}

# 检查 Node.js
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js 已安装: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js 未安装，请从 https://nodejs.org/ 下载安装" -ForegroundColor Red
    exit 1
}

# 检查 npm
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "✅ npm 已安装: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm 未安装" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "2. 检查项目文件..." -ForegroundColor Cyan

# 检查必要文件
$requiredFiles = @(
    "package.json",
    "src/App.js",
    "public/index.html",
    "README.md",
    ".gitignore"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file 存在" -ForegroundColor Green
    } else {
        Write-Host "❌ $file 不存在" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "3. 检查 Git 状态..." -ForegroundColor Cyan

# 检查是否已初始化 Git
if (Test-Path ".git") {
    Write-Host "✅ Git 仓库已初始化" -ForegroundColor Green
    
    # 显示 Git 状态
    Write-Host "📊 当前 Git 状态:" -ForegroundColor Yellow
    git status --short
    
    # 检查是否有远程仓库
    $remotes = git remote -v
    if ($remotes) {
        Write-Host "✅ 远程仓库已配置:" -ForegroundColor Green
        Write-Host $remotes
    } else {
        Write-Host "⚠️  尚未配置远程仓库" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Git 仓库未初始化" -ForegroundColor Yellow
    Write-Host "🔧 正在初始化 Git 仓库..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Git 仓库初始化完成" -ForegroundColor Green
}

Write-Host ""
Write-Host "4. 项目依赖检查..." -ForegroundColor Cyan

# 检查 node_modules
if (Test-Path "node_modules") {
    Write-Host "✅ 依赖已安装" -ForegroundColor Green
} else {
    Write-Host "⚠️  依赖未安装，正在安装..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ 依赖安装完成" -ForegroundColor Green
}

Write-Host ""
Write-Host "5. 测试项目构建..." -ForegroundColor Cyan

# 测试构建
Write-Host "🔧 正在测试项目构建..." -ForegroundColor Cyan
$buildResult = npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 项目构建成功" -ForegroundColor Green
    # 清理 build 目录（不需要提交）
    if (Test-Path "build") {
        Remove-Item -Recurse -Force "build"
        Write-Host "🧹 清理构建文件" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ 项目构建失败，请检查代码" -ForegroundColor Red
}

Write-Host ""
Write-Host "6. 准备提交..." -ForegroundColor Cyan

# 添加文件到暂存区
Write-Host "📝 添加文件到暂存区..." -ForegroundColor Cyan
git add .

# 显示将要提交的文件
Write-Host "📋 将要提交的文件:" -ForegroundColor Yellow
git diff --cached --name-only

Write-Host ""
Write-Host "=================================================" -ForegroundColor Yellow
Write-Host "🎉 项目准备完成！" -ForegroundColor Green
Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "1. 在 GitHub 上创建新仓库" -ForegroundColor White
Write-Host "2. 配置远程仓库地址：" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/你的用户名/仓库名.git" -ForegroundColor Gray
Write-Host "3. 提交并推送代码：" -ForegroundColor White
Write-Host "   git commit -m `"初始提交: 房地产投资展示平台`"" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 详细说明请参考 GITHUB_UPLOAD_GUIDE.md" -ForegroundColor Yellow
Write-Host ""

# 询问是否要打开 GitHub
$openGitHub = Read-Host "是否要打开 GitHub 网站创建仓库？(y/n)"
if ($openGitHub -eq "y" -or $openGitHub -eq "Y") {
    Start-Process "https://github.com/new"
}

Write-Host "脚本执行完成！" -ForegroundColor Green 