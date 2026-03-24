import { formatSentence } from "../helpers.js";
import { takeFromIterator } from "../../grammar/sentences.js";

export const ID = "short_sentences";
export const TITLE = "示例句子";

export default function ShortSentencesComponent({ grammar }) {
  const { symbolInfo } = grammar.calculations;
  const iterator = grammar.exampleSentences();
  const { values, done } = takeFromIterator(iterator, 10, 1000);

  let examples, link;

  if (values.length == 0 && done) {
    examples = <p>{"没有可生成的示例句子"}</p>;
  } else {
    examples = (
      <ul className="symbols">
        {
          values.map(function(sentence, index) {
            return <li key={index}>{formatSentence(sentence, symbolInfo)}</li>;
          })
        }
      </ul>
    );
  }

  if (!done) {
    link = <p><a href="#/sentences">{"查看更多"}</a></p>;
  }

  return (
    <section id={ID} className="analysis">
      <h2>{TITLE}</h2>
      {examples}
      {link}
    </section>
  );
}
