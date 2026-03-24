import { formatSentence, formatSymbolList, listSymbols, formatProduction } from "../helpers.js";

function formatUnreachable(unreachable, info) {
  if (unreachable.size > 0) {
    return (
      <li>
        {"文法包含不可达的非终结符："}
        {formatSymbolList(listSymbols(unreachable, info.productionOrder), info)}
      </li>
    );
  } else {
    return <li>{"所有非终结符均可达。"}</li>;
  }
}

function formatUnrealizable(unrealizable, info) {
  if (unrealizable.size > 0) {
    return (
      <li>
        {"文法包含不可实现的非终结符："}
        {formatSymbolList(listSymbols(unrealizable, info.productionOrder), info)}
      </li>
    );
  } else {
    return <li>{"所有非终结符均可实现。"}</li>;
  }
}

function formatCycle(cycle, info) {
  if (typeof cycle !== "undefined") {
    return (
      <li>
        {"文法是循环的："}
        {formatSymbolList(cycle, info, " \u21D2 ")}
        {" 是一个循环。"}
      </li>
    );
  } else {
    return <li>{"文法不包含循环。"}</li>;
  }
}

function formatNullAmbiguity(nullAmbiguity, productions, info) {
  if (nullAmbiguity.length > 0) {
    return (
      <li>
        {"文法包含空歧义："}
        {formatProduction(productions[nullAmbiguity[0]], info)}
        {" 和 "}
        {formatProduction(productions[nullAmbiguity[1]], info)}
        {" 存在歧义的空可派生性。"}
      </li>
    );
  } else {
    return <li>{"文法在空派生上是无歧义的。"}</li>;
  }
}

function formatAmbiguous(ambiguous, info) {
  if (typeof ambiguous !== "undefined") {
    return (
      <li>
        {"文法是歧义的：句子 "}
        {formatSentence(ambiguous, info)}
        {" 存在歧义推导。"}
      </li>
    );
  }
}

export const ID = "sanity";
export const TITLE = "健全性检查";

export default function SanityComponent({ grammar }) {
  const { unreachable, unrealizable, cycle, nullAmbiguity, productions, symbolInfo } = grammar.calculations;
  const ambiguous = grammar.ambiguousSentenceExample;

  return (
    <section id={ID} className="analysis">
      <h2>{TITLE}</h2>

      <ul className="symbols">
        {formatUnreachable(unreachable, symbolInfo)}
        {formatUnrealizable(unrealizable, symbolInfo)}
        {formatCycle(cycle, symbolInfo)}
        {formatNullAmbiguity(nullAmbiguity, productions, symbolInfo)}
        {formatAmbiguous(ambiguous, symbolInfo)}
      </ul>
    </section>
  );
}
