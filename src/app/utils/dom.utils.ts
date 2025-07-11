function generateHTMLIdFromText(text: string): string {
  return text.toLowerCase().replaceAll(" ", "-");
}

export { generateHTMLIdFromText };
