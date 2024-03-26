import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem } from '../query/ReactQuery';

interface AddItemProps {
  title: string;
  description: string;
}

export const useAddItem = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationKey: ['addPost'],
    mutationFn: (data: AddItemProps) => createItem(data),
    onMutate: (data) => {
      let previousData: any[] = queryClient.getQueryData(['fetchData']) ?? [];
      let oldData = [...previousData];
      console.log("oldData", oldData);
      if (oldData.length > 0) {
        oldData.push(data);
      } else {
        oldData = [data];
      }

      queryClient.setQueryData(['fetchData'], oldData);

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchData'] });
    },
    onError: (error, variables, context) => {
      console.log('Error', error);
      queryClient.setQueryData(['fetchData'], context?.previousData);
    },
  });

  const addItem = ( data : AddItemProps) => {
    if (data) {
      create.mutate( data );
    } else {
      console.error('Please fill required field');
    }
  };

  return { addItem };
};
