import { formatSymbol, formatSymbolList, listSymbols } from "../helpers.js";

export const ID = "nonterminals";
export const TITLE = "非终结符";

export default function NonterminalsComponent({ grammar }) {
  const { nullable, endable, first, follow, symbolInfo } = grammar.calculations;

  return (
    <section id={ID} className="analysis">
      <h2>{TITLE}</h2>

      <table className="symbols">
        <thead>
          <tr>
            <th>符号</th>
            <th>可空?</th>
            <th>可结束?</th>
            <th>First 集</th>
            <th>Follow 集</th>
          </tr>
        </thead>

        <tbody>
          {
            symbolInfo.productionOrder.map(function(symbol) {
              const firstSymbols = first.get(symbol);
              const followSymbols = follow.get(symbol);

              return (
                <tr key={symbol}>
                  <td>{formatSymbol(symbol, symbolInfo)}</td>
                  <td>{nullable.has(symbol) ? "可空" : ""}</td>
                  <td>{endable.has(symbol) ? "可结束" : ""}</td>
                  <td>{formatSymbolList(listSymbols(firstSymbols, symbolInfo.terminalOrder), symbolInfo)}</td>
                  <td>{formatSymbolList(listSymbols(followSymbols, symbolInfo.terminalOrder), symbolInfo)}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </section>
  );
}
