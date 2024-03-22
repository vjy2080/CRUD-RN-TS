import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem } from '../query/ReactQuery';

interface AddItemProps {
  title: string;
  desc: string;
}

export const useAddItem = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationKey: ['addPost'],
    mutationFn: ({ title, desc }: AddItemProps) => createItem(title, desc),
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
    onError: (error, variables, context) => {
      console.log('eeeeeee', error);
      queryClient.setQueryData(['fetchData'], context?.previousData);
    },
  });

  const addItem = ({ title, desc }: AddItemProps) => {
    if (title && desc) {
      create.mutate({ title, desc });
    } else {
      console.error('Please fill required field');
    }
  };

  return { addItem, isLoading: create.isLoading };
};
