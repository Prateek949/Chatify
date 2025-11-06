import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set,get)=>({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading:false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  
    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({isSoundEnabled: !get().isSoundEnabled})
    },

    setActiveTab: (tab) => set({activeTab:tab}),
    setSelectedUser: (selectedUser) => set({selectedUser}),


    getAllContact: async () => {
    set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
          const errorMessage = error?.response?.data?.message || "Failed to fetch contacts.";
          toast.error(errorMessage);
          console.error("Error fetching contacts:", error); 
        } finally {
             set({ isUserLoading: false });
     }
    },
    getMyChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to fetch chats.";
      toast.error(errorMessage);
       console.error("Error fetching chat partners:", error); 
    } finally {
      set({ isUserLoading: false });
    }
    },
    getMessagesByUserId: async (userId)=> {
      set({ isMessageLoading : true})
      try {
        const res= await axiosInstance.get(`/messages/${userId}`);
        set({messages: res.data });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }finally{
        set({isMessageLoading:false});
      }
    },
}))
