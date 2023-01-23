import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import '../../css/main.min.css';

function Currency() {
  const [currency, setCurrency] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    // fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    fetch('http://api.nbp.pl/api/exchangerates/tables/c/today')

      .then(response => {
        // console.log (response.ok);
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('ERROR'));
      })
      .then(data => {
        const c = data[0].rates;
        // const currency = data[0].rate.filter(item => item.code === 'USD'||item.code === 'EUR'||item.code === 'GBP');
        const currency = c.filter(item => ['USD', 'EUR', 'GBP'].includes(item.code));
        setCurrency(currency);
        setLoad(false);
      });
  }, []);

  return (
    <div className="tableCurrencyContainer">
      {load && <Loader color="#fff" size="40" />}
      <table className="tableCurrency">
        <thead className="tableCurrencyHead">
          <tr>
            <th className="tableCurrencyHeadItem tableItemLeft">Сurrency</th>
            <th className="tableCurrencyHeadItem">Buy</th>
            <th className="tableCurrencyHeadItem tableItemRight">Sell</th>
          </tr>
        </thead>

        <tbody className="tableCurrencyBody"> 
          {currency.map(item => (
            <tr key={item.code}>
              <td className="tableCurrencyItemLeft ">{item.code}</td>
              <td className="tableCurrencyItemCenter">
                {/* {item.bid} */}
                {Math.round(parseFloat(item.bid) * 100) / 100}
              </td>
              <td className="tableCurrencyItemRight">
                {Math.round(parseFloat(item.ask) * 100) / 100}
                {/* {item.ask} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Currency;
