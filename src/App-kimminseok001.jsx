
import axios from "axios"
import { createContext, useEffect, useRef, useState } from "react";
import React from 'react'
import CarList from "./assets/components/CarList";

const BASE_URL = "https://cars-crud.academlo.tech";

function App() {
  const [cars, setcars] = useState([])
  const [carToUpdate, setCarToUpdate] = useState(null);

  const formRef = useRef(null);
  // este se borra

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentCar = Object.fromEntries(formData);
    if (carToUpdate) {
      updateCar(currentCar)
    } else {
      createCar(currentCar, e.target);
    }
  };

  const createCar = (newCar, form) => {
    axios
      .post(BASE_URL + "/cars/", newCar)
      .then(({ data: newCar }) => {
        form.reset();
        alert("Auto Creado Correctamente");
        setcars([...cars, newCar])
      })
      .catch((err) => console.log(err));
  };

  const deleteCar = (idCar) => {
    axios.delete(BASE_URL + `/cars/${idCar}/`)
      .then(() => {
        const newCars = cars.filter((car) => car.id != idCar);
        setcars(newCars);
        alert("El Auto Ah Sido Eliminado Correctamente")
      })
      .catch((err) => console.log(err));
  };

  const updateCar = (carInfo) => {
    axios
      .put(BASE_URL + `/cars/${carToUpdate.id}/`, carInfo)
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  }
  const handleClickUpdate = (car) => {
    setCarToUpdate(car);
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/cars/")
      .then(({ data }) => setcars(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (carToUpdate != null) {
      //? la informacion esta en el estado de un auto
      //Montar toda la iformacion en el formulario
      formRef.current.brand.value = carToUpdate.brand;
      formRef.current.model.value = carToUpdate.model;
      formRef.current.color.value = carToUpdate.color;
      formRef.current.year.value = carToUpdate.year;
      formRef.current.price.value = carToUpdate.price;
      // formulario
    }
  }, [carToUpdate]);
  return (
    <main className="bg-black  text-white min-h-screen font-semibold
     text-lg p-4">
      <h2 className="text-center">CRUD Autos</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
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
          {carToUpdate ? "guardar cambios de auto" : "crear auto "}
        </button>
      </form>
      <CarList cars={cars} deleteCar={deleteCar} handleClickUpdate={handleClickUpdate} />
    </main>
  );
}

export default App;
