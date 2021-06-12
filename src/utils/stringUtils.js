export const capitalize = (word = '') => {
  // console.log(word);
  try {
    if (word.trim().includes(' ')) {
      const words = word.split(' ');
      for (let i = 0; i < words.length; i++) {
        let first_letter = String(words[i])[0];
        first_letter = first_letter.toUpperCase();
        words[i] = first_letter + String(words[i]).substring(1);
      }
      word = words.join(' ');
      return word;
    }
    let first_letter = String(word)[0];
    first_letter = first_letter.toUpperCase();
    let new_word = first_letter + String(word).substring(1);
    return new_word;
  } catch (error) {
    return 'Empty';
  }
};
