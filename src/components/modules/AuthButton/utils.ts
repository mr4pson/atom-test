export function getShortFullName(fullName: string) {
  if (!fullName) {
    return '';
  }

  const words = fullName.split(' ');
  words[1] = words[1][0] + '.';

  if (words.length === 2) {
    return words.join(' ');
  } else {
    const wordsWithoutLast = words.splice(0, 2);

    return wordsWithoutLast.join(' ');
  }
}
