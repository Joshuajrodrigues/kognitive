import {
  IconButton,
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
import { Eye, Trash } from "phosphor-react";
import Drawer from "../components/Drawer";
dayjs.extend(utc);
const History = () => {
  const user = useUser((state) => state.user);
  const [data, setData] = useState<CbtFormType[]>([]);
  const [dataToView, setDataToView] = useState<CbtFormType>();
  const { toast } = useToast();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const handleViewDrawer = (bool: boolean) => {
    setIsDrawerVisible(bool);
  };
  const fetchUserData = async () => {
    await supabase
      .from("cbtForm")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at",{ascending:false})
      .then((response) => {
        console.log("user data", { data });
        {/* @ts-ignore */}
        setData(response.data);
      });
  };
  const handleDelete = async (id?: string) => {
    try {
      await supabase
        .from("cbtForm")
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
  }, []);
  return (
    <>
      <Drawer
        onClose={() => handleViewDrawer(false)}
        showDrawer={isDrawerVisible}
      >
        <div>
          <div>
           <u>Mood:</u>  {dataToView?.feelBefore}
          </div>
          <div>
           <u> Emotions:</u>  {dataToView?.emotions?.map((emotion)=>(
              <span className="tags">
                {emotion + ' '}
              </span>
            ))}
          </div>
          <div>
           <u> Elaboration:</u>  {dataToView?.elaboration}
          </div>
          {
            dataToView?.gratitudeThoughts &&
            <div>
            <u> Gratitude thoughts: </u>   {dataToView?.gratitudeThoughts}
            </div>
          }
          {
            dataToView?.negativeThoughts &&
            <div>
            <u> Negative thoughts:</u>  {dataToView?.negativeThoughts}
            </div>
          }
          {
            dataToView?.thoughtDistortions&&dataToView?.thoughtDistortions?.length > 0 &&
            <div>
             <u>Thought distortions: </u>   {dataToView?.thoughtDistortions?.map((distortion)=>(
                <span className="tags">
                  {distortion}
                </span>
              ))}
            </div>
          }
          
          {
            dataToView?.challengeNegative &&
            <div>
            <u> Challenge Negatives:</u> {dataToView?.challengeNegative}
            </div>
          }
          {
            dataToView?.reinterpretNegative &&
            <div>
            <u> Reinterpreting Negative:</u>   {dataToView?.reinterpretNegative}
            </div>
          }
        </div>
      </Drawer>
      <div className="history-page">
        <div className="history-table-container">
          <table tabIndex={0}>
            <caption>Daily Checkins</caption>
            <thead>
              <tr>
                <th>Mood</th>
                <th></th>
                <th>Created on</th>
                <th></th>
              </tr>
            </thead>
            {data?.map((item) => (
              <tr>
                <td>{item.feelBefore}</td>
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
