import { useEffect, useState } from "react";
import { axiosInstance } from "../apis";
import { Modal, Input, DatePicker, TimePicker, Button } from "antd";
import { spotUpdateFunction } from "../apis/booking";

const Parkingarea = ({token,setToken,onBookingComplete}) => {
    const boxStyle = {
        width: "800px",
        height: "450px",
        border: "2px solid black",
        backgroundColor: "#f0f0f0",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "10px",
    };

    const boxStyle1 = {
        width: "80px",
        height: "80px",
        borderRadius: "5px",
        backgroundColor: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#000",
        cursor: "pointer",
    };

    const availableStyle = {
        backgroundColor: "green",
    };

    const occupiedStyle = {
        backgroundColor: "red",
    };

    const [parkingSpot, setParkingSpot] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [duration, setDuration] = useState(1);
    const [charge, setCharge] = useState(0);
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleOpenModal = (spot) => {
        setSelectedDate(null);
    setSelectedTime(null); 
    setVehicleNumber(""); 
    setDuration(1); 
    setCharge(spot.charge || 0); 
    setSelectedSpot(spot); 
    setIsModalOpen(true); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const bookingFunction = async () => {
        if (!selectedDate || !selectedTime || !vehicleNumber || !charge) {
            alert("Please fill in all the fields.");
            return;
        }
        const payload = {
            spotID: selectedSpot.spotID,
            date: selectedDate.format("YYYY-MM-DD"),
            time: selectedTime.format("HH:mm"),
            vehicleNumber,
            duration,
            charge,
        };

        try {
            await spotUpdateFunction(payload);
            alert("Booking successful!");
            handleCloseModal();
            onBookingComplete();
            
        } catch (error) {
            console.error("Error booking spot:", error.message);
            alert("Booking failed!");
        }
    };

    useEffect(() => {
        console.log("poo-->",token)
        setToken(localStorage.getItem("token"));
        console.log("pooss-->",token)
    }, [setToken]);


    useEffect(() => {
        const fetchSpotData = async () => {
            try {
                const info = await axiosInstance.get("/api/spot/details",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },});
                setParkingSpot(info.data);
            } catch (error) {
                console.error(
                    "Error fetching parking spot details:",
                    error.response?.data || error.message
                );
            }
        };
        fetchSpotData();
    }, [isModalOpen,token]);

    const images = [
        "https://png.pngtree.com/png-vector/20190510/ourmid/pngtree-vector-car-icon-png-image_1028600.jpg",
        "https://png.pngtree.com/png-vector/20190510/ourmid/pngtree-vector-car-icon-png-image_1028600.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGUaQVytzjcUPUqffYIezXi16Gj8FtNM1PXlXdSVo2f6jcJ_QFIlTZSH5bO95zvzHZwH0&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGUaQVytzjcUPUqffYIezXi16Gj8FtNM1PXlXdSVo2f6jcJ_QFIlTZSH5bO95zvzHZwH0&usqp=CAU",
    ];

    return (
        <div>
            <div style={boxStyle}>
                <div className="flex flex-col gap-9">
                    {images.map((image, imageIndex) => (
                        <div key={imageIndex} className="flex items-center gap-4">
                            <img
                                className="w-20 h-20 rounded-full object-cover"
                                src={image}
                                alt={`Car Icon ${imageIndex + 1}`}
                            />
                            <div className="mx-16 flex gap-12">
                                {parkingSpot
                                    .slice(imageIndex * 4, imageIndex * 4 + 4)
                                    .map((x, index) => (
                                        <div
                                            style={{
                                                ...boxStyle1,
                                                ...(x.status === "Occupied"
                                                    ? occupiedStyle
                                                    : availableStyle),
                                            }}
                                            key={index}
                                            onClick={() =>
                                                x.status === "Available" &&
                                                handleOpenModal(x)
                                            }
                                        >
                                            {x.spotID}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                title="Book Parking Spot"
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
            >
                <div>
                    <h3>Spot ID: {selectedSpot?.spotID}</h3>
                    <div className="flex flex-col gap-4 mt-4">
                        <DatePicker
                            className="w-full"
                            placeholder="Select Date"
                            value={selectedDate}
                            onChange={setSelectedDate}
                            disabledDate={(current) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return current && current < today.setDate(today.getDate() + 1);
                            }}
                        />
                        <TimePicker
                            className="w-full"
                            placeholder="Select Time"
                            value={selectedTime}
                            onChange={setSelectedTime}
                        />
                        <Input
                            placeholder="Enter your vehicle number"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                        />
                        <Input
                            placeholder="Enter duration (in hours)"
                            type="number"
                            value={duration}
                            min={1}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10) || 1;
                                setDuration(value);
                                setCharge(value * (selectedSpot?.charge || 0));
                            }}
                        />
                        <Input placeholder="Charge" value={charge} disabled />
                    </div>
                    <div className="text-center mt-5">
                        <Button type="primary" onClick={bookingFunction}>
                            Book Spot
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Parkingarea;
