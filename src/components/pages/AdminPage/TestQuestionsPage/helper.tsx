import { Tooltip } from 'antd';
import axios from 'axios';
import { getJwtPair } from 'components/pages/LoginPage/helpers';
import { TypeCollapseConfig } from 'components/uiKit/AdminCollapse/types';
import { ReactComponent as TrueIcon } from '../../../../assets/images/admin/circle-check.svg';
import { ReactComponent as DoneIcon } from '../../../../assets/images/admin/done.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/admin/edit.svg';
import { ReactComponent as ImageIcon } from '../../../../assets/images/admin/image.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/images/admin/trash.svg';
import { TypeAction } from './TestQuestionsOption/types';
import { QuestionOptionType, TypeTestQuestion, TypeTestQuestionOption } from "./types";

const curJwtPair = getJwtPair();

export const getQuestionActions = (
  isEditing: boolean = false,
  setTestQuestions: React.Dispatch<React.SetStateAction<TypeTestQuestion[]>>,
  testQuestion: TypeTestQuestion | null,
  setRerender: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentTest: React.Dispatch<React.SetStateAction<any>>,
  setCurrentTestOption: React.Dispatch<React.SetStateAction<any>>,
): TypeAction[] => {
  const actions: TypeAction[] = [];

  if (testQuestion?.id) {
    actions.push({
      id: 'image',
      icon: testQuestion?.image ? <Tooltip title={testQuestion?.image}>
        <ImageIcon className="test-questions-option__action_active" />
      </Tooltip> : <ImageIcon />,
      callback: (action: TypeAction, config: TypeCollapseConfig) => {
        setCurrentTest(config);
      },
    });
  }
  actions.push({
    id: 'edit',
    icon: !isEditing ? <EditIcon /> : <DoneIcon />,
    callback: async (action: TypeAction, config: any, formValues: Object) => {
      config.isEditing = !config.isEditing;

      if (config.isEditing) {
        action.icon = <DoneIcon />;
      } else {
        action.icon = <EditIcon />;
        Object.assign(config, formValues);
        // TODO request to backend
        const options = {
          headers: {
            'Authorization': `Bearer ${await curJwtPair}`,
            'withCredentials': true
          },
        }
        if (config.id) {
          const payload = {
            _id: config.id,
            options: config.options.map((option) => ({
              id: option._id,
              title: option.title,
              image: option.image,
              trueOption: option.trueOption,
            })),
            title: config.title,
            type: config.type,
            image: config.image,
          }
          
          await axios.put<TypeTestQuestion>('/api/questions/' + config.id, payload, options);
        } else {
          const payload = {
            options: config.options.map((option) => ({
              id: option._id,
              title: option.title,
              image: option.image,
              trueOption: option.trueOption,
            })),
            title: config.title,
            type: config.type,
            image: config.image,
          }
          const questionResponse = await axios.post<TypeTestQuestion[]>('/api/questions', payload, options);

          const questions = questionResponse.data.map((question) => {
            question.collapseOn = 'edit';
            question.actions = getQuestionActions(question.isEditing, setTestQuestions, question, setRerender, setCurrentTest, setCurrentTestOption);
            question.options = question.options.map((option) => (
              {
                ...option,
                actions: getQuestionOptionActions(option.isEditing, setTestQuestions, option, question, setRerender, setCurrentTestOption)
              }
            ));
            question.body = <div></div>;
            return question;
          });

          setTestQuestions(questions);
        }
      }
    },
  });

  if (testQuestion?.id) {
    actions.push(
      {
        id: 'Delete',
        icon: <TrashIcon />,
        callback: async (action: TypeAction, config: TypeCollapseConfig) => {
          if (!config.id) {
            return;
          }
          if (window.confirm(`Вы уверены, что хотите удалить вопрос №${config.id}`)) {
            // TODO request to backend
            const options = {
              headers: {
                'Authorization': `Bearer ${await curJwtPair}`,
                'withCredentials': true
              },
            }
            axios.delete('/api/questions/' + config.id, options).then((response) => {
              setTestQuestions(response.data.map((question) => {
                question.actions = getQuestionActions(question.isEditing, setTestQuestions, question, setRerender, setCurrentTest, setCurrentTestOption);
                question.options = question.options.map((option) => (
                  {
                    ...option,
                    actions: getQuestionOptionActions(option.isEditing, setTestQuestions, option, question, setRerender, setCurrentTestOption)
                  }
                ));
                question.body = <div></div>;
                return question;
              }));
            });
          }
        },
      });
  }

  return actions;
}

export const getQuestionOptionActions = (
  isEditing: boolean = false,
  setTestQuestions: React.Dispatch<React.SetStateAction<TypeTestQuestion[]>>,
  option: TypeTestQuestionOption | null,
  question: TypeTestQuestion,
  setRerender: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentTestOption: React.Dispatch<React.SetStateAction<any>>,
): TypeAction[] => {
  const actions: TypeAction[] = [];

  if (question.id) {
    actions.push({
      id: 'image',
      icon: option?.image ? <Tooltip title={option?.image}>
        <ImageIcon className="test-questions-option__action_active" />
      </Tooltip> : <ImageIcon />,
      callback: (action: TypeAction, config: TypeCollapseConfig) => {
        setCurrentTestOption(config);
      },
    });
  }
  actions.push({
    id: 'edit',
    icon: !isEditing ? <EditIcon /> : <DoneIcon />,
    callback: (action: TypeAction, config: TypeCollapseConfig, formValues: Object) => {
      config.isEditing = !config.isEditing;

      if (config.isEditing) {
        action.icon = <DoneIcon />;
      } else {
        action.icon = <EditIcon />;
        Object.assign(config, formValues);
        // TODO request to backend
        if (config.id) {
        } else {
          // TODO remove and replace with requested ID
          config.id = Math.round(Math.random() * 10000);
        }
      }
    },
  });

  actions.push({
    id: 'makeTrue',
    icon: option?.trueOption ? <TrueIcon className="test-questions-option__action_active" /> : <TrueIcon />,
    callback: (action: TypeAction, config: any) => {
      setTestQuestions((prevStateQuestions) => {
        const questions = [...prevStateQuestions];
        const curQuestion = questions.find(curQuestion => curQuestion.id === question.id) as TypeTestQuestion;
        if (curQuestion.type === QuestionOptionType.RADIO) {
          const activeOption = curQuestion.options.find((option) => option.trueOption) as TypeTestQuestionOption;
          if (activeOption) {
            activeOption.trueOption = false;
          }
          config.trueOption = true;
        } else {
          config.trueOption = !option?.trueOption;
        }
        action.icon = <TrueIcon className="test-questions-option__action_active" />;

        return questions;
      });
      setRerender(true);
    },
  });

  if (question.id) {
    actions.push({
      id: 'Delete',
      icon: <TrashIcon />,
      callback: (action: TypeAction, config: TypeCollapseConfig) => {
        if (!config.id) {
          return;
        }
        if (window.confirm(`Вы уверены, что хотите удалить вопрос №${config.id}`)) {
          // TODO request to backend
          setTestQuestions((prevStateQuestions) => {
            const questions = [...prevStateQuestions];
            const curQuestion = questions.find(curQuestion => curQuestion.id === question.id) as TypeTestQuestion;
            curQuestion.options = curQuestion.options.filter(option => option.id !== config.id);

            return questions;
          });
        }
      },
    });
  }

  return actions;
}