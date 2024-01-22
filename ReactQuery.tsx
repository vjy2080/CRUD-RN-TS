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

export const createUser = async (title: string, desc: string): Promise<Post> => {
  const response = await axios.post(baseUrl, { title, description: desc });
  return response.data;
};

export const updateUser = async (title: string, desc: string, id: number): Promise<Post> => {
  const response = await axios.put(`${baseUrl}/${id}`, { title, description: desc });
  return response.data;
};

export const deleteUser = async (id: number): Promise<Post> => {
  console.log('delete press');
  
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};