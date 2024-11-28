import React, { useContext, useEffect, useState } from "react";
import AddEventModal from "./event componet/AddEvent";
import { FireContext } from "../../../Context/context";
import EditEventModal from "./event componet/EditEvent";

const EventPage = () => {
  const eventsData = [
    {
      id: 1,
      title: "Annual Science Fair",
      description: "A platform for students to showcase their scientific talents.",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Music Fest",
      description: "An evening filled with music and performances.",
      status: "Active",
    },
    {
      id: 3,
      title: "University Newsletter",
      description: "Latest updates and announcements from the university.",
      status: "News",
    },
  ];

  const totalEvents = eventsData.length;
  const upcomingEvents = eventsData.filter((event) => event.status === "Upcoming").length;
  const activeEvents = eventsData.filter((event) => event.status === "Active").length;

  //useState define here
  const [isOpen,setOpen] = useState(false);
  const [iseditOpen,setEditOpen] = useState(false);
  const [isloading,setLoading]=useState(false);
  const [events,setEvents]=useState([]);
  const [isEdit,setEdit]=useState({})
  const [onEdit,setOnEdit]=useState(false);
  const [onDelete,setOnDelete]=useState(false);
  const [add,eventAdd]=useState(false);

  // import method for context
  const {addEvent,GetEvents,deleteEvent,updateEvent}=useContext(FireContext);
  
  useEffect(()=>{
    setLoading(true);
    async function GetEvent() {
      try{
        let res=await GetEvents();
        let Events=res.docs.map((doc)=>({
                id: doc.id, // Include document ID
                ...doc.data() // Spread the document data
              }));
        // console.log(res.docs[0]);
        setEvents(Events);
        // console.log(Events);
        setLoading(false)
      }
      catch(error){
        console.log("some error occure ->",error)
      }
      finally{
        setLoading(false)
      }
    }
    GetEvent();
  },[onEdit,onDelete,add])
  
 
  const Edit = (eventData) => {
    if (!eventData || Object.keys(eventData).length === 0) {
      console.error("Invalid eventData:", eventData);
      return;
    }
    setEdit(eventData); // Set the event data
    setEditOpen(true); // Open the modal
  };
  
  const editClose = () => {
    setEditOpen(false);
    setEdit({});
  }

  const handleDelete= async(id) => {
    let res = await deleteEvent(id);
    if(res){setOnDelete(!onDelete)}
  }

  return (
    <div className="h-screen w-full mx-auto p-12 pt-0 overflow-y-auto">
      {/* model box */}
      <AddEventModal isOpen={isOpen} add={add} EventAdd={eventAdd} onClose={()=>setOpen(false)} onAddEvent={addEvent} />
      <EditEventModal isOpen={iseditOpen} onClose={()=>editClose()} edit={onEdit} onEdit={setOnEdit} eventData={isEdit} onSave={updateEvent} />
      {/* Cards Row */}
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 mb-6 rounded-lg mt-6">
        <h1 className="text-2xl font-bold text-gray-700">Admin - Events</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Card Component */}
        {[
          {
            title: "Total Events",
            count: totalEvents,
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2" />
              </svg>
            ),
          },
          {
            title: "Upcoming Events",
            count: upcomingEvents,
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2" />
              </svg>
            ),
          },
          {
            title: "Active Events",
            count: activeEvents,
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2" />
              </svg>
            ),
          },
          {
            title: "News",
            count: eventsData.filter((event) => event.status === "News").length,
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 1-2-2" />
              </svg>
            ),
          },
        ].map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">{card.title}</h2>
              <div className="p-3 bg-indigo-500 text-white rounded-full">{card.icon}</div>
            </div>
            <div className="mt-4 text-3xl font-bold text-indigo-600">{card.count}</div>
          </div>
        ))}
      </div>

      {/* Events Table */}
      <div className="bg-white shadow-md rounded-lg border border-gray-600/10 p-5">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-gray-700">Events</h2>
          <button onClick={()=>setOpen(true)} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
            + Add New Event
          </button>
        </div>
        <table className="table-auto w-full bg-white border-collapse">
          <thead>
            <tr className="bg-slate-500 text-white">
              <th className="border-b-2 py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                #
              </th>
              <th className="border-b-2 py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Title
              </th>
              <th className="border-b-2 py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Description
              </th>
              <th className="border-b-2 py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Status
              </th>
              <th colSpan={2} className="border-b-2 py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider">
                Controls
              </th>
            </tr>
          </thead>
          <tbody>
            {isloading?
          (Array(5)
          .fill(null)
          .map((e,index)=>(
            <tr key={index} className="bg-white animate-pulse">
            <td className="border-b py-3 px-6 text-sm text-gray-700">
              <div className="h-4 w-6 bg-gray-300 rounded"></div>
            </td>
            <td className="border-b py-3 px-6 text-sm text-gray-700">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </td>
            <td className="border-b py-3 px-6 text-sm text-gray-700">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </td>
            <td className="border-b py-3 px-6 text-sm text-gray-700">
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </td>
            <td className="border-b py-3 px-6 text-sm text-gray-700">
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </td>
            <td className="border-b py-3 px-6 text-sm text-gray-700">
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </td>
          </tr>
          ))
          ):<>
          {events.length>0?
            (events.map((event,index) => (
              <tr key={event.title+index+1} className="bg-white text-sm text-gray-700 hover:bg-gray-200 transition">
                <td className="border-b py-3 px-6">{index+1}</td>
                <td className="border-b py-3 px-6 capitalize text-nowrap">{event.title}</td>
                <td className="border-b py-3 px-6">{event.description}</td>
                <td className="border-b py-3 px-6">{event.status}</td>
                <td className="border-b py-3 px-6">
                  <button onClick={()=>Edit(event)} className="text-blue-500 flex gap-1 items-center hover:text-blue-700 mr-4">Edit
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3" viewBox="0 0 24 24">
                   	<rect width="24" height="24" fill="none" />
                   	<path fill="currentColor" d="M3 21V3h10.925l-2 2H5v14h14v-6.95l2-2V21zm6-6v-4.25L19.625.125L23.8 4.4L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z" />
                   </svg>
                  </button>
                </td>
                <td className="border-b py-3 px-6 text-sm text-gray-700">
                  <button onClick={()=>handleDelete(event.id)} className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            )))
            :<tr className="bg-white">
            <td colSpan="6" className="border-b text-center py-3 px-6 text-sm text-gray-700">
              currently don't have any event
            </td>
          </tr> }
          </>
          }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventPage;
