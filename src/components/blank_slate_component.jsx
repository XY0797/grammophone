const EXAMPLES = [
  ["算术表达式", `exp -> exp "+" term | term .
term -> term "*" factor | factor .
factor -> "(" exp ")" | number .
`],
  ["悬空 Else", `statement -> if_stmt | other .
if_stmt -> if "(" cond ")" statement |
  if "(" cond ")" statement else statement .
cond -> true | false .
`]
];

function Example({ name, src, loadExample }) {
  return (
    <>
      <h3>{name}</h3>
      <pre><code>{src}</code></pre>
      <p><button onClick={() => loadExample(src)}>分析</button></p>
    </>
  );
}

export default function BlankSlateComponent({ loadExample }) {
  return (
    <main id="blank-slate">
      <div className="message">
        <p><b>Grammophone</b> 是一个用于分析和转换上下文无关文法的工具。首先，请输入一个文法并点击 <i>分析</i> 或 <i>转换</i>。</p>

        <h2>示例文法</h2>

        {EXAMPLES.map(([name, src]) => <Example name={name} src={src} key={name} loadExample={loadExample} />)}
      </div>
    </main>
  );
}