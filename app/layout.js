import './globals.css'

export const metadata = {
  title: 'AI 论文日报',
  description: '每天精选最新 AI 论文，中文解读',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
