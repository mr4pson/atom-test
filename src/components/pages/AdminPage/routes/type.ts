import { AdminsPage } from "./constants";

export type TypeRoute = {
  type: AdminsPage;
  path: string;
  exact?: boolean;
  component: JSX.Element;
}