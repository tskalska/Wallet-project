import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../Chart/Chart";
import Table from "../Table";
import Loader from "../Loader/Loader";
import "../../css/main.min.css";
import { isLoading, error } from "../../redux/statistics/statisticsSelectors";
import getStatistics from "../../redux/statistics/statisticsOperation";

function DiagramTab() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { expenses = {}, income = {} } = useSelector(
    (state) => state.statistics.data
  );
  const loading = useSelector(isLoading);
  const errorStat = useSelector(error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getStatistics({
        month: selectedMonth,
        year: selectedYear,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear]);

  return (
    <div className="diagram">
      <p className="title">Статистика</p>
      {expenses.year ? (
        <div className="diagramTab">
          <Chart chartData={expenses} />
          <Table
            valueMonth={selectedMonth}
            valueYear={selectedYear}
            selectedMonth={setSelectedMonth}
            selectedYear={setSelectedYear}
            expenses={expenses}
            income={income}
          />
        </div>
      ) : (
          <div className="diagramTab">
            <div className="fakeChart"></div>
            <Table
              valueMonth={selectedMonth}
              valueYear={selectedYear}
              selectedMonth={setSelectedMonth}
              selectedYear={setSelectedYear}
              expenses={null}
              income={null}
            />
        </div>
        /*<h3>У вас нет транзакций за выбранный период</h3>*/
      )}
      {loading && <Loader />}
      {errorStat && <p>OOPS! Failled!</p>}
    </div>
  );
}

export default DiagramTab;
