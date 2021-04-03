export type TypeDictationQuestionData = {
  id: string;
  fullName: string;
  message: string;
  email: string;
}

export type TypeDictationQuestion = TypeDictationQuestionData & { createdAt: string };

export type TypeUseUpdateDictationQuestionsResult = {
  loading: boolean;
  error: boolean;
  addDictationQuestion: (formData: any) => Promise<Object>;
  getDictationQuestions: () => Promise<TypeDictationQuestion[] | Object>;
  dictationQuestions: TypeDictationQuestion[];
  deleteDictationQuestion: (id: string) => Promise<Object>;
}

export type TypeUseWatchDictationQuestionResult = {
  loadingWatch: boolean;
  currentQuestion: TypeDictationQuestion | null;
  getCurrentQuestion: (id: string) => Promise<TypeDictationQuestion | Object>;
}
