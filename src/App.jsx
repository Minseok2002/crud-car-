import axios from "axios"
import { createContext, useEffect, useState } from "react";
import React from 'react'
import CarList from "./assets/components/CarList";


const BASE_URL = "https://cars-crud.academlo.tech";

function App() {
  const [cars, setcars] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCar = Object.fromEntries(formData);
    createCar(newCar, e.target);
  };

  const createCar = (newCar, form) => {
    axios
      .post(BASE_URL + "/cars/", newCar)
      .then(() => {
        form.reset();
        alert("Auto Creado Correctamente  ");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/cars/")
      .then(({ data }) => setcars(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="bg-black  text-white min-h-screen font-semibold
     text-lg p-4">
      <h2 className="text-center">CRUD Autos</h2>
      <form onSubmit={handleSubmit}
        className="max-w-[300px] mx-auto grid gap-2">

        <label className="grid gap-1">
          <span>Marca <span className="text-red-500">*</span></span>
          <input name="brand" className="text-black" required />
        </label>
        <label className="grid gap-1">
          <span>Modelo<span className="text-red-500">*</span></span>
          <input name="model" type="text" className="text-black" required />
        </label>
        <label className="grid gap-1">
          <span>Color<span className="text-red-500">*</span></span>
          <input name="color" type="text" className="text-black" required />
        </label>
        <label className="grid gap-1">
          <span>Año<span className="text-red-500">*</span></span>
          <input name="year" type="number" className="text-black" required />
        </label>
        <label className="grid gap-1">
          <span>Precio<span className="text-red-500">*</span></span>
          <input name="price" className="text-black" required />
        </label>
        <button className="bg-blue-500 rounded-md mot-2 p-1 hover:bg-blue-600
        transition-colors">
          Crear Auto
        </button>
      </form>
      <CarList cars={cars} />
    </main>
  );
}

export default App;
