import { createContext, useState } from "react";
export const DoctorContext = createContext();
import { toast } from "react-toastify";
import axios from "axios";

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken,setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "");
    const [appointments, setAppointments] = useState([]);

    const getAllAppointments = async () => {
       try {
        const {data} = await axios.get(backendUrl + "/api/doctor/appointments", {headers:{dToken}});
        if(data.success) {
            setAppointments(data.appointments);
            console.log(data.appointments)
        } else {
            toast.error(data.message);
        }
       } catch (error) {
        console.log(error);
        toast.error(error.message)
       } 
    }

    const completeAppointment = async(appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl+"/api/doctor/appointment-complete",{appointmentId}, {headers:{dToken}})
            if(data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const cancelAppointment = async(appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl+"/api/doctor/appointment-cancel",{appointmentId}, {headers:{dToken}})
            if(data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        dToken, setDToken,
        backendUrl, 
        appointments, setAppointments,
        getAllAppointments,
        completeAppointment, 
        cancelAppointment
    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;