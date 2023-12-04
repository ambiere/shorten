module.exports = async function generateId() {
  const { customAlphabet, urlAlphabet } = await import("nanoid");
  return customAlphabet(urlAlphabet, 10)();
};
