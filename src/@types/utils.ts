declare global {
  interface String {
    trimChar(char: string): string;
    squashSpaces(): string;
    camelCase(): string;
  }
}

String.prototype.trimChar = function (char: string) {
  let start = 0;
  let end = this.length;

  while (start < end && this[start] === char) ++start;
  while (end > start && this[end - 1] === char) --end;

  // this.toString() due to ava deep equal issue with String { "value" }
  return start > 0 || end < this.length ? this.substring(start, end) : this.toString();
};

String.prototype.squashSpaces = function () {
  return this.replace(/  +/g, " ").trim();
};

String.prototype.camelCase = function () {
  return this.toLowerCase().replace(/([-_ ][a-z0-9])/g, (group: string) => {
    return group.toUpperCase().replace("-", "").replace("_", "").replace(" ", "");
  });
};

export {};
