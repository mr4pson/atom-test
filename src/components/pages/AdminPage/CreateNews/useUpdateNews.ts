import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { TypeNewsPageData } from "../NewsPage/types";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { TypeUseUpdateNewsResult } from "./types";
import { TypeSubCategory } from "../MenuDetailPage/types";

export function useCreateNews(): TypeUseUpdateNewsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const curJwtPair = getJwtPair();
  const [currentNews, setCurrentNews] = useState<TypeNewsPageData | null>(null);
  const [subcategories, setSubcategories] = useState<TypeSubCategory[]>([]);

  async function getCurrentNews(id: string): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<any>(
        `/api/news/${id}`, options,
      );
      const transformedNews = {
          ...axiosData,
          subcategory: axiosData.subcategory._id,
          createdAt: moment(axiosData.createdAt).format('DD.MM.YYYY'),
        }
      setCurrentNews(transformedNews)
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function getSubcategories(): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: subcategories } = await axios.get<TypeSubCategory[]>(
        `/api/subcategories`, options,
      );

      setSubcategories(subcategories)
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function createNews(formData: any): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.post<any>(
        `/api/news/`, { ...formData },
        options,
      );
      console.log(axiosData);
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function updateNews(formData: any, id: string): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.put<any>(
        `/api/news/${id}`, { ...formData },
        options,
      );
      console.log(axiosData);
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
    currentNews,
    getCurrentNews,
    createNews,
    updateNews,
    getSubcategories,
    subcategories
  }
}