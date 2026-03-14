# AI 论文日报 📚

自动抓取并翻译 [The AI Newsletter](https://nlp.elvissaravia.com/) 的最新 AI 论文。

## 快速开始

### 1. 安装依赖

```bash
cd ai-paper-daily
npm install
```

### 2. 获取最新论文

```bash
npm run fetch
```

### 3. 本地开发

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 部署到 Vercel（免费）

1. 安装 Vercel CLI:
```bash
npm install -g vercel
```

2. 部署:
```bash
vercel
```

3. 按照提示登录并部署

## 自动化更新

在 Vercel 中设置定时任务，或本地使用 cron:

```bash
# 每周一上午 9 点更新
0 9 * * 1 cd /path/to/ai-paper-daily && npm run fetch && vercel --prod
```

## 文件结构

```
ai-paper-daily/
├── app/
│   ├── page.js        # 主页
│   ├── layout.js      # 布局
│   └── globals.css    # 样式
├── scripts/
│   └── fetch-papers.js # RSS 抓取脚本
├── data/
│   └── papers.json    # 论文数据（自动生成）
└── package.json
```

## 许可证

内容译自 The AI Newsletter，版权归原作者所有。
