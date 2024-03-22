import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem } from '../query/ReactQuery';

interface DeleteItemProps {
    id: number;
    previousData?: any[];
}

export const useDeleteItem = () => {
    const queryClient = useQueryClient();

    const deleteTodo = useMutation({
        mutationKey: ['updatePost'],
        mutationFn: ({ id }: DeleteItemProps) => deleteItem(id),
        // onMutate: ({ title, desc }) => {
        //   let previousData: any[] = queryClient.getQueryData(['fetchData']) ?? [];
        //   let oldData = [...previousData];
        //   console.log("oldData", oldData);
        //   if (oldData.length > 0) {
        //     oldData.push({
        //       id: new Date(),
        //       title: title,
        //       description: desc,
        //     });
        //   } else {
        //     oldData = [{
        //       id: new Date(),
        //       title: title,
        //       description: desc,
        //     }];
        //   }

        //   queryClient.setQueryData(['fetchData'], oldData);

        //   return { previousData };
        // },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchData'] });
        },
        onError: (error, context) => {
            console.error('Error updating item:', error);
            queryClient.setQueryData(['fetchData'], context?.previousData);
        },
    });

    const deleteItemData = ({ id }: DeleteItemProps) => {
        if (id) {
            deleteTodo.mutate({ id });
        } else {
            console.error('Please fill required fields');
        }
    };

    return { deleteItemData };
};
