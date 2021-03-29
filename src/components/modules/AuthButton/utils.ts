export function getShortFullName(fullName: string) {
  if (!fullName) {
    return '';
  }
  const words = fullName.split(' ');
  words[1] = words[1][0] + '.';

  return words.join(' ');
}
