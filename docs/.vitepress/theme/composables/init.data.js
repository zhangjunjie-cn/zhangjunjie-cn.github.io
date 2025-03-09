import { execSync } from 'child_process';

try {
    execSync('node ./docs/.vitepress/theme/composables/heatmap.data.js', { stdio: 'inherit' });
    console.log('heatmap.data.js 执行成功');
} catch (error) {
    console.error('执行 heatmap.data.js 时发生错误:', error);
}

try {
    execSync('node ./docs/.vitepress/theme/composables/feeds.data.js', { stdio: 'inherit' });
    console.log('feeds.data.js 执行成功');
} catch (error) {
    console.error('执行 feeds.data.js 时发生错误:', error);
}
