import { useEffect } from 'react';
import {useChatStore} from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import UsersLoadingSkeleton from './UserLoadingSkeleton';

function ContactList() {
  const { getAllContact, allContacts , isUserLoading, setSelectedUser }= useChatStore();
  const { onlineUsers } = useAuthStore();


  useEffect(() =>{
    getAllContact()
  },[getAllContact]);
  if(isUserLoading){return <UsersLoadingSkeleton/>}

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/**todo:FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ContactList;