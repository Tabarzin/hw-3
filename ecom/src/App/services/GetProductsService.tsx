import axios from 'axios';
import * as React from 'react';

const GetProducts = () => {
  React.useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.escuelajs.co/api/v1/products',
      });

      console.log('result', result);
    };

    fetch();
  }, []);

  return <div>Fetching products...</div>
};

export default GetProducts;
