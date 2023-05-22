import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface Country {
  name: string;
  emoji: string;
  capital: string;
  currency: string;
}

const Country: React.FC = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const client = new ApolloClient({
      uri: "https://countries.nausicaa.wilders.dev/graphql",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query GetCountryByCode($countryCode: ID!) {
            country(code: $countryCode) {
              name
              emoji
              capital
              currency
            }
          }
        `,
        variables: { countryCode },
      })
      .then((result) => {
        const countryData = result.data.country;
        if (countryData) {
          setCountry(countryData);
        }
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  }, [countryCode]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-center">
      <h2 className="text-align mt-5">{country.name}</h2>
      <div className="mt-5">
        <span role="img" aria-label={country.name}>
          {country.emoji}
        </span>
      </div>
      <p className="mt-3">
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Currency:</strong> {country.currency}
      </p>
    </div>
  );
};

export default Country;
