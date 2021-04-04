import { TypeFormState, TypeItemRule } from "./types";
import { TypeSelectOption } from 'components/common/types';

export const cityItems: TypeSelectOption[] = [
  {
    value: 'Москва',
    text: 'Москва',
  },
  {
    value: 'Санкт-Петербург',
    text: 'Санкт-Петербург',
  },
  {
    value: 'Казань',
    text: 'Казань',
  },
  {
    value: 'Новосибирск',
    text: 'Новосибирск',
  },
  {
    value: 'Екатеринбург',
    text: 'Екатеринбург',
  },  {
    value: 'Нижний Новгород',
    text: 'Нижний Новгород',
  },
  {
    value: 'Челябинск',
    text: 'Челябинск',
  },
  {
    value: 'Самара',
    text: 'Самара',
  },
  {
    value: 'Омск',
    text: 'Омск',
  },
  {
    value: 'Ростов-на-Дону',
    text: 'Ростов-на-Дону',
  },
  {
    value: 'Уфа',
    text: 'Уфа',
  },
  {
    value: 'Красноярск',
    text: 'Красноярск',
  },
  {
    value: 'Воронеж',
    text: 'Воронеж',
  },
  {
    value: 'Пермь',
    text: 'Пермь',
  },
  {
    value: 'Волгоград',
    text: 'Волгоград',
  },
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
