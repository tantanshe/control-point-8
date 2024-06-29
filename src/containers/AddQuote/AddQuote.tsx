import React, {useCallback, useEffect, useState} from 'react';
import {ApiQuote, Quote} from '../../types';
import {categories} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';

const initialState = {
  category: '',
  author: '',
  text: '',
};

const AddQuote = () => {
  const {id} = useParams<{ id: string }>();
  const [quote, setQuote] = useState<Quote>(initialState);
  const navigate = useNavigate();

  const fetchOneQuote = useCallback(async (id: string) => {
    const response = await axiosApi.get<ApiQuote | null>(`quotes/${id}.json`);
    if (response.data) {
      setQuote(response.data);
    }
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      void fetchOneQuote(id);
    } else {
      setQuote(initialState);
    }
  }, [id, fetchOneQuote]);


  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setQuote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote: Quote = {
      category: quote.category,
      author: quote.author,
      text: quote.text,
    };

    try {
      if (id !== undefined) {
        await axiosApi.put(`/quotes/${id}.json`, newQuote);
      } else {
        await axiosApi.post('/quotes.json', newQuote);
      }
    } finally {
      navigate('/');
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <form onSubmit={onFormSubmit}>
          <h2>{id ? 'Edit the quote' : 'Add a new quote'}</h2>
          <div className="form-group mt-2">
            <label className="mb-2" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={quote.category}
              onChange={onFieldChange}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <label className="mb-2" htmlFor="author">Author</label>
            <input
              id="author"
              type="text"
              name="author"
              className="form-control"
              value={quote.author}
              onChange={onFieldChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label className="mb-2" htmlFor="text">Quote text</label>
            <textarea
              id="text"
              name="text"
              className="form-control"
              value={quote.text}
              onChange={onFieldChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {id ? 'Save changes' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuote;