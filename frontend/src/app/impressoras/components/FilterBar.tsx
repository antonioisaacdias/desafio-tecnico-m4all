'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Btn from "@/app/components/Btn";
import Input from "@/app/components/Input";
import { useState } from "react";

interface FilterBarProps {
    onFilter: (filters: FilterValues) => void;
    onClear: () => void;
}

export interface FilterValues {
    name: string;
    model: string;
    location: string;
    status: string;
    sortBy: string;
    sortDir: string;
}

export default function FilterBar({ onFilter, onClear }: FilterBarProps) {
    const [filters, setFilters] = useState<FilterValues>({
        name: '',
        model: '',
        location: '',
        status: '',
        sortBy: 'name',
        sortDir: 'asc'
    });

    const handleInputChange = (field: keyof FilterValues, value: string) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFilter = () => {
        onFilter(filters);
    };

    const handleClear = () => {
        setFilters({
            name: '',
            model: '',
            location: '',
            status: '',
            sortBy: 'name',
            sortDir: 'asc'
        });
        onClear();
    };

    return (
        <div>
            <header className="flex nowrap items-center gap-2">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-text"
                    style={{ fontSize: "20px" }}
                />
                <h4 className="text-text font-semibold text-lg">
                    Filtrar por:
                </h4>
            </header>
            <div className="flex justify-between items-center gap-2 mt-2">
                <Input
                    type="text"
                    placeholder="Nome"
                    value={filters.name}
                    className="w-full"
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Modelo"
                    value={filters.model}
                    className="w-full"
                    onChange={(e) => handleInputChange('model', e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Localização"
                    value={filters.location}
                    className="w-full"
                    onChange={(e) => handleInputChange('location', e.target.value)}
                />
                <select
                    value={filters.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                    <option value="">Todos os Status</option>
                    <option value="ONLINE">Online</option>
                    <option value="OFFLINE">Offline</option>
                </select>
                <Btn 
                    className="font-semibold transition-colors whitespace-nowrap"
                    onClick={handleFilter}
                >
                    Filtrar
                </Btn>
                <Btn 
                    className="font-semibold transition-colors whitespace-nowrap"
                    bgColor="bg-gray-500"
                    hoverColor="hover:bg-gray-600"
                    onClick={handleClear}
                >
                    Limpar
                </Btn>
            </div>
        </div>
    );
}
