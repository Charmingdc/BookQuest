import { useState } from "react";

import TopBar from "@components/helper/Navigation/TopBar";
import SideBar from "@components/helper/Navigation/SideBar";
import Footer from "@components/helper/Navigation/Footer";
import "./index.css";


const Setting = () => {
 const [showActionModal, setShowActionModal] = useState<boolean>(false);
 const [selectedAction, setSelectedAction] = useState<string>('');
 const [preferredGenres, setPreferredGenres] = useState<string[]>([]);
 
 
 const handleSettingAction = (action: string) => {
  setSelectedAction(action);
  if (!showActionModal) setShowActionModal(true);
 }
 
 const handleSignout = () => {
  
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
     <ul className="actions-container">
      <li onClick={() => handleSettingAction('edit-theme')}>
       <span></span>
       <h3> Change Theme </h3>
      </li>
      
      <li onClick={() => handleSettingAction('edit-genres')}>
       <span></span>
       <h3> Preferred Genres </h3>
      </li>
      
      <li onClick={() => handleSettingAction('edit-genres')}>
       <span></span>
       <h3> Preferred Genres </h3>
      </li>
      
      <li onClick={handleSignout}>
       <span></span>
       <h3> Signout </h3>
      </li>
     </ul>
     
     
     { showActionModal && 
     <div className="current-action-modal-wrapper" onClick={() => setShowActionModal(false)}>
      <form>
       { selectedAction === 'edit-theme' && (
         <h3> Edit Theme </h3>
        )}
        
        
       { selectedAction === 'edit-genres' && (
         <h3> Set Preferred Genres </h3>
        )}
      </form>
     </div>}
    </section>
   </main>
   
   
   <footer>
    <Footer currentPage='setting' />
   </footer>
  </>
 )
}

export default Setting;