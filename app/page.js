import fs from 'fs';
import path from 'path';

export default function Home() {
  const papersPath = path.join(process.cwd(), 'data', 'papers.json');
  let papers = [];
  
  try {
    const data = fs.readFileSync(papersPath, 'utf8');
    papers = JSON.parse(data);
  } catch (e) {
    console.log('No papers data yet');
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">📚 AI 论文日报</h1>
          <p className="text-gray-600 mt-2">每天精选最新 AI 论文，中文解读</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {papers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无论文数据</p>
            <p className="text-sm text-gray-400 mt-2">运行 `npm run fetch` 获取最新论文</p>
          </div>
        ) : (
          <div className="space-y-8">
            {papers.map((paper, index) => (
              <article key={index} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {paper.title}
                </h2>
                
                {paper.image && (
                  <img 
                    src={paper.image} 
                    alt={paper.title}
                    className="w-full h-auto rounded-lg mb-4 max-h-96 object-contain"
                  />
                )}
                
                <div className="prose prose-gray max-w-none">
                  {paper.summary?.map((point, i) => (
                    <p key={i} className="text-gray-700 mb-2">• {point}</p>
                  ))}
                </div>
                
                <div className="mt-4 flex gap-4">
                  {paper.paperLink && (
                    <a 
                      href={paper.paperLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      📄 原始论文
                    </a>
                  )}
                  {paper.tweetLink && (
                    <a 
                      href={paper.tweetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      🐦 Twitter 讨论
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>译自 <a href="https://nlp.elvissaravia.com" className="text-blue-600 hover:underline">The AI Newsletter</a></p>
        </div>
      </footer>
    </main>
  );
}
