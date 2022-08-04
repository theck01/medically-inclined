
export function urlFormat(str: string): string {
  return encodeURI(str.toLowerCase().replace(/[^\w_-]+/g, '-'));
}

export function publicUrlForImg(fileName: string): string {
  return encodeURI(`${process.env.PUBLIC_URL}/img/${fileName}`);
}

export function publicUrlForPDF(fileName: string): string {
  return encodeURI(`${process.env.PUBLIC_URL}/pdf/${fileName}`);
}
