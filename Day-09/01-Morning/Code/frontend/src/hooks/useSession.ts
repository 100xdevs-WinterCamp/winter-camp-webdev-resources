// useSession

import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

async function fetchUser() {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                return null;
            }
        }
        throw error;
    }
}

export function useSession() {
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);

    const { data, isPending, error, isError, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user = await fetchUser();
            setUser(user);
            return user;
        },
        staleTime: Infinity,
        retry: false,
    });

    
    return { user, isPending, isError, error, refetch };
}