export type TypeRegisteredUsers = {
  allTimeNumber: number;
  monthNumber: number;
  userStats: {
    month: number;
    year: number;
    total: number;
  }[];
  weekNumber: number;
}

export type TypeRegisteredUsersFormated = {
  allTimeNumber: number;
  monthNumber: number;
  userStats: {
    year: string;
    value: number;
  }[];
  weekNumber: number;
}

export enum monthTitles {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12,
}

export const months = {};
months[monthTitles.JANUARY] = 'Январь';
months[monthTitles.FEBRUARY] = 'Февраль';
months[monthTitles.MARCH] = 'Март';
months[monthTitles.APRIL] = 'Апрель';
months[monthTitles.MAY] = 'Май';
months[monthTitles.JUNE] = 'Июнь';
months[monthTitles.JULY] = 'Июль';
months[monthTitles.AUGUST] = 'Август';
months[monthTitles.SEPTEMBER] = 'Сентябрь';
months[monthTitles.OCTOBER] = 'Октябрь';
months[monthTitles.NOVEMBER] = 'Ноябрь';
months[monthTitles.DECEMBER] = 'Декабрь';