import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaSquareMinus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { CgNotes } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import useUserActions from "@hooks/user/useUserActions.tsx";

import TopBar from "@components/helper/Navigation/TopBar";
import SideBar from "@components/helper/Navigation/SideBar";
import Footer from "@components/helper/Navigation/Footer";
import "./index.css";

const Setting = () => {
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newGenre, setNewGenre] = useState<string>('');

  const [extractedDpName, setExtractedDpName] = useState<string>('');
  const { changeUsername, signoutUser, updatePreferredGenres, removePreferredGenre, currentUsername, preferredGenres, saving } = useUserActions();

  useEffect(() => {
    setExtractedDpName(currentUsername.slice(0, 2));
  }, [currentUsername]);

  const handleSettingAction = (action: string) => {
    setSelectedAction(action);
    if (!showActionModal) setShowActionModal(true);
  };

  const handleGenreRemoval = async (genreToRemove: string) => {
    try {
     const response = await removePreferredGenre(genreToRemove);

     if (response.type === 'error') throw new Error(response.message);

     toast.success(`${response.message}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const performUserAction = async (e: React.FormEvent, actionType: string) => {
    e.preventDefault();

    try {
     if (actionType === 'change-username') {
      const response = await changeUsername(newUsername);

      if (response.type === 'error') throw new Error(response.message);

      toast.success(`${response.message} to '${newUsername}'`);
      }

      if (actionType === 'update-genres') {
       const response = await updatePreferredGenres(newGenre);

       if (response.type === 'error') throw new Error(response.message);

       toast.success(`${response.message}`);
      }

      if (actionType === 'signout') {
       const response = await signoutUser();
       if (response.type === 'error') throw new Error(response.message);
      }

      if (!actionType === 'update-genres')setShowActionModal(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setNewUsername('');
      setNewGenre('');
    }
  };

  return (
    <>
     <header>
      <TopBar pageTitle="User Settings" />
     </header>

     <main>
      <aside>
        <SideBar currentPage="setting" />
      </aside>

      <section className="edit-section">
        <div className="setting-user-modal">
          <h4> Welcome back, Chapter Chaser! ✨ </h4>

          <div>
           <div className="dp flex-center">
            <h2> {extractedDpName} </h2>
           </div>

           <h3>{currentUsername}</h3>
          </div>
        </div>

        <ul className="actions-container">
         <li onClick={() => handleSettingAction('edit-username')}>
          <span>
           <CiEdit size={22} />
          </span>
          <h3>Edit Username</h3>
         </li>

         <li onClick={() => handleSettingAction('edit-genres')}>
           <span>
            <CgNotes size={22} />
           </span>
           <h3>Preferred Genres</h3>
         </li>

         <li onClick={() => handleSettingAction('signout')}>
           <span>
            <IoIosLogOut size={26} />
           </span>
           <h3>Signout</h3>
         </li>
       </ul>

       {showActionModal && (
        <>
         <div
          className="current-action-modal-wrapper"
          onClick={() => setShowActionModal(false)}>
           {/* div to enable outer box click closing of modal */}
         </div>

         <form>
          {selectedAction === 'edit-username' && (
            <>
             <h2>Edit Username</h2>
             <p>Type your preferred username in the input below</p>

              <input
               type="text"
               value={newUsername}
               placeholder="Enter your preferred username"
               onChange={(e) => setNewUsername(e.target.value)}
               className="new-data-input"  />

             <button
              className={`${saving ? "disabled-btn" : "save-data-btn"}`}
              onClick={(e) => performUserAction(e, 'change-username')}
              disabled={saving}>
               {saving ? 'Syncing...' : 'Sync Changes'}
            </button>
           </>
          )}

          {selectedAction === 'edit-genres' && (
           <>
            <h2>Set Preferred Genres</h2>
            <p>Type new interested genre in the input below</p>

            <div className="setting-genres">
             {preferredGenres.length > 0 && (preferredGenres.map((preferredGenre, i) => (
               <div key={i}>
                <p>{preferredGenre}</p>

                <button type="button" onClick={() => handleGenreRemoval(preferredGenre)}>
                  <FaSquareMinus size={18} />
                </button>
               </div>))
              )}
             </div>

             <input
              type="text"
              value={newGenre}
              placeholder="Add a new genre"
              onChange={(e) => setNewGenre(e.target.value)}
              className="new-data-input"
                    />

            <button
             className={`${saving ? "disabled-btn" : "save-data-btn"}`}
             onClick={(e) => performUserAction(e, 'update-genres')}
             disabled={saving}>
               {saving ? 'Updating...' : 'Sync Changes'}
            </button>
           </>
          )}

          {selectedAction === 'signout' && (
            <>
             <h2>Signout</h2>
             <p>Are you sure you want to signout of your account?</p>

             <div className="signout-buttons flex-start">
              <button onClick={(e) => performUserAction(e, 'signout')}>
                 Yes, Signout
              </button>

              <button onClick={() => setShowActionModal(false)}>
                Nope, it was a mistake
              </button>
             </div>
           </>)}
         </form>
        </>
       )}
      </section>
    </main>

    <footer>
      <Footer currentPage="setting" />
    </footer>
  </>
 );
};

export default Setting;