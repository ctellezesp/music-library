export const cutString = (paragraph: string): string => {
  return paragraph.length > 0 ? `${paragraph.slice(0, 200)}...` : '';
}