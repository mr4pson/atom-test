import axios from "axios";
import { useState } from "react";
import { TypeLink, TypeMenu } from "./types";

export function useGetMenu(): any {
  const [loading, setLoading] = useState<boolean>(false);
  const [receivedLinks, setReceivedLinks] = useState<TypeLink[]>([]);

  async function getLinks(): Promise<any> {
    setLoading(true);
    try {
      const { data: axiosData } = await axios.get<TypeMenu[]>(
        `/api/menus/get-visible-menus`,
      );
      const transformedLinks: TypeLink[] = axiosData.map((menu: TypeMenu) => ({
        name: menu.title,
        path: menu.url,
        deletable: menu.deletable,
        children: menu.subcategories.map((subcategory) => ({
          name: subcategory.title,
          path: subcategory.url,
        })),
      }));
      setReceivedLinks(transformedLinks)
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    receivedLinks,
    getLinks,
  }
}