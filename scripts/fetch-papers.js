const fs = require('fs');
const path = require('path');
const https = require('https');
const xml2js = require('xml2js');

const RSS_URL = 'https://nlp.elvissaravia.com/feed';
const DATA_PATH = path.join(__dirname, '..', 'data', 'papers.json');

// 简单的 XML 转 JSON
function fetchRSS() {
  return new Promise((resolve, reject) => {
    https.get(RSS_URL, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    }).on('error', reject);
  });
}

// 提取论文信息
function extractPapers(rss) {
  const items = rss.rss.channel[0].item || [];
  const papers = [];
  
  for (const item of items) {
    const content = item['content:encoded']?.[0] || '';
    const title = item.title?.[0] || '';
    const link = item.link?.[0] || '';
    const pubDate = item.pubDate?.[0] || '';
    
    // 提取图片
    const imageMatch = content.match(/src="([^"]+\.png[^"]*)"/);
    const image = imageMatch ? imageMatch[1] : null;
    
    // 提取论文链接
    const paperLinkMatch = content.match(/<a href="([^"]+arxiv[^"]+)"/);
    const paperLink = paperLinkMatch ? paperLinkMatch[1] : null;
    
    // 提取 Twitter 链接
    const tweetLinkMatch = content.match(/<a href="([^"]+twitter[^"]+|[^"]+x\.com[^"]+)"/);
    const tweetLink = tweetLinkMatch ? tweetLinkMatch[1] : null;
    
    // 提取要点（<li> 标签内容）
    const summaryMatches = content.match(/<li><p><strong>([^:]+):<\/strong>([^<]+)<\/p><\/li>/g);
    const summary = summaryMatches ? 
      summaryMatches.map(s => {
        const match = s.match(/<strong>([^:]+):<\/strong>([^<]+)/);
        return match ? `${match[1]}: ${match[2].trim()}` : null;
      }).filter(Boolean) : [];
    
    if (title && !title.includes('Message from the Editor')) {
      papers.push({
        title,
        link,
        pubDate,
        image,
        paperLink,
        tweetLink,
        summary: summary.slice(0, 5) // 最多 5 个要点
      });
    }
  }
  
  return papers.slice(0, 10); // 最多 10 篇
}

// 主函数
async function main() {
  console.log('📡 正在获取 RSS...');
  
  try {
    const rss = await fetchRSS();
    const papers = extractPapers(rss);
    
    console.log(`✅ 获取到 ${papers.length} 篇论文`);
    
    // 保存数据
    fs.writeFileSync(DATA_PATH, JSON.stringify(papers, null, 2));
    console.log(`💾 数据已保存到 ${DATA_PATH}`);
    
    // 打印预览
    console.log('\n📰 最新论文:');
    papers.slice(0, 3).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.title}`);
    });
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
