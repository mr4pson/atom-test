export const initialBannerFormState = {
  bannerDays: undefined,
  bannerHours: undefined,
  bannerMinutes: undefined,
  bannerSeconds: undefined,
};

export const initialTestFormState = {
  testHours: undefined,
  testMinutes: undefined,
  testSeconds: undefined,
}

// export const bannerFormItems = [
//   {
//     name: 'bannerDays',
//     fieldName: 'bannerDays',
//     initialState: initialBannerFormState.bannerDays,
//     placeholder: 'Кол-во дней',
//   },
//   {
//     name: 'bannerHours',
//     fieldName: 'bannerHours',
//     initialState: initialBannerFormState.bannerHours,
//     placeholder: 'Кол-во часов',
//   },
//   {
//     name: 'bannerMinutes',
//     fieldName: 'bannerMinutes',
//     initialState: initialBannerFormState.bannerMinutes,
//     placeholder: 'Кол-во минут',
//   },
//   {
//     name: 'bannerSeconds',
//     fieldName: 'bannerSeconds',
//     initialState: initialBannerFormState.bannerSeconds,
//     placeholder: 'Кол-во секунд',
//   }
// ];

export const testFormItems = [
  {
    name: 'testHours',
    fieldName: 'testHours',
    initialState: initialTestFormState.testHours,
    placeholder: 'Кол-во часов',
    maxValue: 23,
    translation: 'часы',
  },
  {
    name: 'testMinutes',
    fieldName: 'testMinutes',
    initialState: initialTestFormState.testMinutes,
    placeholder: 'Кол-во минут',
    maxValue: 60,
    translation: 'минуты',
  },
  {
    name: 'testSeconds',
    fieldName: 'testSeconds',
    initialState: initialTestFormState.testSeconds,
    placeholder: 'Кол-во секунд',
    maxValue: 60,
    translation: 'секунды',
  },
];
