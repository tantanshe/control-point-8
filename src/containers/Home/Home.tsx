import React, {useCallback, useEffect, useState} from 'react';
import {Quote} from '../../types';
import {ApiQuote} from '../../types';
import axiosApi from '../../axiosApi';
import {Link} from 'react-router-dom';

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const fetchQuotes = useCallback(async () => {
    const response = await axiosApi<ApiQuote | null>('quotes.json');
    const quotesResponse = response.data;

    if (quotesResponse !== null) {
      const quotes: Quote[] = Object.keys(quotesResponse).map((id: string) => {
        return {
          ...quotesResponse[id],
          id,
        };
      });

      setQuotes(quotes.reverse());
    } else {
      setQuotes([]);
    }
  }, []);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

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