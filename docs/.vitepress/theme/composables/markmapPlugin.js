export function markmapPlugin(md) {
  const fence = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() === 'markmap') {
      // 对内容进行 encodeURIComponent 编码，避免注入和解析错误
      const content = encodeURIComponent(token.content);
      return `<Markmap :content="decodeURIComponent('${content}')" />`;
    }
    return fence(tokens, idx, options, env, self);
  };
}