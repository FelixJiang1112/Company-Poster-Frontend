@echo off
chcp 65001 > nul
echo 🚀 检查项目状态...
echo =================================================

echo 1. 检查环境...
git --version > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Git 已安装
) else (
    echo ❌ Git 未安装
    pause
    exit /b 1
)

node --version > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js 已安装
) else (
    echo ❌ Node.js 未安装
    pause
    exit /b 1
)

npm --version > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ npm 已安装
) else (
    echo ❌ npm 未安装
    pause
    exit /b 1
)

echo.
echo 2. 检查项目文件...
if exist "package.json" (echo ✅ package.json 存在) else (echo ❌ package.json 不存在)
if exist "src\App.js" (echo ✅ src\App.js 存在) else (echo ❌ src\App.js 不存在)
if exist "public\index.html" (echo ✅ public\index.html 存在) else (echo ❌ public\index.html 不存在)
if exist "README.md" (echo ✅ README.md 存在) else (echo ❌ README.md 不存在)
if exist ".gitignore" (echo ✅ .gitignore 存在) else (echo ❌ .gitignore 不存在)

echo.
echo 3. 检查 Git 状态...
if exist ".git" (
    echo ✅ Git 仓库已初始化
    echo 📊 当前 Git 状态:
    git status --short
) else (
    echo ⚠️ Git 仓库未初始化
    echo 🔧 正在初始化 Git 仓库...
    git init
    echo ✅ Git 仓库初始化完成
)

echo.
echo 4. 检查项目依赖...
if exist "node_modules" (
    echo ✅ 依赖已安装
) else (
    echo ⚠️ 依赖未安装，正在安装...
    npm install
    echo ✅ 依赖安装完成
)

echo.
echo =================================================
echo 🎉 项目检查完成！
echo.
echo 下一步操作：
echo 1. 在 GitHub 上创建新仓库
echo 2. 配置远程仓库地址：
echo    git remote add origin https://github.com/你的用户名/仓库名.git
echo 3. 提交并推送代码：
echo    git add .
echo    git commit -m "初始提交: 房地产投资展示平台"
echo    git push -u origin main
echo.
echo 📖 详细说明请参考 GITHUB_UPLOAD_GUIDE.md
echo.
pause 