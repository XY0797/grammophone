import { makeCalculationsMemo } from "./calculations_memo.js";
import { makeSentencesIterator, ambiguousSentenceExample } from "./sentences.js";
import { quoteSymbol } from "./symbols.js";

export default class Grammar {
  constructor(productions) {
    var i, j;

    if (!(productions instanceof Array)) {
      throw new Error("产生式列表必须是一个数组");
    }

    if (productions.length < 1) {
      throw new Error("文法必须至少包含一个产生式");
    }

    for (i = 0; i < productions.length; i++) {
      if (!(productions[i] instanceof Array)) {
        throw new Error("产生式必须是数组");
      }

      if (productions[i].length < 1) {
        throw new Error("产生式必须至少包含一个符号");
      }

      for (j = 0; j < productions[i].length; j++) {
        if (typeof productions[i][j] !== "string") {
          throw new Error("产生式符号必须是字符串");
        }

        if (productions[i][j].match(/^Grammar\./)) {
          throw new Error("保留符号 " + productions[i][j] + " 不能作为产生式的一部分");
        }

        if (productions[i][j] === "") {
          throw new Error("空符号不能作为产生式的一部分");
        }
      }
    }

    this.productions = productions;
  }

  transform(transformation) {

    var productions = this.productions.slice();

    transformation.changes.forEach(function(change) {

      if (change.operation === "delete") {
        productions.splice(change.index, 1);
      } else if (change.operation === "insert") {
        productions.splice(change.index, 0, change.production);
      }

    });

    return new Grammar(productions);

  }

  toString() {
    let result = "";

    for (let i = 0; i < this.productions.length; i++) {
      result += quoteSymbol(this.productions[i][0]);
      result += " ->";

      for (let j = 1; j < this.productions[i].length; j++) {
        result += " " + quoteSymbol(this.productions[i][j]);
      }

      result += " .\n";
    }

    return result;
  }

  exampleSentences() {
    return makeSentencesIterator(this);
  }

  get ambiguousSentenceExample() {
    return ambiguousSentenceExample(this);
  }

  get calculations() {
    const calculations = makeCalculationsMemo(this.productions);

    Object.defineProperty(this, "calculations", { value: calculations, enumerable: true });
    return this.calculations;
  }
}
