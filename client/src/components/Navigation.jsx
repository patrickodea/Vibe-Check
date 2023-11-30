import { useState } from "react";
import Header from "./Header";
import Browse from "../pages/Browse";
import Saved from "../pages/Saved";
import Playlists from "../pages/Playlists";
import Signup from "../pages/Signup";
import Donations from "../pages/Donations"

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  // Construct request middleware that will attach the JWT token to every request as an `authorization` header
  const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('id_token');
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });
    
    const client = new ApolloClient({
      // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

export default function Navigation() {
    const [currentPage, setCurrentPage] = useState("Signup");

    const renderPage = () => {

        if (currentPage === 'Donations') {
            return <Donations />
        }
        if (currentPage === 'Browse') {
            return <Browse />
        }
        if (currentPage === 'Playlists') {
            return <Playlists />
        }
        if (currentPage === 'Saved') {
            return <Saved />
        }
        if (currentPage === 'Signup') {
            return <Signup />
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <ApolloProvider client={client}>
        <div>
            <Header currentPage={currentPage} handlePageChange={handlePageChange} />
            <main>{renderPage()}</main>
        </div>
        </ApolloProvider>
    )

}