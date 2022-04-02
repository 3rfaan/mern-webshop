import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <h1 className="featuredTitle">Einkommen</h1>
        <div className="featuredMoneyContainer">
          <p className="featuredMoney">${income[0]?.total}</p>
          <span className="featuredMoneyRate">
            {Math.floor(perc)}%{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <p className="featuredSubTitle">Im Vergleich zum letzten Monat</p>
      </div>
      <div className="featuredItem">
        <h1 className="featuredTitle">Verkäufe</h1>
        <div className="featuredMoneyContainer">
          <p className="featuredMoney">$4,415</p>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <p className="featuredSubTitle">Im Vergleich zum letzten Monat</p>
      </div>
      <div className="featuredItem">
        <h1 className="featuredTitle">Kosten</h1>
        <div className="featuredMoneyContainer">
          <p className="featuredMoney">$2,405</p>
          <span className="featuredMoneyRate">
            +2.23 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <p className="featuredSubTitle">Im Vergleich zum letzten Monat</p>
      </div>
    </div>
  );
}
