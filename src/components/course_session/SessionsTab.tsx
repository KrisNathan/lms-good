import { useState } from "react"
import HorizontalTab from "../tab/HorizontalTab"
import AttendCard from "./AttendCard"

export default function SessionsTab() {
  const [activeTab, setActiveTab] = useState('Session 1');
  return <>
    <HorizontalTab tabs={['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5', 'Session 6', 'Session 7', 'Session 8', 'Session 9', 'Session 10', 'Session 11', 'Session 12', 'Session 13', 'Session 14', 'Session 15', 'Session 16', 'Session 17', 'Session 18', 'Session 19', 'Session 20', 'Session 21', 'Session 22', 'Session 23', 'Session 24']} activeTab={activeTab} setActiveTab={setActiveTab} />
    <AttendCard />
  </>
}