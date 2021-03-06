import axios from "axios";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { useState } from "react";
import { TypeNewsPageData } from "./types";
import moment from "moment";

export function useRemoveNews(): any {
  const [loading, setLoading] = useState<boolean>(false);
  const [news, setNews] = useState<any[]>([]);
  const curJwtPair = getJwtPair();

  async function getNews(): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<any>(
        `/api/news/`, options,
      );
      const transformedNews = axiosData.map((item: TypeNewsPageData) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('DD.MM.YYYY'),
          subcategory: item.subcategory?.title,
        }
      })
      setNews(transformedNews)
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function getNewsByName(name: string): Promise<TypeNewsPageData | Object> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: participantData } = await axios.get<any>(
        `/api/news/getByName/${name}`, options,
      );
      const transformedNews = participantData.map((item: TypeNewsPageData) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('DD.MM.YYYY'),
        }
      })
      setNews([...transformedNews]);
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function getNewsByCategory(id: string): Promise<TypeNewsPageData | Object> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: participantData } = await axios.get<any>(
        `/api/news/getByCategory/${id}`, options,
      );
      const transformedNews = participantData.map((item: TypeNewsPageData) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('DD.MM.YYYY'),
        }
      })
      setNews([...transformedNews]);
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function deleteNews(id: string): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.delete<any>(
        `/api/news/${id}`, options,
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
    getNews,
    news,
    getNewsByName,
    getNewsByCategory,
    deleteNews
  }
}