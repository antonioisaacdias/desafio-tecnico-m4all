'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPrint } from "@fortawesome/free-solid-svg-icons";
import FilterBar, { FilterValues } from "./components/FilterBar";
import Card from "./components/Card";
import Btn from "../components/Btn";
import StatusModal from "./components/StatusModal";
import PrinterFormModal from "./components/PrinterFormModal";
import { Printer } from "../types/printer";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function Impressoras() {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingPrinter, setEditingPrinter] = useState<Printer | null>(null);
  const [filters, setFilters] = useState<FilterValues>({
    name: '',
    model: '',
    location: '',
    status: '',
    sortBy: 'name',
    sortDir: 'asc'
  });

  function capitalize(text: string) {
    if (!text) return "";
    return text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  useEffect(() => {
    fetchPrinters();
  }, [pagination.currentPage, pagination.itemsPerPage, filters]);

  async function fetchPrinters() {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: (pagination.currentPage - 1).toString(),
        size: pagination.itemsPerPage.toString()
      });

      if (filters.name.trim()) queryParams.append('name', filters.name.trim());
      if (filters.model.trim()) queryParams.append('model', filters.model.trim());
      if (filters.location.trim()) queryParams.append('location', filters.location.trim());
      if (filters.status.trim()) queryParams.append('status', filters.status.trim());
      
      queryParams.append('sortBy', filters.sortBy);
      queryParams.append('sortDir', filters.sortDir);

      const response = await fetch(`${baseUrl}/printers?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch printers");
      const data = await response.json();
      setPrinters(data.content);
      setPagination(prev => ({
        ...prev,
        totalPages: data.totalPages,
        totalItems: data.totalElements,
        itemsPerPage: data.size,
      }));
    } catch (error) {
      console.error("Error fetching printers:", error);
      setPrinters([]);
      setPagination(prev => ({
        ...prev,
        totalPages: 1,
        totalItems: 0,
      }));
    } finally {
      setLoading(false);
    }
  }

  const setItemsPerPage = (size: number) => {
    setPagination(prev => ({
      ...prev,
      itemsPerPage: size,
      currentPage: 1,
    }));
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  function getPaginationPages(current: number, total: number, maxButtons = 5): (number | string)[] {
    const pages: (number | string)[] = [];

    if (total <= maxButtons) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxButtons / 2);
      let start = Math.max(2, current - half);
      let end = Math.min(total - 1, current + half);

      if (current <= half) {
        start = 2;
        end = maxButtons - 1;
      } else if (current >= total - half) {
        start = total - (maxButtons - 2);
        end = total - 1;
      }

      pages.push(1);

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < total - 1) pages.push("...");

      pages.push(total);
    }

    return pages;
  }

  const pagesToShow = getPaginationPages(pagination.currentPage, pagination.totalPages, 5);

  function openModal(printer: Printer) {
    setSelectedPrinter(printer);
    setModalOpen(true);
  }

  function openEditModal(printer: Printer) {
    setEditingPrinter(printer);
    setFormModalOpen(true);
  }

  function openCreateModal() {
    setEditingPrinter(null);
    setFormModalOpen(true);
  }

  async function handleDeletePrinter(printer: Printer) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir a impressora "${printer.name}"?`);
    
    if (!confirmDelete) return;

    try {
        console.log(printer.id)
      const response = await fetch(`${baseUrl}/printers/${printer.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir impressora');
      }

      toast.success(`Impressora "${printer.name}" excluída com sucesso!`);
      fetchPrinters(); // Recarrega a lista
    } catch (error) {
      console.error('Erro ao excluir impressora:', error);
      toast.error('Erro ao excluir impressora');
    }
  }

  const handleFilter = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      model: '',
      location: '',
      status: '',
      sortBy: 'name',
      sortDir: 'asc'
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSortChange = (sortBy: string, sortDir: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortDir
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); 
  };

  return (
    <div className="max-w-7xl flex flex-col gap-6 mx-auto">
      <header className="flex nowrap items-center gap-3">
        <div className="bg-brand inline-block py-2 px-3 rounded-lg">
          <FontAwesomeIcon icon={faPrint} className="text-white" style={{ fontSize: "30px" }} />
        </div>
        <h1 className="text-3xl font-bold text-brand">Gestão de Impressoras</h1>
      </header>

      <FilterBar onFilter={handleFilter} onClear={handleClearFilters} />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-sm text-gray-600">Itens por página:</label>
            <select
              id="itemsPerPage"
              className="border px-2 py-1 rounded text-sm"
              value={pagination.itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {[5, 10, 15, 20, 50].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Ordenar por:</span>
            <select
              className="border px-2 py-1 rounded text-sm"
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value, filters.sortDir)}
            >
              <option value="name">Nome</option>
              <option value="model">Modelo</option>
              <option value="location">Localização</option>
              <option value="status">Status</option>
            </select>
            <select
              className="border px-2 py-1 rounded text-sm"
              value={filters.sortDir}
              onChange={(e) => handleSortChange(filters.sortBy, e.target.value)}
            >
              <option value="asc">↑ A-Z</option>
              <option value="desc">↓ Z-A</option>
            </select>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          Total de impressoras: {pagination.totalItems}
        </p>
        
        <Btn
          className="font-semibold transition-colors"
          onClick={openCreateModal}
        >   
          <FontAwesomeIcon icon={faPrint} className="text-white mr-2" style={{ fontSize: "15px" }} />
          Nova Impressora
        </Btn>
      </div>

      

      <div className="flex flex-wrap gap-6 justify-center min-h-[200px]">
        {loading ? (
          <div className="text-center w-full">
            <p>Carregando impressoras...</p>
          </div>
        ) : printers.length === 0 ? (
          <div className="text-center w-full text-gray-500">Nenhuma impressora encontrada.</div>
        ) : (
          printers.map((printer) => (
            <Card
              key={printer.id}
              name={capitalize(printer.name)}
              model={printer.model}
              location={printer.location}
              status={capitalize(printer.status)}
              onStatusClick={() => openModal(printer)}
              onEditClick={() => openEditModal(printer)}
              onDeleteClick={() => handleDeletePrinter(printer)}
            />
          ))
        )}
      </div>

      <div className="text-center flex gap-3 justify-center mt-6 flex-wrap">
        <Btn disabled={pagination.currentPage === 1} onClick={() => goToPage(pagination.currentPage - 1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Btn>

        {pagesToShow.map((page, idx) =>
          typeof page === "number" ? (
            <Btn
              key={page}
              disabled={pagination.currentPage === page}
              className={pagination.currentPage === page ? "font-bold text-brand" : "text-gray-500"}
              onClick={() => goToPage(page)}
              aria-current={pagination.currentPage === page ? "page" : undefined}
            >
              {page}
            </Btn>
          ) : (
            <span key={`ellipsis-${idx}`} className="px-2 select-none">
              {page}
            </span>
          )
        )}

        <Btn disabled={pagination.currentPage === pagination.totalPages} onClick={() => goToPage(pagination.currentPage + 1)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Btn>
      </div>

      {selectedPrinter && (
        <StatusModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          id={selectedPrinter.id}
          name={selectedPrinter.name}
          status={selectedPrinter.status}
          paperCapacity={selectedPrinter.paperCapacity}
        />
      )}

      <PrinterFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        printer={editingPrinter}
        onSuccess={() => {
          fetchPrinters();
        }}
      />
    </div>
  );
}
