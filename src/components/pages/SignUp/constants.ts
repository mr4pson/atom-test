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

export const phoneNumberMask = "+7 (111)-111-11-11";

export const formItemRulse: TypeItemRule[] = [
  { required: true, message: 'Пожалуйста, введите ваше Ф.И.О.!' },
  { required: true, message: 'Пожалуйста, введите ваш Email!' },
  { required: true, message: 'Пожалуйста, введите ваш номер телефона!' },
]

export const inititalFormValue: TypeFormState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  city: cityItems[0].value,
}