import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./useAuthStore";

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
        toast.error(error.response.data.message || "Something went wrong");
      }finally{
        set({isMessageLoading:false});
      }
    },

    sendMessage: async(messageData) =>{
      const {selectedUser} = get();
    const {authUser}=  useAuthStore.getState();
    const tempId = `temp-${Date.now()}`

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,

    };
    //immediately update the ui by adding the message
   set({messages: [...get().messages, optimisticMessage] });


      try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
        set({messages:get().messages.map(msg => msg._id === tempId ? res.data : msg)})
      } catch (error) {
        //removing the optimistic message on failure
        set({messages: get().messages.filter(msg => msg._id !== tempId)})
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },

}))
