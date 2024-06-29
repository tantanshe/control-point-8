import React, {useCallback, useEffect, useState} from 'react';
import {ApiQuote, Quote} from '../../types';
import axiosApi from '../../axiosApi';
import {Link, useParams} from 'react-router-dom';

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const {id} = useParams();

  const fetchQuotes = useCallback(async () => {
    try {
      let response;
      if (id) {
        response = await axiosApi.get<ApiQuote | null>(`quotes.json?orderBy="category"&equalTo="${id}"`);
      } else {
        response = await axiosApi.get<ApiQuote | null>('quotes.json');
      }

      const quotesResponse = response.data;

      if (quotesResponse) {
        const quotesList: Quote[] = Object.keys(quotesResponse).map((id: string) => ({
          ...quotesResponse[id],
          id,
        }));

        setQuotes(quotesList.reverse());
      } else {
        setQuotes([]);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setQuotes([]);
    }
  }, [id]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes, id]);

  return (
    <div>
      {quotes.length === 0 && (
        <h2>There are no quotes yet</h2>
      )}
      {quotes.map(quote => (
        <div className="card mb-3 mt-3" key={quote.id}>
          <div className="card-body">
            <h5 className="card-title">{quote.author}</h5>
            <p className="card-text">{quote.text}</p>
            <Link to={`/quotes/${quote.id}/edit`} className="btn btn-primary">Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;