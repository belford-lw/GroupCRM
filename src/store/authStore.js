import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  setToken: (token) => set({ accessToken: token }),
  
  logout: () => {
    set({ accessToken: null });
    window.localStorage.clear();
    window.location.href = "/login";
    window.location.reload();
    window.location.href = "/"
  },
}));

export default useAuthStore;
          //asdfsadf