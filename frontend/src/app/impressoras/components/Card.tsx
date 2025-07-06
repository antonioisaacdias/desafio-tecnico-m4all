'use client';

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Btn from "@/app/components/Btn";

type CardProps = {
  name: string;
  model: string;
  location: string;
  status: string;
  className?: string;
  onStatusClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

export default function Card({
  name,
  model,
  location,
  status,
  className = "",
  onStatusClick,
  onEditClick,
  onDeleteClick,
}: CardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const topBarColor = status.toLowerCase() === "online" ? "bg-success" : "bg-danger";

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    if (onEditClick) {
      onEditClick();
    }
    setMenuOpen(false);
  };

  const handleDelete = () => {
    console.log('handleDelete called, onDeleteClick exists:', !!onDeleteClick);
    if (onDeleteClick) {
      onDeleteClick();
    }
    setMenuOpen(false);
  };

  const statusModal = () => {
    if (onStatusClick) {
      onStatusClick();
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      className={`
        bg-white rounded-lg relative overflow-hidden shadow-md
        w-72 min-h-[140px] flex flex-col ${className}
      `}
    >
      <div className={`w-full h-3 absolute top-0 left-0 ${topBarColor}`}></div>

      <div className="border-b w-full pt-5 pb-1 px-3 flex items-center justify-between relative z-10">
        <h6 className="font-bold text-text">{name}</h6>
        <Btn
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          bgColor="bg-transparent"
          padding="p-0"
          hoverColor="hover:bg-transparent"
        >
          <FontAwesomeIcon
            icon={faEllipsis}
            className="text-text"
            style={{ fontSize: "30px" }}
          />
        </Btn>

        {menuOpen && (
          <div
            className="absolute top-[2.8rem] right-3 w-40 bg-white border rounded shadow-md z-20"
            ref={menuRef}
          >
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleEdit}
            >
              Editar
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleDelete}
            >
              Excluir
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={statusModal}
            >
              Ver Status
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2 transition duration-200">
        <p className="text-sm">Modelo: {model}</p>
        <p className="text-sm">Local: {location}</p>
        <p className="text-sm self-center mt-auto">Status: {status}</p>
      </div>
    </div>
  );
}
