import { useEffect, useState } from "react";
import Imagelibrary from "./imageLibrary/Imagelibrary";
import Mealmenu from "@/components/mealMenu/Mealmenu";
import Announcement from "@/components/announcement/Announcement";
import Honoree from "./honoree/Honoree";
import Fanpage from "./fanpage/Fanpage";
import axios from "axios";

export default function Rightmenu() {
  const [student, setStudent] = useState([])
  const [notification, setNotification] = useState([])
  const [document, setDocument] = useState([])

  useEffect(() => {
    //thành tích học sinh
    const getHonoree = async () => {
      const res = await axios.get(`/api/post/by-category-name`, {
        params: {
          name: "Thành tích học sinh",
          limit: 1
        }
      })
      if (res.status == 200) {
        setStudent(res?.data?.data)
      }
    }
    //văn bản - thông báo
    const getNotification = async () => {
      const res = await axios.get(`/api/post/notification`)
      if (res.status == 200) {
        setNotification(res?.data?.data)
      }
    }
    //các văn bản
    const getDocument = async () => {
      const res = await axios.get(`/api/post/by-category-name`, {
        params: {
          name: "Các văn bản",
          limit: 4
        }
      })
      if (res.status == 200) {
        setDocument(res?.data?.data)
      }
    }
    getDocument()
    getNotification()
    getHonoree()
  }, [])
  return (
    <div className="h-full">
      <div className="w-full h-full flex flex-col">
        <Honoree data={student[0]}></Honoree>
        <Imagelibrary></Imagelibrary>
        <Announcement
          announcementData={notification}
          title={`Văn Bản - Thông Báo`}
        ></Announcement>
        <Mealmenu></Mealmenu>
        <Announcement
          announcementData={document}
          title={`Các Văn Bản`}
        ></Announcement>
        {/* <Fanpage></Fanpage> */}
      </div>
    </div>
  );
}
