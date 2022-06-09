
export function urlFormat(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}

export function publicUrlForImg(fileName: string): string {
  return `${process.env.PUBLIC_URL}/img/${fileName}`;
}

export function publicUrlForPDF(fileName: string): string {
  return `${process.env.PUBLIC_URL}/pdf/${fileName}`;
}
