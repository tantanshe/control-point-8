import React, {useCallback, useEffect, useState} from 'react';
import {ApiQuote, categories, Quote} from '../../types';
import axiosApi from '../../axiosApi';
import {Link, useParams} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {id} = useParams();

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    try {
      let response;
      if (id) {
        response = await axiosApi.get<ApiQuote | null>(`quotes.json?orderBy="category"&equalTo="${id}"`);
        const category = categories.find(c => c.id === id);
        if (category) {
          setCategoryName(category.title);
        }
      } else {
        response = await axiosApi.get<ApiQuote | null>('quotes.json');
        setCategoryName('All Quotes');
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
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes, id]);

  const deleteQuote = async (id: string) => {
    setIsLoading(true);
    try {
      await axiosApi.delete(`quotes/${id}.json`);
      const updatedQuotes = quotes.filter(quote => quote.id !== id);
      setQuotes(updatedQuotes);
    } catch (error) {
      console.error('Error deleting quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      {isLoading && (<Spinner/>)}
      {!isLoading && (
        <div>
          <h2>{categoryName}</h2>
          {(quotes.length === 0 && !isLoading) && (
            <h5>There are no quotes yet</h5>
          )}
          {quotes.map(quote => (
            <div className="card mb-3 mt-3" key={quote.id}>
              <div className="card-body">
                <h5 className="card-title">{quote.author}</h5>
                <p className="card-text">{quote.text}</p>
                <Link to={`/quotes/${quote.id}/edit`} className="btn btn-primary">Edit</Link>
                <button onClick={() => deleteQuote(quote.id as string)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>)}
    </div>
  );
};

export default Home;