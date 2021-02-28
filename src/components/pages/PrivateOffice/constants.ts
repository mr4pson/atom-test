import { TypeSelectOption } from "components/common/types";

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

export const inititalFormState = {
  fullName: 'Иванов Андрей Павлович',
  city: 'Омск',
  sex: sexItems[0].value,
  phoneNumber: '(999) 999 99 99',
  email: 'email@gmail.com',
}