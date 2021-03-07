import { Page } from "./constants";

export type TypeRoute = {
  type: Page;
  path: string;
  exact?: boolean;
  component: JSX.Element;
}