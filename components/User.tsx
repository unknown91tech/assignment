"use client"
import Navbar from "@/components/Navbar";
import React, { useState } from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SampleTooltip from "@/components/Tooltip";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Button, Tooltip } from "@mui/material";
import { AiOutlineSortAscending } from "react-icons/ai";
import { CiFolderOn } from "react-icons/ci";
import NativeSelectDemo from "@/components/Select";
import { useRouter } from "next/navigation";

const User = () => {
    const router = useRouter();
    // start from 1
  const getFormCounter = () => {
    const counter = localStorage.getItem('form_counter');
    return counter ? parseInt(counter, 10) : 1;
  };

  const [formCounter, setFormCounter] = useState(getFormCounter);

  const updateFormCounter = (newCounter: number) => {
    localStorage.setItem('form_counter', newCounter.toString());
  };

  const createNewForm = () => {
    const newFormId = formCounter.toString();

    const newForm = {
      id: newFormId,
      title: `Untitled Form ${newFormId}`,
      description: 'This is a dynamically generated form.',
      fields: [
        { label: 'Name', type: 'text' },
        { label: 'Email', type: 'email' },
      ],
    };

    localStorage.setItem(`form_${newFormId}`, JSON.stringify(newForm));

    const nextFormCounter = formCounter + 1;
    setFormCounter(nextFormCounter);
    updateFormCounter(nextFormCounter);

    router.push(`/user/forms/${newFormId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <section className="px-6 md:px-20">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-neutral-800">
            Start a new form
          </h2>
          <div className="flex items-center "> 
            <Button color="success">
              Template Gallery
              <KeyboardArrowDownIcon/>
            </Button>
          <SampleTooltip/>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
          {[
            { title: "Blank Form", thumbnail: "/image-0.png" },
            { title: "Job Application", thumbnail: "/image-1.png" },
            { title: "Contact Information", thumbnail: "/image-2.png" },
            { title: "RSVP", thumbnail: "/image-3.png" },
            { title: "Party Invite", thumbnail: "/image-4.png" },
          ].map((template, index) => (
            <button type="button" onClick={createNewForm} key={template.title}>
            <div
              key={index}
              className="border hover:shadow-md hover:border-purple-600 transition-shadow cursor-pointer bg-white p-3 rounded-md"
            >
              <img
                src={template.thumbnail}
                alt={template.title}
                className="w-full h-32 object-cover rounded-md"
              />
                
              <p className="text-sm font-medium text-neutral-800 text-center mt-2">
                {template.title}
              </p>
            </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10 px-6 md:px-20">
      <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-neutral-800">
            Recent forms
          </h2>
          <div className="flex items-center "> 
            
          <button className="text-sm font-medium text-neutral-700 hover:text-purple-600 transition">
            Owned by anyone
            <KeyboardArrowDownIcon/>
          </button>
          <div className="px-2">
            <Tooltip title="List view">
              <FormatListBulletedIcon className=" text-3xl "/>
            </Tooltip>
            
          </div>
          <div className="px-2">
          <Tooltip title="Sort Option">
              <AiOutlineSortAscending className=" text-3xl"/>
            </Tooltip>
          </div>
          <div className="px-2">
          <Tooltip title="Open file Picker">
              <CiFolderOn className=" text-3xl "/>
            </Tooltip>
          </div>

          </div>
          
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              title: "Untitled Form",
              thumbnail: "/image-5.png",
              date: "Opened Nov 17, 2024",
            },
            {
              title: "Job Application",
              thumbnail: "/image-1.png",
              date: "Opened Nov 17, 2024",
            },
          ].map((form, index) => (
            <div
              key={index}
              className="border hover:shadow-md hover:border-purple-600 transition-shadow cursor-pointer bg-white p-3 rounded-md"
            >
                
              <img
                src={form.thumbnail}
                alt={form.title}
                className="w-full h-32 object-cover rounded-md"
              />
              <p className="text-sm font-medium text-neutral-800 text-center mt-2">
                {form.title}
              </p>
              <p className="text-xs text-neutral-500 text-center">
                {form.date}
              </p>
              
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default User;
