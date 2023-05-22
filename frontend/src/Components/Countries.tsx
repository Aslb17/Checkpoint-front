import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface Country {
  name: string;
  emoji: string;
}

const Countries: React.FC = () => {
  const { continentCode } = useParams<{ continentCode: string }>();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const client = new ApolloClient({
      uri: "https://countries.nausicaa.wilders.dev/graphql",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query GetCountriesByContinent($continentCode: ID!) {
            continent(code: $continentCode) {
              countries {
                name
                emoji
              }
            }
          }
        `,
        variables: { continentCode },
      })
      .then((result) => {
        const continent = result.data.continent;
        if (continent) {
          setCountries(continent.countries);
        }
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  }, [continentCode]);

  return (
    <div className="container text-center">
      <h2 className="text-align mt-5">Countries</h2>
      <div className="row row-cols-4 mt-5">
        {countries.map((country, index) => (
          <div key={index} className="col mt-5 border">
            <span role="img" aria-label={country.name}>
              {country.emoji}
            </span>
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
