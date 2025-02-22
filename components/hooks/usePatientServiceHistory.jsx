import { useState, useEffect } from 'react';
import { getPatientServiceHistory } from '@/api/service_api';

const usePatientServiceHistory = (token, page = 1, filters = {}) => {
  const [serviceHistory, setServiceHistory] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPatientServiceHistory();
        setServiceHistory(data.results);
        setCount(data.count);
        setNext(data.next);
        setPrevious(data.previous);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchServiceHistory();
  }, [token, page, filters]);

  return { serviceHistory, count, next, previous, loading, error };
};

export default usePatientServiceHistory;