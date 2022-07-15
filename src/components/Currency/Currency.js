import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import '../../css/main.min.css';

function Currency() {
  const [currency, setCurrency] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('ERROR'));
      })
      .then(data => {
        const currency = data.filter(item => item.ccy !== 'RUR');
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
            <th className="tableCurrencyHeadItem tableItemLeft">Валюта</th>
            <th className="tableCurrencyHeadItem">Покупка</th>
            <th className="tableCurrencyHeadItem tableItemRight">Продажа</th>
          </tr>
        </thead>

        <tbody className="tableCurrencyBody">
          {currency.map(item => (
            <tr key={item.ccy}>
              <td className="tableCurrencyItemLeft ">{item.ccy}</td>
              <td className="tableCurrencyItemCenter">
                {Math.round(parseFloat(item.buy) * 100) / 100}
              </td>
              <td className="tableCurrencyItemRight">
                {Math.round(parseFloat(item.sale) * 100) / 100}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Currency;
