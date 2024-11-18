import { MarkdownOptions } from "vitepress";

import timeline from "vitepress-markdown-timeline";
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";

//图片描述
import { figure } from '@mdit/plugin-figure'

const markdown: MarkdownOptions = {
  
  // Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
  lineNumbers: true, // 启用行号

  // 在所有文档的<h1>标签后添加<ArticleMetadata/>组件
  config: (md) => {
    // md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
    //   let htmlResult = slf.renderToken(tokens, idx, options);
    //   if (tokens[idx].tag === "h1")
    //     htmlResult += `\n<ClientOnly><ArticleMetadata /></ClientOnly>`;
    //   return htmlResult;
    // };


    // 在所有文档的<h1>标签后添加<ArticleMetadata/>组件
    md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
      let htmlResult = slf.renderToken(tokens, idx, options);
      if (tokens[idx].tag === 'h1') htmlResult += `\n<ClientOnly><ArticleMetadata1 v-if="($frontmatter?.aside ?? true) && ($frontmatter?.showArticleMetadata ?? true)" :article="$frontmatter" /></ClientOnly>`;
      return htmlResult;
    }



    md.use(InlineLinkPreviewElementTransform);
    md.use(timeline);
    //图片描述
    md.use(figure, { figcaption: 'alt', copyAttrs: '^class$', lazy: true }) 
    
  },
};
export default markdown;


