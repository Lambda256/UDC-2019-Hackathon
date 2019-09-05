module.exports = async (promise) => {
  try {
    await promise;
    assert.fail("revert 가 호출이 되지 않았습니다.");
  } catch (error) {
    const revertFound = error.message.search("revert") >= 0;
    assert(revertFound, `revert 를 찾을 수가 없습니다.\n 에러 : ${error}`);
  }
};
