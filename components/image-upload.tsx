"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";

const ImageUpload = ({ ...props }) => {
  const { value, onChange } = props;
  const [selectedFile, setSelectedFile] = useState(value);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  useEffect(() => {
    onChange(selectedFile);
  }, [selectedFile, onChange]);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div className="mt-2">
          <Image
            src={selectedFile}
            alt="Preview"
            className="rounded-md"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
