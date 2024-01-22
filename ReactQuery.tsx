import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "./components/Constant";

interface Post {
  id: number;
  title: string;
  description: string;
}

export const fetchData = async (): Promise<Post[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const useHandleApi = () => {
  return useQuery<Post[], Error>({
    queryKey: ['fetchData'],
    queryFn: fetchData,
  });
};

export const createItem = async (title: string, desc: string): Promise<Post> => {
  console.log('create press');
  const response = await axios.post(baseUrl, { title, description: desc });
  return response.data;
};

export const updateItem = async (title: string, desc: string, id: number): Promise<Post> => {
  console.log('update press');

  const response = await axios.put(`${baseUrl}/${id}`, { title, description: desc });
  return response.data;
};

export const deleteItem = async (id: number): Promise<Post> => {
  console.log('delete press');
  
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};
