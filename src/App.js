import { Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Header from "./Components/Header";
import LoginPage from "./Pages/LoginPage";
import InfoPage from "./Pages/InfoPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  /* ================== Connect with the backend ================== */
  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (networkError || graphQLErrors) {
      console.log(`[Network error]: ${networkError}`);
      console.log(`[graphQ error]: ${graphQLErrors}`);
    }
  });

  const BASE_URL = "http://localhost:4000/graphql";
  const link = from([errorLink, new HttpLink({ uri: BASE_URL })]);
  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="borrowInfo" element={<InfoPage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p className="text-danger">404 Page not found</p>
              </main>
            }
          />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
