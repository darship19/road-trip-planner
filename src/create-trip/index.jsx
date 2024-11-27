import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
  SelectTripMode,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { LogIn } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig"; // Adjust the path to match your configuration file

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState([]); // Initialize as an object
  const [openDailog,setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData, // Corrected from formField to formData
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Successfully logged in:", tokenResponse);
      // Optionally store token in local storage
      localStorage.setItem("access_token", tokenResponse.access_token);
      // Fetch user profile data here or store token directly
      GetUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }
    if (
      !formData?.start ||
      !formData?.end ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.people ||
      !formData?.tripmode
    ) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{locationfrom}", formData?.start)
      .replace("{locationto}", formData?.end)
      .replace("{totaldays}", formData?.noOfDays)
      .replace("{traveler}", formData?.people)
      .replace("{budget}", formData?.budget)
      .replace("{vehicle}", formData?.tripmode)
      .replace("{totaldays}", formData?.noOfDays);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setUser(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false); // Close the dialog if it's open
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  //firebase
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userChoice: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 flex-col">
      <h2 className="text-left font-bold text-3xl">
        Tell us your travel preferences
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized trip based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            Enter your starting location ?
          </h2>
          <Input
            placeholder="Ex. Colombo"
            onChange={(v1) => handleInputChange("start", v1.target.value)}
            className="border p-2 rounded"
            type="text"
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <Input
            placeholder="Ex. Kandy"
            onChange={(v) => handleInputChange("end", v.target.value)}
            className="border p-2 rounded"
            type="text"
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning for trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((items, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", items.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                formData?.budget == items.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{items.icon}</h2>
              <h2 className="font-bold text-lg">{items.title}</h2>
              <h2 className="text-sm text-gray-500">{items.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((items, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("people", items.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                formData?.people == items.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{items.icon}</h2>
              <h2 className="font-bold text-lg">{items.title}</h2>
              <h2 className="text-sm text-gray-500">{items.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          What type of road trip are you looking for?{" "}
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTripMode.map((items, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("tripmode", items.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                formData?.tripmode == items.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{items.icon}</h2>
              <h2 className="font-bold text-lg">{items.title}</h2>
              <h2 className="text-sm text-gray-500">{items.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-9">Sign In with Google</h2>
              <p>Sign in to the App with Google authentication</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-5 items-center"
              >
                <FcGoogle className="h-7 w-7"> </FcGoogle>Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
