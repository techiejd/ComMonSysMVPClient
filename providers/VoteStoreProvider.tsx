import React, { useContext, useState, useEffect } from "react";

// TODO(techiejd): look into removing this vote store provider.
interface IVoteStoreContext {
  vote: number | undefined;
  setVote: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const VoteStoreContext = React.createContext<IVoteStoreContext | undefined>(
  undefined
);

const VoteStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vote, setVote] = useState<number | undefined>(undefined); // 0 || 1 || 2 hardcoding three options only ;).

  return (
    <VoteStoreContext.Provider value={{ vote, setVote }}>
      {children}
    </VoteStoreContext.Provider>
  );
};

export default VoteStoreProvider;
export { VoteStoreContext, IVoteStoreContext };
