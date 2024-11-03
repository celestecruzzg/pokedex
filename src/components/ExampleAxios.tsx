import axios from "axios";
import { useEffect, useState } from "react";
import imagePokeBola from '../assets/images/pokebola.png';

function ExampleAxios() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const dataList = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
                setData(response.data.results);
                console.log(data);
            } catch (errors: any) {
                setError(errors);
            } finally {
                setLoading(false);
            }
            };

        dataList();
    }, []);

    useEffect(() => {
        const results = data.filter(pokemon => //empiza el filtro de losd atos de busqueda
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) //por nombre de pokemón
        );
        setFilteredData(results);
    }, [searchTerm, data]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); //para la barra de buscador en el nav
    };

    const getPokemonImage = (url) => {
        const id = url.split("/").filter(Boolean).pop();
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; //imagenes para los pokemones desde un repo de gihub
    };

    if (loading)
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="alert alert-danger" role="alert">
                Ocurrió un error : <strong>{error.message}</strong>
            </div>
        );

    return ( //estilos con tailwind uwu
        <div className="flex flex-col min-h-screen bg-white">
            <nav className="py-4 px-10 flex items-center justify-between bg-red-800 shadow-lg fixed top-0 left-0 right-0">
                <div className="flex items-center">
                    <img src={imagePokeBola} alt="PokeBola" className="h-12 w-12 mr-3" />
                    <h2 className="text-white text-xl font-bold">Pokedex</h2>
                </div>
                <div className="flex">
                    <input 
                        type="text"
                        placeholder="Buscar pokemón..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
            </nav>
            <main className="flex flex-wrap justify-center items-start gap-4 p-8 mt-20 mb-auto">
                {filteredData.map((pokemon, index) => (
                    <div key={index} className="max-w-xs w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
                        <img 
                            src={getPokemonImage(pokemon.url)} 
                            alt={pokemon.name} 
                            className="w-24 h-24 mx-auto mb-2"
                        />
                        <h3 className="text-lg font-bold capitalize text-gray-800">{pokemon.name}</h3>
                    </div>
                ))}
            </main>
            <footer className="mt-auto py-3 bg-red-800 text-center">
                <p className="text-white font-light text-xs">Hecho por Celeste González - SM41</p>
            </footer>
        </div>
    );
}

export default ExampleAxios;
