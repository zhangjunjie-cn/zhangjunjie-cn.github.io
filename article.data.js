import fs from 'node:fs';
import path from 'node:path';
import parseFrontmatter from 'gray-matter';

const excludedFiles = ['index.md', 'tags.md', 'archives.md','nav.md'];

export default {
  watch: ['./docs/**/*.md'],
  load(watchedFiles) {
    // console.log("Watched Files:", watchedFiles);
    // 排除不必要文件
    const articleFiles = watchedFiles.filter(file => {
      const filename = path.basename(file);
      return !excludedFiles.includes(filename);
    });
    // 解析文章 Frontmatter
    return articleFiles.map(articleFile => {
      // console.log("Processing Article File:", articleFile);
      const articleContent = fs.readFileSync(articleFile, 'utf-8');
      const { data } = parseFrontmatter(articleContent);
      // console.log("data:", data);
      return {
        ...data,
        path: data.path = articleFile.replace(/^.*?\/docs\//, '').replace(/\.md$/, ''),

      }
    })
  }
}