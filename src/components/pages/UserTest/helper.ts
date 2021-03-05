import { Page, paths } from "routes/constants";

export const getNextQuestionLink = (index): string => {
    return paths[Page.USER_TEST] + '/' + (++index);
}