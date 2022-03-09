import React from "react";
import ApolloClientProvider from "./ApolloClientProvider";
import WithoutOptimisticUI from "./WithoutOptimistic";
import WithOptimisticUI from "./WithOptimistic";

function App() {
  return (
    <ApolloClientProvider>
      <main>
        <WithoutOptimisticUI />
        <WithOptimisticUI />
      </main>
    </ApolloClientProvider>
  );
}

export default App;
