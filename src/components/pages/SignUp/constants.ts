import { TypeFormState, TypeItemRule } from "./types";
import { TypeSelectOption } from 'components/common/types';

export const cityItems: TypeSelectOption[] = [
  {
    value: 'Город не указан',
    text: 'Город не указан',
  },
  {
    value: 'Ангарск',
    text: 'Ангарск',
  },
  {
    value: 'Балаково',
    text: 'Балаково',
  },
  {
    value: 'Билибино',
    text: 'Билибино',
  },
  {
    value: 'Волгодонск',
    text: 'Волгодонск',
  },
  {
    value: 'Глазов',
    text: 'Глазов',
  },
  {
    value: 'Десногорск',
    text: 'Десногорск',
  },
  {
    value: 'Димитровград',
    text: 'Димитровград',
  },
  {
    value: 'Железногорск',
    text: 'Железногорск',
  },
  {
    value: 'Заречный ПО',
    text: 'Заречный ПО',
  },
  {
    value: 'Заречный СО',
    text: 'Заречный СО',
  },
  {
    value: 'Зеленогорск',
    text: 'Зеленогорск',
  },
  {
    value: 'Ковров',
    text: 'Ковров',
  },
  {
    value: 'Краснокаменск',
    text: 'Краснокаменск',
  },
  {
    value: 'Курчатов',
    text: 'Курчатов',
  },
  {
    value: 'Лесной',
    text: 'Лесной',
  },
  {
    value: 'Нововоронеж',
    text: 'Нововоронеж',
  },
  {
    value: 'Новоуральск',
    text: 'Новоуральск',
  },
  {
    value: 'Обнинск',
    text: 'Обнинск',
  },
  {
    value: 'Озерск',
    text: 'Озерск',
  },
  {
    value: 'Певек',
    text: 'Певек',
  },
  {
    value: 'Полярные Зори',
    text: 'Полярные Зори',
  },
  {
    value: 'Саров',
    text: 'Саров',
  },
  {
    value: 'Северск',
    text: 'Северск',
  },
  {
    value: 'Снежинск',
    text: 'Снежинск',
  },
  {
    value: 'Сосновый Бор',
    text: 'Сосновый Бор',
  },
  {
    value: 'Трёхгорный',
    text: 'Трёхгорный',
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
