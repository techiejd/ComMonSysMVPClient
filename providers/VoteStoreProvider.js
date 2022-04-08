import React, { useContext, useState, useEffect } from "react";
import moment from "moment";

const VoteStoreContext = React.createContext();

const VoteStoreProvider = ({ children }) => {
  const [voteMessage, setVoteMessage] = useState({});
  const [vote, setVote] = useState(null);

  const message = {
    timestamp: moment.now(),
    community: "Poblado",
    message: "Muchas gracias por tu voto, juntos creamos comunidad",
    type: "community_message",
  };

  useEffect(() => {
    if (vote != null) {
      setVoteMessage(message);
    }
  }, [vote]);

  return (
    <VoteStoreContext.Provider value={{ setVote, voteMessage }}>
      {children}
    </VoteStoreContext.Provider>
  );
};

export default VoteStoreProvider;
export { VoteStoreContext };
