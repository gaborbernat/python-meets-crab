module.exports = {
  plugins: [require.resolve("prettier-plugin-slidev")],
  printWidth: 120,
  proseWrap: "always",
  embeddedLanguageFormatting: "auto",
  overrides: [
    {
      files: ["slides.md"],
      options: { parser: "slidev" },
      plugins: ["prettier-plugin-slidev"],
    },
  ],
};
