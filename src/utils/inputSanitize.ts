export function sanitizeInput(input: string) {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/[<>]/g, '')               // remove HTML tags
      .replace(/[\r\n]+/g, ' ')           // remove CRLF to avoid header injection
      .replace(/%0A|%0D|\\n|\\r/g, '')    // additional newline removal
      .trim();                            // remove surrounding whitespace
  };
  