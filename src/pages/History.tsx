import {
  IconButton,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../helper/supabaseClient";
import { CbtFormType } from "../hooks/useCbtForm";
import useUser from "../hooks/useUser";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "../hooks/useToast";
import BackButton from "../components/BackButton";
import { appRoutes } from "../AppConstants";
import { Link } from "react-router-dom";
import { CaretDown, CaretLeft, Eye, Trash } from "phosphor-react";
import Drawer from "../components/Drawer";
import MoodGraph from "../components/MoodGraph";
import { SmartGoalFormType } from "../hooks/useSMARTForm";
import CbrDrawer from "../drawers/CbrDrawer";
import GoalsDrawer from "../drawers/GoalsDrawer";
import { WorryFormType } from "../hooks/useWorryForm";
import WorriesDrawer from "../drawers/WorriesDrawer";
import { StressFormType } from "../hooks/useManageStressForm";
import StressDrawer from "../drawers/StressDrawer";
import { ArgumentFormType } from "../hooks/useArgumentForm";
import ArgumentDrawer from "../drawers/ArgumentDrawer";



interface MoodTableType {
  [key: string]: number
}
export interface stateTypes extends CbtFormType, SmartGoalFormType, WorryFormType, StressFormType, ArgumentFormType { }
dayjs.extend(utc);
const History = () => {
  const user = useUser((state) => state.user);
  const [data, setData] = useState<stateTypes[]>([]);
  const [dataToView, setDataToView] = useState<stateTypes>();
  const [graphData, setGraphData] = useState<MoodTableType>({})
  const { toast } = useToast();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [currentTable, setCurrentTable] = useState("cbtForm")
  const handleViewDrawer = (bool: boolean) => {
    setIsDrawerVisible(bool);
  };
  const fetchUserData = async () => {
    await supabase
      .from(currentTable)
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then((response) => {
        console.log("user data", { data });
        {/* @ts-ignore */ }
        setData(response.data);
        const moodTableData = response.data?.map((item) => item.feelBefore); // [ "a","b","a"]
        {/* @ts-ignore */ }
        const graphData = moodTableData.reduce<MoodTableType>((total, value) => {  //[a:2,b:1]
          total[value] = (total[value] || 0) + 1;
          return total;
        }, {})
        setGraphData(graphData)
      });
  };
  const handleDelete = async (id?: string) => {
    try {
      await supabase
        .from(currentTable)
        .delete()
        .eq("id", id)
        .then(async () => {
          await fetchUserData();
          toast.success("Entry deleted.");
        });
    } catch (error) {
      toast.error("An error occured.");
    }
  };
  useEffect(() => {
    fetchUserData();

  }, [currentTable]);


  return (
    <>
      {
        currentTable === "cbtForm" &&
        <MoodGraph datasource={graphData} />
      }
      <Drawer
        onClose={() => handleViewDrawer(false)}
        showDrawer={isDrawerVisible}
      >
        {
          currentTable === "cbtForm" ?
            <CbrDrawer dataToView={dataToView} /> :
            currentTable === "SMARTGoals" ?
              <GoalsDrawer dataToView={dataToView} /> :
              currentTable === "worry" ?
                <WorriesDrawer dataToView={dataToView} /> :
                currentTable === "stressManagement" ?
                  <StressDrawer dataToView={dataToView} /> :
                  currentTable === "argument" &&
                  <ArgumentDrawer dataToView={dataToView} />
        }
      </Drawer>
      <div className="history-page">
        <div className="history-table-container">
          <table tabIndex={0}>
            <caption>
              <label className="custom-selector">
                Select to view table
                <select
                  style={{
                    marginLeft:"12px"
                  }}
                  value={currentTable}
                  onChange={(event) => setCurrentTable(event.target.value)
                  }
                  title="Table Select"
                  name="tableSelect"
                  id="tableSelect"
                >
                  <option value="cbtForm">Daily Checkins</option>
                  <option value="SMARTGoals">Goals</option>
                  <option value="argument">Arguments</option>
                  <option value="worry">Worries</option>
                  <option value="stressManagement">Stress Management</option>
                </select>
              </label>
            </caption>
            <thead>
              <tr>
                <th>{currentTable === 'cbtForm' ? "Mood" : ""}</th>
                <th></th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            {data?.map((item) => (
              <tr>
                <td>{item?.feelBefore}</td>
                <td>
                  <a
                    onClick={() => {
                      setDataToView(item);
                      handleViewDrawer(true);
                    }}
                  >
                    <Eye color="#805ad5" size={32} />
                  </a>
                </td>
                <td>
                  {dayjs.utc(item.created_at).local().format("MMM D, YYYY")}
                </td>
                <td>
                  <a onClick={() => handleDelete(item.id)}>
                    <Trash color="red" alt="Delete entry" size={32} />
                  </a>
                </td>
              </tr>
            ))}
          </table>
          <Link
            style={{ margin: "12px" }}
            className="outline-button"
            to={appRoutes.root}
          >
            Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default History;
