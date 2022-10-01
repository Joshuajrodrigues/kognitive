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
import { Trash } from "phosphor-react";
dayjs.extend(utc);
const History = () => {
  const user = useUser((state) => state.user);
  const [data, setData] = useState<CbtFormType[]>([]);
  const { toast } = useToast();
  const fetchUserData = async () => {
    await supabase
      .from("cbtForm")
      .select("*")
      .eq("user_id", user.id)
      .then((response) => {
        console.log("user data", { data });
        {/* @ts-ignore */ }
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
    <div className="history-page">
      <div className="history-table-container">
        <table>
          <thead>
            <tr>
              <th>Mood</th>
              <th>Created on</th>
              <th></th>
            </tr>
          </thead>
          {data?.map((item) => (
            <tr>
              <td>{item.feelBefore}</td>
              <td>
                {dayjs
                  .utc(item.created_at)
                  .local()
                  .format("MMM D, YYYY h:mm A")}
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
  );
};

export default History;
