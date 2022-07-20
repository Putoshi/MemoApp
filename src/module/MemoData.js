const newPerson = () => {
  return {
    createdAt: '2022/07/22', title: 'テストTESTテストTESTテストTEST', path: 'favorite'
  };
};
const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newPerson()
      };
    });
  };

  return makeDataLevel();
}
