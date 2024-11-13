import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({}); // Initialize as an object

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData, // Corrected from formField to formData
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = () => {
    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.people
    ) {
      toast("Please fill all details");
      return;
    }
    console.log(formData);
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
            What is your destination of choice?
          </h2>
          <Input
            placeholder="Ex. Kandy"
            onChange={(v) => handleInputChange("location", v.target.value)}
            className="border p-2 rounded"
            type="text"
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning for camping?
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
      <div className="my-10 flex justify-end">
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
