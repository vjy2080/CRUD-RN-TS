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
    onMutate: ({ title, desc, id }) => {
      let previousData: any[] = queryClient.getQueryData(['fetchData']) ?? [];
      let updatedData = [...previousData];
      console.log("oldData", updatedData);
    
      // Find the index of the item with the specified id
      const index = updatedData.findIndex(item => item.id === id);
    console.log("Current index",index);
    console.log("Current id",id);

    
      if (index !== -1) {
        // Update the existing item
        updatedData[index] = {
          ...updatedData[index],
          title: title,
          description: desc,
        };
      }
       else {
       console.log("Item does not exist");
      }
    
      queryClient.setQueryData(['fetchData'], updatedData);
    
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
