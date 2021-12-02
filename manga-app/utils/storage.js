export const setToLS = (key, value) => {
    if(typeof window !== "undefined") {
        console.log(key, value)
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};
  
export const getFromLS = key => {
    if(typeof window !== "undefined") {
        const value = window.localStorage.getItem(key);
        return value !== undefined ? JSON.parse(value) : false;
    }
};
