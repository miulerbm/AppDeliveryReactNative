import AsyncStorage from "@react-native-async-storage/async-storage";

export const LocalStorage = () => {
  // Tendremos 2 métodos:
  // 1ero -> Método save, almacenar un nuevo usuario en sesión
  const save = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error en local Storage: " + error);
    }
  };

  // Método getItem, retornar la información de sesión
  const getItem = async (key: string) => {
    try {
      const item = await AsyncStorage.getItem(key); // Método para obtener información de sesión
      return item;
    } catch (error) {
      console.log("Error en local Storage: " + error);
    }
  };

  // Método para eliminar información
  const remove = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error en local Storage: " + error);
    }
  };

  return {
    save,
    getItem,
    remove,
  };
};
