import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

interface Country {
  name: string;
  capital: string;
  population: number;
}

const Countries: React.FC = () => {
  const { continentName } = useParams<{ continentName: string }>();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const client = new ApolloClient({
      uri: 'https://countries.nausicaa.wilders.dev/graphql',
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query($continent: String!) {
            continent(name: $continent) {
              countries {
                name
                capital
                population
              }
            }
          }
        `,
        variables: {
          continent: continentName,
        },
      })
      .then((result) => {
        const continent = result.data.continent;
        if (continent) {
          setCountries(continent.countries);
        }
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite :', error);
      });
  }, [continentName]);

  return (
    <div>
      <h2>Pays du continent {continentName}</h2>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            {country.name} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
