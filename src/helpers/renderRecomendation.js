export default function renderRecomendation(action, changeIndex, countNextButton) {
  const four = 4;
  if (action === 'next') {
    if (countNextButton === four) {
      changeIndex(0);
    } else {
      changeIndex(countNextButton + 2);
    }
  }

  if (action === 'prev') {
    if (countNextButton === 0) {
      changeIndex(four);
    } else {
      changeIndex(countNextButton - 2);
    }
  }
}
