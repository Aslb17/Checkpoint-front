import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const Continents: React.FC = () => {
  const [continents, setContinents] = useState<string[]>([]);

  useEffect(() => {
    const client = new ApolloClient({
      uri: "https://countries.nausicaa.wilders.dev/graphql",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query {
            continents {
              name
            }
          }
        `,
      })
      .then((result) => {
        const continentNames = result.data.continents.map(
          (continent: { name: string }) => continent.name
        );
        setContinents(continentNames);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  }, []);

  return (
    <div className="container text-center">
      <h2 className="text-align mt-5">Continents</h2>
      <div className="row row-cols-4 mt-5">
        {continents.map((continent, index) => (
          <div key={index} className="col mt-5 border">
            <Link to={`/continent/${continent}`}>{continent}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Continents;
