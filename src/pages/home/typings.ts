import React from "react";

export interface EditData {
  id: string;
  name: string;
}

export interface EditModalProps {
  data: EditData;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
}
