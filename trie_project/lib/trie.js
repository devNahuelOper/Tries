class Node {
  constructor() {
    this.children = {};
    this.isTerminal = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insertRecur(word, root = this.root) {
    let letter = word[0];

    if (!(letter in root.children)) {
      root.children[letter] = new Node();
    }

    if (word.length === 1) {
      root.children[letter].isTerminal = true;
    } else {
      this.insertRecur(word.slice(1), root.children[letter]);
    }
  }

  insertIter(word) {
    let root = this.root;

    for (let i = 0; i < word.length; i++) {
      let letter = word[i];

      if (!(letter in root.children)) {
        root.children[letter] = new Node();
      }

      root = root.children[letter];
    }

    root.isTerminal = true;
  }

  searchRecur(word, root = this.root) {
    if (!word.length) return root.isTerminal;

    let letter = word[0];

    if (letter in root.children) {
      return this.searchRecur(word.slice(1), root.children[letter]);
    } else {
      return false;
    }
  }

  searchIter(word) {
    let root = this.root;

    for (let i = 0; i < word.length; i++) {
      let letter = word[i];

      if (!(letter in root.children)) {
        return false;
      }

      root = root.children[letter];
    }

    return root.isTerminal;
  }

  startsWith(word, root = this.root) {
    if (!word.length) return true;

    let letter = word[0];

    if (letter in root.children) {
      return this.startsWith(word.slice(1), root.children[letter]);
    } else {
      return false;
    }
  }

  startAt(letter, root = this.root) {
    if (letter in root.children) return root;

    for (let child in root.children) {
      return this.startAt(letter, root.children[child]);
    }
  }

  endsWith(word) {
    let root = this.startAt(word[0]);

    for (let i = 0; i < word.length; i++) {
      let letter = word[i];

      if (!(letter in root.children)) return false;

      root = root.children[letter];
    }

    return root.isTerminal;
  }

  wordsWithPrefix(prefix, root = this.root) {
    if (!prefix.length) {
      let allWords = [];

      if (root.isTerminal) allWords.push("");

      for (let char in root.children) {
        let child = root.children[char];

        let suffixes = this.wordsWithPrefix("", child);
        let words = suffixes.map((word) => char + word);
        allWords.push(...words);
      }

      return allWords;
    } else {
      let firstChar = prefix[0];
      let child = root.children[firstChar];

      if (!child) {
        return [];
      } else {
        let suffixes = this.wordsWithPrefix(
          prefix.slice(1),
          root.children[firstChar]
        );
        let words = suffixes.map((word) => firstChar + word);
        return words;
      }
    }
  }
}

module.exports = {
  Node,
  Trie,
};

