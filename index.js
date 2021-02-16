console.log(words);

const query = q => document.querySelector(q);

const makeRandom = wordAsArr => {
  const max = wordAsArr.length
  const min = 0;
  const index = Math.floor(Math.random() * (max - min) + min);
  const letter = wordAsArr.splice(index, 1)
  return wordAsArr.length ? letter + makeRandom(wordAsArr) : letter;
}

function shuffle(array) {
  var copy = [], n = array.length, i;
  while (n) {
    i = Math.floor(Math.random() * n--);
    copy.push(array.splice(i, 1)[0]);
  }

  return copy;
}

class Word {

  allWords = JSON.parse(JSON.stringify(shuffle(words)))
  selectedWord = {};
  selectRandomWord(list) {
    const max = list.length
    const min = 0;
    const index = Math.floor(Math.random() * (max - min) + min)
    return list[index];
  }

  next(){
    query('.correct').classList.add('hide');
    this.selectedWord = this.selectRandomWord(this.allWords)
    this.putTheWord(this.selectedWord.name);
    this.removeFromArr(this.selectedWord.name);
  }
  
  refresh() {
    this.putTheWord(this.selectedWord.name);
  }

  removeFromArr(name){
    this.allWords = this.allWords.filter(el => el.name !== name)
  }

  toggleCorrectAnswer(){
    const correct = query('.correct');
    const classes = correct.classList;
    const hasHide = classes.contains('hide');
    hasHide ? classes.remove('hide') : classes.add('hide')
  }

  putTheWord(word = 'Nazar'){
    const random = query('.field__word');
    const correct = query('.correct__word');
    random.innerHTML = this.getRandomWord(word);
    correct.innerHTML = word;
  }

  getRandomWord(word){
    const wordAsArr = word.split(' ').join('').split('').filter(Boolean);
    return makeRandom(wordAsArr).split('').join('-');
  }
}




const word = new Word();



const btnAnswer = query('.answer');
const nextBtn = query('.next');
const refresh = query('.refresh');
btnAnswer.addEventListener('click', word.toggleCorrectAnswer);
nextBtn.addEventListener('click', () => word.next());
refresh.addEventListener('click', () => word.refresh());

