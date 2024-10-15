"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, CheckCircle, Loader } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";

interface TimeSlotFormData {
  organizationName: string;
  email: string;
  creatorPublicKey: string;
  image: File | null;
  description: string;
  amount: number;
  date: string;
  time1: string;
  time2: string;
  time3: string;
  meetlink: string;
  title: string;
}

export default function TimeSlotForm() {
  const [formData, setFormData] = useState<TimeSlotFormData>({
    organizationName: "",
    creatorPublicKey: "",
    email: "",
    image: null,
    description: "",
    amount: 0,
    date: "",
    time1: "",
    time2: "",
    time3: "",
    meetlink: "",
    title: "",
  });

  const [loader, setLoader] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();
  const [blinkId, setBlinkId] = useState("");
  const [copied, setCopied] = useState(false);
  const [icon, setIcon] = useState(<Copy />);
  const controls = useAnimation();

  const handleCopy = () => {
    const linkToCopy = `http://localhost:3000/join/${blinkId}`;
    navigator.clipboard.writeText(linkToCopy).then(() => {
      setCopied(true);
      setIcon(<CheckCircle className="text-green-500" />);
      controls.start({ scale: 1.1, rotate: 360 });
      setTimeout(() => {
        setCopied(false);
        setIcon(<Copy />);
        controls.start({ scale: 1, rotate: 0 });
      }, 1000);
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleNavigate = () => {
    router.push("/dashboard");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "image" && formData[key]) {
        formDataToSend.append("image", formData[key] as File);
      } else {
        formDataToSend.append(
          key,
          String(formData[key as keyof TimeSlotFormData])
        );
      }
    }

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setLoader(false);
        const data = await response.json();
        setBlinkId(data.data.id);
        nextStep();
      } else {
        console.error("Error creating time slot");
      }
    } catch (err) {
      console.error("Failed to submit form", err);
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="w-full md:max-w-[500px] p-8 bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            {currentStep !== 4 && (
              <>
                <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Create Your Session Blink
                </h1>
                <p className="text-sm text-gray-300">
                  Provide all the details below to create a session blink that
                  you can share with your audience.
                </p>
              </>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label className="mb-2 font-medium text-sm">Name</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className="p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
                    placeholder="John Doe"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label className="mb-2 font-medium text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
                    placeholder="johndoe@example.com"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label className="mb-2 font-medium text-sm">
                    Solana Public Key
                  </label>
                  <input
                    type="text"
                    name="creatorPublicKey"
                    value={formData.creatorPublicKey}
                    onChange={handleInputChange}
                    className="p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
                    placeholder="5ckKLcEPRi2F5UZRPGuVAUj6mrDKpJ63QVmnpHoaBfFJ"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <label className="mb-2 font-medium text-sm">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                    accept="image/*"
                    required
                  />
                  <label
                    htmlFor="fileInput"
                    className="p-3 rounded-md bg-gray-700 border border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors"
                  >
                    {formData.image ? formData.image.name : "Choose a file"}
                  </label>
                </motion.div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label className="mb-2 font-medium text-sm">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
                    placeholder="Enter Title"
                    required
                  />
                </motion.div>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label className="mb-2 font-medium text-sm">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
                    placeholder="Enter description"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label className="mb-2 font-medium text-sm">
                    Amount (SOL)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <label className="mb-2 font-medium text-sm">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
                    required
                  />
                </motion.div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label className="mb-2 font-medium text-sm">Time 1</label>
                  <input
                    type="time"
                    name="time1"
                    value={formData.time1}
                    onChange={handleInputChange}
                    className="p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label className="mb-2 font-medium text-sm">Time 2</label>
                  <input
                    type="time"
                    name="time2"
                    value={formData.time2}
                    onChange={handleInputChange}
                    className="p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label className="mb-2 font-medium text-sm">Time 3</label>
                  <input
                    type="time"
                    name="time3"
                    value={formData.time3}
                    onChange={handleInputChange}
                    className="p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <label className="mb-2 font-medium text-sm">Meet Link</label>
                  <input
                    type="url"
                    name="meetlink"
                    value={formData.meetlink}
                    onChange={handleInputChange}
                    className="p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    placeholder="Enter meeting link"
                    required
                  />
                </motion.div>
              </>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-xl font-medium flex items-center gap-1 mb-4">
                  Here is your blink share it on{" "}
                  <FaXTwitter className="text-blue-400" />
                </h1>

                <div className="px-3 py-2 mt-2 border rounded-lg bg-gray-700 flex items-center justify-between">
                  <p className="text-blue-300">
                    http://localhost:3000/join/{blinkId}
                  </p>
                  <div onClick={handleCopy} className="cursor-pointer">
                    <motion.div animate={controls}>{icon}</motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  className="rounded-full flex items-center gap-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                  onClick={prevStep}
                >
                  <ArrowLeft className="w-4" /> Go back
                </Button>
              ) : (
                <Button
                  disabled
                  type="button"
                  className="rounded-full flex items-center gap-1 bg-gray-600 text-gray-400 cursor-not-allowed"
                >
                  <ArrowLeft className="w-4" /> Go back
                </Button>
              )}
              {currentStep < 3 && (
                <Button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
                  onClick={nextStep}
                  disabled={
                    currentStep === 1
                      ? !formData.organizationName ||
                        !formData.email ||
                        !formData.creatorPublicKey ||
                        !formData.image
                      : currentStep === 2
                      ? !formData.title ||
                        !formData.description ||
                        !formData.amount ||
                        !formData.date
                      : false
                  }
                >
                  Next step
                </Button>
              )}
              {currentStep === 3 && (
                <Button
                  type="submit"
                  className="rounded-full flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
                  disabled={
                    !formData.time1 ||
                    !formData.time2 ||
                    !formData.time3 ||
                    !formData.meetlink
                  }
                >
                  {loader && <Loader className="animate-spin" />} Create blink
                </Button>
              )}
              {currentStep === 4 && (
                <Button
                  type="button"
                  onClick={handleNavigate}
                  className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                >
                  Go to dashboard
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}