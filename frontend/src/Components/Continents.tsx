import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Link } from "react-router-dom";

interface Continent {
  code: string;
  name: string;
}
const Continents: React.FC = () => {
  const [continents, setContinents] = useState<Continent[]>([]);

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
              code
              name
            }
          }
        `,
      })
      .then((result) => {
        const fetchedContinents = result.data.continents;
        setContinents(fetchedContinents);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  }, []);

  return (
    <div className="container text-center">
      <h2 className="text-align mt-5">Continents</h2>
      <div className="row row-cols-4 mt-5">
        {continents.map((continent) => (
          <div key={continent.code} className="col mt-5 border">
            <Link to={`/continent/${continent.code}`}>{continent.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Continents;
