import { useContext, useEffect } from 'react';
import { UserContext } from '../context/context';
import { getPetById } from '../services/pets';

export default function usePetDetail({ id }) {
  const { petDetail, setPetDetail } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPetById(id);
        await setPetDetail(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
      }
    };
    fetchData();
  }, [id, setPetDetail]);

  return { petDetail, setPetDetail };
}
