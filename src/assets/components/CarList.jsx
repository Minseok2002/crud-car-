const CarList = ({ cars }) => {
    console.log(cars);
    return (
        <section className="grid justify-center gap-6 py-10">
            {cars.map((car) => (
                <article key={car.id}>
                    <h4 className="text-center capitalize">
                        {car.brand} {car.model}
                    </h4>
                    <ul>
                        <li>color: {car.color}</li>
                        <li>Año: {car.year}</li>
                        <li>precio: {car.price}</li>
                    </ul>
                    <div className="flex gap-2">
                    <button className="bg-yellow-600 p-2 rounded-md">Actulizar</button>
                    <button className="bg-blue-500 p-2 rounded-md">Eliminar</button>
                    </div>
                </article>
            ))}
        </section>
    );
};
export default CarList;