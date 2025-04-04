import { useState, useEffect } from "react";
import { toast } from "sonner";
import useUserActions from "@hooks/user/useUserActions.tsx";

import TopBar from "@components/helper/Navigation/TopBar";
import SideBar from "@components/helper/Navigation/SideBar";
import Footer from "@components/helper/Navigation/Footer";
import "./index.css";


const Setting = () => {
 const [showActionModal, setShowActionModal] = useState<boolean>(false);
 const [selectedAction, setSelectedAction] = useState<string>('');
 const [newUsername, setNewUsername] = useState<string>('');
 const [preferredGenres, setPreferredGenres] = useState<string[]>([]);
 
 const { changeUsername, signoutUser, updatePreferredGenres, currentUsername, saving } = useUserActions();
 
 
 
 const handleSettingAction = (action: string) => {
  setSelectedAction(action);
  if (!showActionModal) setShowActionModal(true);
 }
 
 
 const performUserAction = async (e: React.FormEvent, actionType: string) => {
  e.preventDefault();
  
  try {
   if (actionType === 'change-username') {
    const response = await changeUsername(newUsername);
    
    if (response.type === 'error') throw new Error(response.message);
    
    toast.success(`${response.message} to '${newUsername}'`);
   }
   
   
   if (actionType === 'signout') {
    const response = await signoutUser();
    if (response.type === 'error') throw new Error(response.message);
   }
   
   setShowActionModal(false);
  } catch (err: any) {
   toast.error(err.message);
  } finally {
   setNewUsername('');
   setPreferredGenres([]);
  }
 }
 
 return (
  <>
   <header>
    <TopBar pageTitle='User Settings' />
   </header>
  
   <main>
    <aside>
     <SideBar currentPage='setting' />
    </aside>
    
   
    <section className="edit-section">
     <div className="setting-username">
      <h3>
        Welcome back: { currentUsername }
      </h3>
     </div >
     
     <ul className="actions-container">
       <li onClick={() => handleSettingAction('edit-username')}>
         <span></span>
         <h3> Edit Username </h3>
       </li>
      
       <li onClick={() => handleSettingAction('edit-genres')}>
         <span></span>
         <h3> Preferred Genres </h3>
       </li>
      
       <li onClick={() => handleSettingAction('signout')}>
         <span></span>
         <h3> Signout </h3>
       </li>
     </ul>
     
     
     { showActionModal && 
      <>
       <div className="current-action-modal-wrapper" onClick={() => setShowActionModal(false)}>
         { /** div to enable outter box click closing of modal **/ }
       </div>
     
        <form>
         {selectedAction === 'edit-username' && (
           <>
            <h2> Edit Username </h2>
            <p>
             Type your preferred username in the input below
             </p>
           
             <input
              type='text'
              value={newUsername}
              placeholder='Enter your preferred username'
              onChange={(e) => setNewUsername(e.target.value)} 
               className="new-username-input" />
             
             <button className="save-username-btn" onClick={(e) => performUserAction(e, 'change-username')}>
               { saving ? 'Saving...' : 'Save Changes' }
             </button>
           </>
          )}
        
        
         {selectedAction === 'edit-genres' && (
           <h2> Set Preferred Genres </h2>
          )}
        
        
         {selectedAction === 'signout' && (
          <>
           <h2> Signout </h2>
           <p>
            Are you sure you want to signout of your account?
           </p>
         
           <div className="signout-buttons flex-start">
            <button onClick={(e) => performUserAction(e, 'signout')}>
               Yes, Signout
            </button>
            <button onClick={() => setShowActionModal(false)}>
              Nope, it was a mistake
            </button>
           </div>
          </>
        )}
       </form>
      </>}
    </section>
   </main>
   
   
   <footer>
    <Footer currentPage='setting' />
   </footer>
  </>
 )
}

export default Setting;