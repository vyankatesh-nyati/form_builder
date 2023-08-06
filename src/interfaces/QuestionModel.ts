export default interface QuestionModel {
  id: string;
  type: string;
  question: string;
  categories: Array<{ id: string; name: string }>;
  items: Array<{ id: string; name: string; category: string }>;
}
