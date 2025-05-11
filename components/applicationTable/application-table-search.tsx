import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

interface ApplicationTableSearch {
  value: string;
  onChange: (newValue: string) => void;
}

const ApplicationTableSearch = (props: ApplicationTableSearch) => {
  const { value, onChange } = props;
  return (
    <div className="flex items-center py-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search applications..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
};

export default ApplicationTableSearch;
