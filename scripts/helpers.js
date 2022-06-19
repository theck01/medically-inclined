
function argsForFlag(flag) {
  const flagIndex = process.argv.findIndex((arg) => arg === flag);
  if (flagIndex < 0) {
    return [];
  }

  const argEndIndex = process.argv.findIndex(
    (arg, i) => i > flagIndex && arg.startsWith('-')
  );
  return process.argv.slice(
    flagIndex + 1, 
    argEndIndex > 0 ? argEndIndex : process.argv.length
  );
}

module.exports = {
  argsForFlag,
};
