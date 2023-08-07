export default interface QuestionModel {
  id: string;
  type: string;
  question: string;
  categories: Array<{ id: string; name: string }>;
  items: Array<{ id: string; name: string; category: string }>;
  wordsArray: Array<{ word: string; isShow: boolean }> 
  options: Array<{ isExist: boolean; name: string; id: string }>
}
