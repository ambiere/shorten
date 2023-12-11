module.exports = function httpUrl(string) {
  try {
    const url = new URL(string);
    const isValid = url.protocol === "http:" || url.protocol === "https:";
    if (!isValid) {
      const error = new Error("Invalid URL");
      throw error;
    }
    return { isValid, host: url.host, href: url.href };
  } catch (err) {
    return { isValid: false, error: err };
  }
};
