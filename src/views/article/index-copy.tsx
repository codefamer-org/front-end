// 提供插入md文档模板标签
import ReactMarkdown from 'react-markdown';
// 支持gfm语法 简单理解就是平时书写md文档的语法
import remarkGfm from 'remark-gfm';
// md文档所需要的样式，例如表格的线条等等
import 'github-markdown-css';
import remarkParse from 'remark-parse';

const md = '# 飒飒都可'

const SPELDocument = () => {
  return <ReactMarkdown remarkPlugins={[[remarkGfm, remarkParse, { singleTilde: false }]]}>{md}</ReactMarkdown>;
};

const ArticlePage: React.FC = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
       <article className="markdown-body">
          <SPELDocument />
      </article>
    </div>
  )
}
export default ArticlePage;