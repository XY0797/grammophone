function formatClassification(cs, c, n) {
  if (cs[c].member) {
    return `该文法是 ${n}.`;
  } else {
    return <span className="conflict">{`不是 ${n} — ${cs[c].reason}.`}</span>;
  }
}

export const ID = "parsing";
export const TITLE = "解析算法";

export default function ParsingComponent({ grammar }) {
  const { classification } = grammar.calculations;

  return (
    <section id={ID} className="analysis">
      <h2>{TITLE}</h2>
      <table className="parsing-algorithm-table">
        <tbody>
          <tr>
            <th scope="row">{"LL(1)"}</th>
            <td className="classification">{formatClassification(classification, "ll1", "LL(1)")}</td>
            <td>
              <a href="#/ll1-table">{"解析表"}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">{"LR(0)"}</th>
            <td className="classification">{formatClassification(classification, "lr0", "LR(0)")}</td>
            <td>
              <a href="#/lr0-automaton">{"自动机"}</a>
              {", "}
              <a href="#/lr0-table">{"解析表"}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">{"SLR(1)"}</th>
            <td className="classification">{formatClassification(classification, "slr1", "SLR(1)")}</td>
            <td>
              <a href="#/slr1-table">{"解析表"}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">{"LR(1)"}</th>
            <td className="classification">{formatClassification(classification, "lr1", "LR(1)")}</td>
            <td>
              <a href="#/lr1-automaton">{"自动机"}</a>
              {", "}
              <a href="#/lr1-table">{"解析表"}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">{"LALR(1)"}</th>
            <td className="classification">{formatClassification(classification, "lalr1", "LALR(1)")}</td>
            <td>
              <a href="#/lalr1-automaton">{"自动机"}</a>
              {", "}
              <a href="#/lalr1-table">{"解析表"}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
