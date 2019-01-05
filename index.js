/**
 * Created by Liu.Jun on 2019/1/5.
 */

// 辅助查找所有包含颜色的css 代码

const postcss = require('postcss');
const PLUGIN_NAME = 'postcss-plugin-css-check';

const defaultRule = [
    {
        name: 'color',
        decls: ['color', 'background-color', 'background', 'border-color', 'border'],
        rule: /#|rgb|hsl/,
        disableCommentFlag: 'disable-colorCheck',
        errMsg: 'css颜色未使用变量',
    }, {
        name: 'fontSize',
        decls: ['font-size'],
        rule: /^\d/,
        disableCommentFlag: 'disable-fontSizeCheck',
        errMsg: 'fontSize未使用变量',
    }
];

module.exports = postcss.plugin(PLUGIN_NAME, (opts = {
    checkColor = true,
    checkFontSize = true,
    include: [],
    exclude: []
} = {}) => {
    const filterRules = defaultRule.reduce((preVal, curVal) => {
        if (opts[`check${curVal.name.slice(0, 1).toUpperCase() + curVal.name.slice(1)}`]) {
            preVal.push(curVal);
        }
        return preVal;
    }, []);

    return function (root, result) {
        // Transform CSS AST here
        filterRules.forEach((curRule) => {
            root.walkDecls(new RegExp(curRule.decls.join('|')), decl => {
                if (curRule.rule.test(decl.value) && !opts.exclude.some(exPath => decl.source.input.file.includes(exPath))) {
                    // decl.remove();
                    const annotation = decl.next();
                    if (annotation && annotation.type === 'comment' && annotation.text.trim() === curRule.disableCommentFlag) {
                        // 手动禁止
                    } else {
                        throw decl.error(`${curRule.errMsg} ${decl.prop} -> ${decl.value}`)
                    }
                }
            });
        });
    }
});
