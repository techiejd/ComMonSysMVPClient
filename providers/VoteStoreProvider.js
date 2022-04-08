import React, { useContext, useState, useEffect } from "react";

const VoteStoreContext = React.createContext();

const VoteStoreProvider = ({ children }) => {
  const [voteMessage, setVoteMessage] = useState("");
  const [voteFlag, setvoteFlag] = useState(false);

  const voting = () => {
    setvoteFlag(true);
  };

  const message = "Muchas gracias por tu voto, juntos creamos comunidad";
  if (voteFlag) setTimeout(setVoteMessage(message), 5000);

  return (
    <VoteStoreContext.Provider value={{ voting, voteMessage }}>
      {children}
    </VoteStoreContext.Provider>
  );
};
export default VoteStoreProvider;
export { VoteStoreContext };
