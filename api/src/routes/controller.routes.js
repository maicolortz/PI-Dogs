const getInfoAPI = async () => {
    const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiDogs = await apiURL.data.map((dog) => {
      return {
        id: dog.id,
        image: dog.image.url,
        name: dog.name,
        temperament: dog.temperament,
        weight: dog.weight,
        origin: dog.origin,
        temperamentCC: dog.temperament,
      };
    });
  
    return apiDogs;
  };