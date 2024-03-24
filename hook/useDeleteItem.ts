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
        onMutate: (data) => {
            queryClient.cancelQueries({queryKey: ['fetchData']})
            let previousData: any[] = queryClient.getQueryData(['fetchData']) ?? [];
            let oldData = [...previousData];
            console.log("oldData", oldData);
            console.log("id to be delated", data);
            
            // Filter out the item with the specified id
            let updatedData = oldData.filter(item => item.id !== data.id);

            
            console.log("updatedData", updatedData.length);
          
            queryClient.setQueryData(['fetchData'], updatedData);
          
            return { previousData };
          },
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
