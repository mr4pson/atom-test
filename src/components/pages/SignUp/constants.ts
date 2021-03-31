import { TypeFormState, TypeItemRule } from "./types";
import { TypeSelectOption } from 'components/common/types';

export const cityItems: TypeSelectOption[] = [
  {
    value: 'Moscow',
    text: 'Москва',
  },
  {
    value: 'SaintPetersberg',
    text: 'Санкт-Петербург',
  },
  {
    value: 'Kazan',
    text: 'Казань',
  }
]

export const sexItems: TypeSelectOption[] = [
  {
    value: 'male',
    text: 'Мужской',
  },
  {
    value: 'female',
    text: 'Женский',
  },
]

export const phoneNumberMask = "+7 (111)-111-11-11";

export const formItemRulse: TypeItemRule[] = [
  { required: true, message: 'Пожалуйста, введите ваше Ф.И.О.!' },
  { required: true, message: 'Пожалуйста, введите ваш Email!' },
  { required: true, message: 'Пожалуйста, введите ваш номер телефона!' },
  { required: true, message: 'Пожалуйста, введите ваш логин!' },
  { required: true, message: 'Пожалуйста, введите ваш пароль!' },
]

export const inititalFormValue: TypeFormState = {
  fullName: '',
  email: '',
  phone: '',
  city: cityItems[0].value,
  sex: sexItems[0].value,
  username: '',
  password: '',
}
