import React from "react";
import ApolloClientProvider from "./ApolloClientProvider";
import NormalUI from "./NormalUI";
import WithOptimisticUI from "./WithOptimisticUI";

function App() {
  return (
    <ApolloClientProvider>
      <main>
        <NormalUI />
        <WithOptimisticUI />
      </main>
    </ApolloClientProvider>
  );
}

export default App;
