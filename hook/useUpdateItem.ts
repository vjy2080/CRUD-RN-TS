import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem } from '../query/ReactQuery';

interface UpdateItemProps {
  title: string;
  desc: string;
  id: number;
  previousData?: any[];
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationKey: ['updatePost'],
    mutationFn: ({ title, desc, id }: UpdateItemProps) => updateItem(title, desc, id),
    onMutate: ({ title, desc }) => {
      let previousData: any[] = queryClient.getQueryData(['fetchData']) ?? [];
      let oldData = [...previousData];
      console.log("oldData", oldData);
      if (oldData.length > 0) {
        oldData.push({
          id: new Date(),
          title: title,
          description: desc,
        });
      } else {
        oldData = [{
          id: new Date(),
          title: title,
          description: desc,
        }];
      }

      queryClient.setQueryData(['fetchData'], oldData);

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchData'] });
    },
    onError: (error,context) => {
      console.error('Error updating item:', error);
      queryClient.setQueryData(['fetchData'], context?.previousData);
    },
  });

  const updateItemData = ({ title, desc, id }: UpdateItemProps) => {
    if (title && desc) {
      update.mutate({ title, desc, id });
    } else {
      console.error('Please fill required fields');
    }
  };

  return { updateItemData };
};
